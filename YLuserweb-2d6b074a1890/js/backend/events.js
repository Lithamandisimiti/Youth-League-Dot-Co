// var server_url = "https://api.youthleague.co/api/";
// var node_server = "https://youthleague.co:2048/";
var server_url = "http://139.59.139.239/ylbackend/api/";
var node_server = "http://139.59.139.239:2048/";

var user_id=getCookie("id");
var user_username=getCookie("user");
    if(user_id==null || user_username==null || user_username=="" || user_id==""){
        window.open("index.html","_self");
    }

if(user_id==null || user_username==null || user_username=="" || user_id==""){
    window.open("index.html","_self");
}
$(document).ready(function() {
    //disable add event button
    //document.getElementById("btn-submit-event").disabled = true;
//Get Events
    var lastPost = 0;
    lastPost = loadEvents(lastPost);
    var win = $(window);

    // Each time the user scrolls
    win.scroll(function() {
        // End of the document reached?
        if ($(document).height() - win.height() == win.scrollTop()) {
            $('#infScroll').show();

            lastPost = loadEvents(lastPost);
            $('#infScroll').hide();
        }
    });
//Create Event
    //get categories
    $.ajax({
        url: server_url+"get-categories.php",
        data: {
            //post data to the server
            "id": user_id//getCookie('id');
        },
        cache: false,
        method: "post",
        async: false,
        success: function(response){
            //make use of the response
            siteCats = JSON.parse(response);
            var numCats = siteCats.length;
            var items = "";
            for (var i = 0; i < numCats; i++) {
                items += '<a href="#" data-id="' + siteCats[i].category_id + '">'
                            + siteCats[i].name + '</a>';
            }
            var cats = '<div class="event-cats">' +items+ '</div';
            $('#uploadEvent .categSection').append(cats);
        }
    });

    //toggle categories panel
    $(document).on('click','#add-event-cat', function(){
        $('#uploadEvent .event-cats').toggle(200);
    });

    //toggle chosen category
    $(document).on('click','.event-cats a', function(){
        $(this).toggleClass('chosenCat');
    });

    //Add Poster to file list
    //consists of name of file user wants to upload.
    $('#event-poster').change(function(){
        var file = $(this).val().split('\\').pop();

        if(file.length > 0){
            //reset other inputs
            $('#upload-event-poster .file-list').empty();
            $('#upload-event-poster .file-list').append('<p><strong>image: </strong>' + file + '<a class="fa fa-times"></a></p>').show(200);
        }
    });

    //remove file from list
    $(document).on('click', '#upload-event-poster .fa-times', function(){
        $('#event-poster').val('');
        $('#upload-event-poster .file-list').hide(200);
    });

    //upload event
    var eventForm = $('#uploadEvent');
    $(eventForm).submit(function(e){
        e.preventDefault();
        $('#btn-submit-event').addClass("btn-loading");
        var date_time = $('#date').val() + " " + $('#time').val();
        var formDataEvent = new FormData($("#upload-event-poster")[0]);
        var path_cover;
        //get event categories
        var selectedCats = $('#uploadEvent .chosenCat');
        var categories = [];
        var numCats = selectedCats.length;
        for (var i = 0; i < numCats; i++) {
            categories.push(selectedCats[i].getAttribute("data-id"));
        }

        if( document.getElementById("event-poster").files.length != 0){
            console.log("event image");
            $.ajax({
                        url:node_server+"api/upload/image",
                        data: formDataEvent,
                        type: "POST",
                        contentType: false,
                        processData: false,
                        success: function(response){
                            //console.log(response);
                            var data = JSON.parse(response);
                            if(data.status === "success"){
                                path_cover = data.image;
                            }else{
                                console.log("Please upload file");
                                return;
                            }
                        },
                        error: function(XMLHttpRequest, error){
                            console.log("not done");
                            console.debug(XMLHttpRequest);
                            console.log(error);
                            return;
                        },
                        async: false
            });
        }

        $.ajax({
            url: server_url+"create-event.php",
            data: {
                //post data to the server
                "id": user_id,//getCookie('id'),
                "name": $('#even-name').val(),
                "venue": $('#event-vanue').val(),
                "date_time": date_time,
                "image": path_cover,
                "categories": categories
            },
            cache: false,
            method: "post",
            success: function(response){
                //make use of the response
                $('#btn-submit-event').removeClass("btn-loading");
                $("#uploadEvent").trigger('reset');
                $("#upload-event-poster").trigger('reset');
                $('#createEventModal').modal('hide');
                window.location.reload();
            }
        }).fail(function(data){
            console.log("Could not upload event.");
            console.log(data);
            $('#btn-submit-event').removeClass("btn-loading");
        });
    });
//Delete Event
    $(document).on('click', '.event-block .del-Event', function(e){
        e.preventDefault();
        var parent = $(this).parents('.event-block');
        var eventID = $(parent).attr('data-id');

        $.ajax({
        	url: server_url+'archive-event.php',
        	data: {
        		//post data to the server
        		"id": user_id,
                "event_id": eventID
        	},
        	cache: false,
        	method: "post",
        	success: function(response){
        		//make use of the response
        		//alert('deleting event ' + eventID + ' for user ' + user_id);
        		$(parent).hide(500,function(){
                    $(parent).remove();
                });
        	}
        }).fail(function(){
            alert('could not delete');
        });
    });
//Attand Event
    $(document).on('click', '.user-attend .btn-animated, .user-interested .btn-animated', function(){
        var url, status;

        //check which button was clicked
        if($(this).parent().hasClass('user-interested')){
            status = "intersted";
        }
        else{
            status = "going";
        }

        //if "attend" class present, then unattend
        if($(this).hasClass('attend')){
            url = server_url+"unattend-event.php"//url to unattend
            status = 'unattend';
        }
        else{
            url = server_url+'attend-event.php';
        }

        var myChoice = this;
        var eventId = $(this).parents('.event-block').attr('data-id');
        //alert(eventId);

        $.ajax({
            url: url,
            data: {
                //post data to the server
                "id": user_id,
                "event_id": eventId,
                "status": status

            },
            cache: false,
            method: "post",
            success: function(response){
                //make use of the response
                $(myChoice).toggleClass('attend');
                    //alert(status);

                if(status === "intersted"){
                    var neighbout = $(myChoice).parent().siblings('.user-attend');
                    $(neighbout).find('a').removeClass('attend');
                }
                else if(status === "going"){
                    var neighbout = $(myChoice).parent().siblings('.user-interested');
                    $(neighbout).find('a').removeClass('attend');
                }

            }
        }).fail(function(data){
            //notify user of failure to post data
            console.log("Unable to send event attance status.")
        });
    });

});

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}

