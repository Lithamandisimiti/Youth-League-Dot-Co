var server_url = "http://139.59.139.239/ylbackend/api/";
//var urlLink = "https://youthleague.co/";
//var server_url = "http://localhost/ylbackend/api/";
//var urlLink = "file:///home/james/Desktop/Projects/yluserweb/";

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

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

function checkCookie() {
    var user = getCookie("id");
    if (user != "") {

    } else {
        window.location.href="index.html"
    }
}

var data = window.location.toString();
if (data.indexOf("=")>0) {
    var lookFor = data.substring(data.indexOf("=")+1);
}

var user_username=getCookie("user")

//alert('I am ' + getCookie('id'));

$(document).ready(function(){
//Search

    $.ajax({
        url: server_url+"search-users.php",
        data: {
            //post data to the server
            "id": getCookie('id'),
            "search": lookFor
        },
        cache: false,
        method: "post",
        success: function(response){
            //make use of the response
            var searchResults = JSON.parse(response);
            var numRes = searchResults.length;
            var userRes = "";

            if(numRes > 0){
                for(var i = 0; i < numRes; i++){
                    // alert(searchResults[i].id)
                    if(searchResults[i].following=="true"){
                        var followButton='data-text="Unfollow"';
                    }else{
                        var followButton='data-text="Follow"';
                    }
                    userRes += '<div class="search-result col-sm-12 col-xs-12">'+
                                    '<div class="search-user-image col-sm-2 col-xs-12">'+
                                        '<img src="'+ searchResults[i].image +'">'+
                                    '</div>'+
                                    '<div class="col-sm-10 col-xs-12">'+
                                       '<a href="http://localhost/view_profile.html?='+ searchResults[i].username +'" class="col-md-8"><strong>' + searchResults[i].firstname+' "'+ searchResults[i].username +'" ' + searchResults[i].lastname +'</strong></a>';
                    if(user_username!=searchResults[i].username){
                        userRes+=       '<button type="submit" class="col-md-3 btn btn-animated btn-contact ripple-alone" data-user-id='+searchResults[i].id+' '+followButton+'>'+
                                            '<span class="btn-icon">'+
                                                '<span class="loader-parent">'+
                                                    '<span class="loader3"></span>'+
                                                '</span>'+
                                            '</span>'+
                                        '</button>'
                    }else{
                        userRes+="";
                    }
                    userRes+=  '</div></div>';
                }

            }
            else{
                userRes = '<p>NO results for <strong>'+ lookFor +'</strong></p>'
            }
            $('.search-results').append(userRes);
        }
    });
    $(document).on("click",".search-result .btn-contact",function (argument){
        let status=$(this).attr("data-text");
        let self=this;
        let logged_id=getCookie("id");
        let user_id=$(this).attr("data-user-id");
        //  alert(status+" "+$(this).attr("data-user-id"))
        $(this).addClass("btn-loading");
        if(status=="Follow"){
            $.post(server_url+"follow.php", {
                    "id": logged_id,
                    "follow_id":user_id
                },
                function(response){
                    //make use of the response here
                    if(response=="true"){
                        $(self).attr("data-text","Unfollow");
                        $(self).removeClass("btn-loading");

                    }

                }
            );
        }else if(status=="Unfollow"){
            $.post(server_url+"unfollow.php", {
                    "id": logged_id,
                    "follow_id":user_id
                },
                function(response){
                    //make use of the response here
                    if(response=="true"){
                        $(self).attr("data-text","Follow");
                        $(self).removeClass("btn-loading");

                    }

                }
            );
        }
    })
});
