// var server_url = "https://api.youthleague.co/api/";
var server_url = "http://139.59.139.239/ylbackend/api/";
var user_id=getCookie("id");
var user_username=getCookie("user");
var artistsArray=[];
var artistsNamesArray=[];
    if(user_id===null || user_username===null || user_username==="" || user_id===""){
        window.open("index.html","_self");
    }

if(user_id===null || user_username===null || user_username==="" || user_id===""){
    window.open("index.html","_self");
}
$(document).ready(function(){
//Get Categories
    $.ajax({
        url: server_url + "get-categories.php",
        data: {
            //post data to the server
            "id": user_id
        },
        cache: false,
        method: "post",
        success: function(response){
            //make use of response
            //console.log(response);
            var categs = JSON.parse(response);
            var len = categs.length;
            var categoryList = '';

            for (var i = 0; i < len; i++) {

                categoryList += '<option value="'+ categs[i].category_id + '">' + categs[i].name + '</option>';
            }

            $('#request-collab-form .cat-list select').append(categoryList);
        }
    });
//Change Collab category
    $('#request-collab-form .cat-list select').change(function(){
        //select category of collaboration
        var category = $(this).val();
        //console.log('chose ' + category);
        var maxCollaborators;

        if (category !== "") {
            //alert('chose ' + category);
            if(category == 1 || category == 6){
                maxCollaborators = 3;
            }
            else if(category == 3){
                maxCollaborators = 2;
            }
            else{
                maxCollaborators = 5;
            }
            $('#request-collab-form .artist-list').attr('data-max-collaborators', maxCollaborators);
            $('#request-collab-form .collaborators').addClass('active');
            //console.log('max is ' + maxCollaborators);
        }
        else{
            $('#request-collab-form .artist-list').attr('data-max-collaborators', "");
            $('#request-collab-form .collaborators').removeClass('active');
        }    
    });
//Cancel Request Collab
    $('#btn-cancel-request').click(function(){
        //cancel request and reset the form
        artistsArray=[];
        artistsNamesArray=[];
        document.getElementById("request-collab-form").reset();
        $('#request-collab-form .artist-list').html("");
        $('#request-collab-modal').modal('hide');
        $('#request-collab-form .artist-list').attr('data-max-collaborators', "");
        $('#request-collab-form .collaborators').removeClass('active');
    });
//Add Collaborator
    $(document).on('click', '#request-collab-form .collaborators .collaborator span', function(){
        //remove collaborator.
        var me = $(this);
        $(me).parents('.collaborator').hide(500, function(){
            $(me).parents('.collaborator').remove();
            
            var maxCollabors = $('#request-collab-form .artist-list').attr('data-max-collaborators');
            var numCollabors = $('#request-collab-form .artist-list .collaborator').length;

            if (numCollabors < (maxCollabors - 1)){
                $('#request-collab-form .search-wrap').show(500);
            }
            
            let id=$(me).parents('.collaborator').attr("data-user-id");
            let index=artistsArray.indexOf(id);
            artistsNamesArray.splice(index,1);
            artistsArray.splice(index,1);
        });    
    });
//star rating
    $(document).on('click', '.star', function(){
        //alert('me');
        $(this).siblings().removeClass('fa-star fiveStar').addClass('fa-star-o');
        $(this).removeClass('fa-star-o fiveStar').addClass('fa-star');
        $sibs = $(this).nextAll();
        $sibs.removeClass('fa-star-o').addClass('fa-star');
        
        var collabID = $(this).parents('.collabo-item').attr('data-collab-id');
        rateCollab(($sibs.length+1), collabID);

        if($sibs.length === 4)
        {
            $(this).addClass('fiveStar');
            $sibs.addClass('fiveStar');
        }
    });
//Search Functionality
    $('#search-input').focus(function(){
        $('#request-collab-form .collaborators .searchList').show('slow');
    });
    $('#search-input').blur(function(){
        $('#request-collab-form .collaborators .searchList').hide('slow');
    });
//search user
    $(document).on('click focus active hover', '#search-input', function(){
        if($(this).val().length > 1){
            $('#request-collab-form .searchList').show(500);
        }
    });
    $(document).on('blur', '#search-input', function(){
        $('#request-collab-form .searchList').hide(500);
    });
    $(document).on('keyup', '#search-input',function(){
        //alert('keyup = ' + $(this).val());
        if($(this).val().length>1){
            $('.searchList').show(500);
            findLikeUsers($(this).val());
        }else{
            $('.searchList').hide(500);
        }
    });
    $(document).on('click', '#request-collab-form .collaborators .userSearchResults', function(e){
        e.preventDefault();

        var username = $(this).find('p').text();
        var userID = $(this).attr('data-user-id');
        var user = '<div class="collaborator" data-user-id="'+ userID +'"><p>'+ username + '<span>&times;</span></p></div>';
        //Collect info about collaborators
        artistsNamesArray.push(" "+username.slice(1,username.length).trim());
        artistsArray.push(userID);
        console.log(artistsNamesArray);
        $('#request-collab-form .artist-list').append(user);
        
        var maxCollabors = $('#request-collab-form .artist-list').attr('data-max-collaborators');
        var numCollabors = $('#request-collab-form .artist-list .collaborator').length;

        if (numCollabors >= (maxCollabors - 1)){
            $('#request-collab-form .search-wrap').hide(500);
        }
    });
//Get Collaborations
    $.ajax({
        url: server_url + "get-collaborations.php",
        data: {
            //post data to server
            "from": 0,
            "limit":3
        },
        cache: false,
        method: "post",
        success: function(response){
            //make use of response
            var collabs = JSON.parse(response);
            var len = collabs.length;
            if(len > 0){
                
                for (var i = 0; i < len; i++) {
                    
                    var collabours = getCollaborators(collabs[i].collabo_id);
                    //console.log("Got Collaborators: " + collabours);
                    var collanItem = '<div class="collabo-item col-md-6" data-collab-id='+ collabs[i].collabo_id + ' data-project-id='+ collabs[i].project_id + '>'+
                                        '<h1>' + collabs[i].collabo_heading + '</h1>'+
                                        '<div class="artists col-md-6">' + '<ul>' + collabours + '</ul>' + '</div>'+
                                        '<div class="collab-response col-md-6">'+
                                            '<button id="btn-view-work" type="submit" class="btn btn-animated btn-contact ripple-alone" data-text="view work" style="width: 100px;">'+
                                                '<span class="btn-icon"><span class="loader-parent"><span class="loader3"></span></span></span>'+
                                            '</button>'+
                                            '<div class="stars">'+
                                              '<form action="">'+
                                                '<label class="star fa fa-star-o" for="star-5"></label>'+
                                                '<label class="star fa fa-star-o" for="star-4"></label>'+
                                                '<label class="star fa fa-star-o" for="star-3"></label>'+
                                                '<label class="star fa fa-star-o" for="star-2"></label>'+
                                                '<label class="star fa fa-star-o" for="star-1"></label>'+
                                              '</form>'+
                                            '</div>'+
                                        '</div>'+
                                    '</div>'; 
                }
                $('#collab-items').append(collanItem);
            }
            else{
                var noCollabs = '<h1 class="no-collabs">There Are Currently no Collaborations available.</h1>';
                $('#collab-items').append(noCollabs);
            }
        }
    });
//View Collab Work
    $(document).on('click', '#btn-view-work', function(e){
	    e.preventDefault();
	    
	    //$('#timeline').empty();
	    var project_id = $(this).parents(".project-item").attr("data-project-id");
	    $('#viewProjectModal').attr("data-project-id", project_id)
	    
		$('#viewProjectModal').modal('show');
		
		var img;
		
		$.ajax({
		    url: server_url + "get-project.php",
		    data: {
		        //post data to server
                "id": user_id,
                "project_id": project_id
		    },
		    cache: false,
		    method: "post",
		    success: function(response){
		        //make use of response
		        var project = JSON.parse(response);
		        img = project.image;
		        
		        $('#viewProjectModal .modal-project-cover img').attr('src', img);
		        $('#viewProjectModal .modal-title h1').text(project.title);
		    }
		});
		
		getProjectEntries(project_id);
    });
});

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) === 0) return c.substring(name.length, c.length);
    }
    return "";
}