function loadEvents(start){
    $.ajax({
        url: server_url+"/get-events.php",
        data: {
            //post data to the server
            'id' : user_id,
            "from": start,
            "limit": start+5
        },
        cache: false,
        method: "post",
        success: function(response){
            //make use of the response
            console.log(response);
            var myEvents = JSON.parse(response);
            var numEvents = myEvents.length;

            var event;
            for (var i = 0; i < numEvents; i++) {
                event = myEvents[i];
                var newEvent = getEvent(event.event_id, event.name, event.venue, event.image, event.date_time, event.status, event.user_id);
                $('#events-section').append(newEvent);
            }

        }
    }).fail(function(data){
        console.log("could not fetch events.");
        console.log(data);
    });

    return start+2;
}

function getEvent(evntID, name, vanue, image, date_time, status, user){
    var date_time = date_time.split(" ");
    var date = date_time[0], time = date_time[1];
    var intersted = "", going = "";
    var deleteButton = "";

    if(user == user_id){
        deleteButton = ('<div class="dropdown">'+
                            '<button class="dropdown-toggle" type="button" data-toggle="dropdown">'+
                                '<span class="caret"></span>'+
                            '</button>'+
                            '<ul class="dropdown-menu">'+
                              '<li><a href="#" class="del-Event">Delere Event</a></li>'+
                            '</ul>'+
                        '</div>');
    }

    //alert(status);
    if(status === 'going'){
        going = 'attend';
        intersted = "";
    }
    else if(status === 'intersted'){
        intersted = 'attend';
        going = "";
    }

    var event = $(
            '<div class="event-block col-sm-12 wow" data-id='+ evntID + ' data-user=' + user +'>'+
                '<div class="pricing-table"><div class="col-sm-6">'+
                        '<img src=' + image+'>'+
                    '</div>'+
                    '<div class="col-sm-6">'+
                        '<div class="pricing-header font-second">'+deleteButton+
                           ' <div class="price">'+
                                '<span class="value">' + name + '</span>'+
                            '</div>'+
                        '</div>'+

                        '<div class="pricing-body">'+
                            '<ul class="pricing-features">'+
                                '<li><strong>Venue:</strong><span class="name">'+vanue+'</span></li>'+
                                '<li><strong>Date:</strong><span class="date">'+date+'</span></li>'+
                                '<li><strong>Time:</strong><span class="time">'+time +'</span></li>'+
                            '</ul>'+
                        '</div>'+

                        '<footer class="pricing-footer user-attend">'+
                            '<a class="btn btn-animated btn-split ripple-alone btn-default '+going+'" data-text="i\'m going"><span>i\'m going</span></a>'+
                            '<a class="select visible-xs" href="#.">'+
                            '<i class="icon ci-icon-uniE890"></i>'+
                            '</a>'+
                        '</footer>'+
                        '<footer class="pricing-footer user-interested">'+
                            '<a class="btn btn-animated btn-split ripple-alone btn-default '+ intersted +'" data-text="i\'m interested"><span>i\'m interested</span></a>'+
                            '<a class="select visible-xs" href="#.">'+
                                '<i class="icon ci-icon-uniE890"></i>'+
                            '</a>'+
                        '</footer>'+
                    '</div>'+
                '</div>'+
            '</div>'
            );

    return event;
}