function getCollaborators(collabID){
    var result = "";
    
    $.ajax({
    	url: server_url + "get-collaborations-list.php",
    	data: {
    		//post data to the server
    		"collab-id": collabID
    	},
    	async: false,
    	cache: false,
    	method: "post",
    	success: function(response){
    		//make use of the response
            var collaborators = JSON.parse(response);
            var len = collaborators.length;
            var username = collaborators.username;
            
            for(var i = 0; i < len; i++){
                result += '<li><a href="http://localhost/view_profile.html?="'+ username +'">' + username + '</a>,</li>';
            }
            
    	},
        error: function(XMLHttpRequest, textStatus, errorThrown){
            console.log("Status: " + textStatus);
            console.log("Error: " + errorThrown);
        }
    });
    
    return result;
}
function getProjectEntries(project_id){
    $.ajax({
        url: server_url + "get-project-entry.php",
        data: {
            //post data to the server
            "id": user_id,
            "project_id": project_id
        },
        cache: false,
        method: "post",
        success: function(response){
            //make use of response
            var entries = JSON.parse(response);
            var len = entries.length;
            var time_line = "";
            var madia_type = entries.entry_type;
            
            if(len > 0){
                for(var i = 0; i < len; i++){
                    var mediaType = entries[i].entry_type;
                    var entryMedia;
                    
                    if(mediaType === "image"){
                        entryMedia = '<img src="' + entries[i].media + '">';
                    }
                    
                    time_line += '<div class="time-stamp selected" data-entry-id='+ entries[i].id +'>'+
                                    entryMedia+
                                    '<h2><span class="fa fa-square"></span>' + entries[i].date.replace(/-/g,'/') + '</h2>'+
                                    '<p>'+ entries[i].description+'</p>'
                                '</div>';
                }
            }
            else{
                time_line = '<h3>No project entries</h3>';
            }
            
            $('#timeline').append(time_line);
        }
    });
}
function rateCollab(rating, collabID){
    //rate a collaboration
    $.ajax({
        url: server_url + "rate-collabo.php",
        data:{
            "id": user_id,
            "collabo_id": collabID,
            "rating": rating
        },
        cache: false,
        method: "post",
        success: function(response) {
            //Make use of response
            
        }

    });
}
function findLikeUsers(stringLookUp){
    //search and display users.
    $.post(server_url + "search-users.php", {
        id : '22',
        search : stringLookUp
    }, function (data) {
        var get = JSON.parse(data);
        if(get.length>0){
            var names = get.firstname;
            $('.searchList').html('');
            for(var a of get){
                $('.searchList').append('<div class="userSearchResults" data-user-id="'+ a.id+'"><a class="btn" href="#"><p>@'+a.username+'</p></a></div>');
            }
        }else{
            $('.searchList').html('<p style="text-align:center;"><i style="margin:auto;">No results</i></p>');
        }
    });
}