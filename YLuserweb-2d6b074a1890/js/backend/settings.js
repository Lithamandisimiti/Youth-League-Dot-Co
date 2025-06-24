// var server_url = "https://api.youthleague.co/api/";
var server_url = "http://139.59.139.239/ylbackend/api/";


var user_id=getCookie("id");
var user_username=getCookie("user");
var artistsArray=[];
var artistsNamesArray=[];
    if(user_id==null || user_username==null || user_username=="" || user_id==""){
        window.open("index.html","_self");
    }

if(user_id==null || user_username==null || user_username=="" || user_id==""){
    window.open("index.html","_self");
}

$(document).ready(function(){


//Change Password
    $("#btn-change-password").on("click",function(e){
        let newPass=$("#password-new").val();
        let newPassConf=$("#password-new-confirm").val();
        let oldPass=$("#password-old").val();
        //alert(oldPass)


        if(newPass=="" ||newPassConf==""||oldPass==""){
            $("#btn-cover-password").trigger("click");
        }else{
            if(newPass==newPassConf){
                let self=this;
                $(self).addClass("btn-loading");
                $.ajax({
                	url: server_url+"change-password.php",
                	data: {
                      "id": user_id,
                      "oldPass": oldPass,
                      "newPass": newPass
                	},
                	cache: false,
                	method: "post",
                	success: function(response){
                		//make use of the response
                		//console.log(response)
                		$(self).removeClass("btn-loading");
                		if(response=="true"){
                		    $("#Change-password form")[0].reset();
                		    $("#Change-password .settings-success").css({"display":"block"})
                		    $("#Change-password .settings-error").css({"display":"none"})
                		}else{
                		    $("#Change-password .settings-error").html("Failed to change password");
                		    $("#Change-password .settings-error").css({"display":"block"})
                		    $("#Change-password .settings-success").css({"display":"none"})
                		}
                	}
                });
            }else{
    		    $("#Change-password .settings-error").html("New password doesn't match");
    		    $("#Change-password .settings-error").css({"display":"block"});
    		    $("#Change-password .settings-success").css({"display":"none"});

            }
        }
    });
//Change Username
    $("#btn-change-username").on("click",function(e){
        let username=$("#Change-username input").val();
        $(self).addClass("btn-loading");
        if(username!=""){
           $.ajax({
            	url: server_url+"change-username.php",
            	data: {
                  "id": user_id,
                  "username": username
            	},
            	cache: false,
            	method: "post",
            	success: function(response){
            	    $(self).removeClass("btn-loading");
                		if(response=="true"){
                		    $("#Change-username .settings-success").css({"display":"block"})
                		    $("#Change-username .settings-error").css({"display":"none"})
                		}else{
                		    $("#Change-username .settings-error").css({"display":"block"})
                		    $("#Change-username .settings-success").css({"display":"none"})
                		}
            	}
            });
        }
    });
//Change Email
    $("#btn-change-email").on("click",function(e){
        let email=$("#Change-email input").val();

        // console.log(email)

	    if (email!="") {
		    var atpos = email.indexOf("@");
		    var dotpos = email.lastIndexOf(".");
		    if (atpos<1 || dotpos<atpos+2 || dotpos+2>=email.length) {
		        $("#Change-email .settings-error").html("Not a valid e-mail address");
    		    $("#Change-email .settings-error").css({"display":"block"})
    		    $("#Change-email .settings-success").css({"display":"none"})
		    }else{
    		    $("#Change-email .settings-error").css({"display":"block"});
    		    $("#Change-email .settings-success").css({"display":"none"});
    		    $(self).addClass("btn-loading");
                $.ajax({
                	url: server_url+"change-email.php",
                	data: {
                      "id": user_id,
                      "email": email
                	},
                	cache: false,
                	method: "post",
                	success: function(response){
                	   // console.log(response)
                	   $(self).removeClass("btn-loading");
                    		if(response=="true"){
                    		    $("#Change-email form")[0].reset();
                    		    $("#Change-email .settings-success").css({"display":"block"})
                    		    $("#Change-email .settings-error").css({"display":"none"})
                    		}else{
                    		    $("#Change-email .settings-error").html("Email already in use. Please try another");
                    		    $("#Change-email .settings-error").css({"display":"block"})
                    		    $("#Change-email .settings-success").css({"display":"none"})
                    		}
                	}
                });

		    }

	    }else{
    	    $("#Change-email .settings-error").css({"display":"block"})
    	    $("#Change-email .settings-success").css({"display":"none"})

	    }
    });
//Change User Privacy
    $("#btn-details-privacy").on("click",function(){
        let value=$(".details-privacy-options select").val();
        let self=this;
        $(self).addClass("btn-loading");
        $.ajax({
        	url: server_url+"change-details-privacy.php",
        	data: {
              "id": user_id,
              "value": value
        	},
        	cache: false,
        	method: "post",
        	success: function(response){
        		//make use of the response
        		$(self).removeClass("btn-loading");
        // 		console.log(response)
        		if(response=="true"){
        		    $("#Details-privacy .settings-error").css({"display":"none"});
        		    $("#Details-privacy .settings-success").css({"display":"block"});
    		    }else{
        		    $("#Details-privacy .settings-error").css({"display":"block"});
        		    $("#Details-privacy .settings-success").css({"display":"none"});
    		    }
        	}
        });
    });
//Get USER PRIVACY AND SETTINGS
    $.ajax({
    	url: server_url+"get-user-settings.php",
    	data: {
    		"id":user_id
    	},
    	cache: false,
    	method: "post",
    	success: function(response){
    		//make use of the response
    		console.log("response: "+response)
    		if(response!="[]"){
        		let priv=JSON.parse(response);
        		$(".details-privacy-options select").val(parseInt(priv[0].details));
        		$(".post-privacy-options select").val(parseInt(priv[0].posts));
        		$(".message-privacy-options select").val(parseInt(priv[0].messages));
        		if(priv[0].account_deactivated==0){
        		    $("#btn-deactivate-account").attr("data-status","active");
        		    $("#btn-deactivate-account").attr("data-text","deactivate account");

        		}else{
        		    $("#btn-deactivate-account").attr("data-status","deactive");
        		    $("#btn-deactivate-account").attr("data-text","Reactivate account");

        		}
        // 		alert("yo: "+$(".message-privacy-options select").val() +" should be "+parseInt(priv[0].messages)+" or "+priv[0].messages)

    		}
    	}
    });
//RE/ACTIVATE ACCOUNT
    $("#btn-deactivate-account").on("click",function(){
        let status=$(this).attr("data-status");
        $(this).addClass("btn-loading");
        let self=this;
        if(status=="active"){
            console.log(status+"  text:"+$(this).attr("data-text"));
            $.ajax({
            	url: server_url+"deactivate-account.php",
            	data: {
            		"id":user_id
            	},
            	cache: false,
            	method: "post",
            	success: function(response){
            		//make use of the response
            		console.log("deact response: "+response)
            		if(response=="true"){
                        $(self).attr("data-status","deactive");
                        $(self).attr("data-text","Reactivate account");
            		}else{
            		    console.log("error: "+response)
            		}
            		$(self).removeClass("btn-loading");
            	}
            });
        }else{
            console.log(status+"  text:"+$(this).attr("data-text"));
            $.ajax({
            	url: server_url+"activate-account.php",
            	data: {
            		"id":user_id
            	},
            	cache: false,
            	method: "post",
            	success: function(response){
            		//make use of the response
            		console.log("deact response: "+response)
            		if(response=="true"){
                        $(self).attr("data-status","active");
                        $(self).attr("data-text","deactivate account");
            		}else{
            		    console.log("error: "+response)
            		}
            		$(self).removeClass("btn-loading");
            	}
            });

        }
    });
//Change Post Privacy
    $("#btn-post-privacy").on("click",function(){
        let value=$(".post-privacy-options select").val();
        let self=this;
        $.ajax({
        	url: server_url+"change-posts-privacy.php",
        	data: {
              "id": user_id,
              "value": value
        	},
        	cache: false,
        	method: "post",
        	success: function(response){
        		//make use of the response
        		$(self).removeClass("btn-loading");
        // 		console.log(response)
        		if(response=="true"){
        		    $("#Post-privacy .settings-error").css({"display":"none"});
        		    $("#Post-privacy .settings-success").css({"display":"block"});
    		    }else{
        		    $("#Post-privacy .settings-error").css({"display":"block"});
        		    $("#Post-privacy .settings-success").css({"display":"none"});
    		    }
        	}
        });
    });
//Change Message Privacy
    $("#btn-message-privacy").on("click",function(){
        let value=$(".message-privacy-options select").val();
        let self=this;
        $(self).addClass("btn-loading");
        $.ajax({
        	url: server_url+"change-messages-privacy.php",
        	data: {
              "id": user_id,
              "value": value
        	},
        	cache: false,
        	method: "post",
        	success: function(response){
        		//make use of the response
                //console.log(response)
                $(self).removeClass("btn-loading");

        		if(response=="true"){
        		    $("#Message-privacy .settings-error").css({"display":"none"});
        		    $("#Message-privacy .settings-success").css({"display":"block"});
    		    }else{
        		    $("#Message-privacy .settings-error").css({"display":"block"});
        		    $("#Message-privacy .settings-success").css({"display":"none"});
    		    }
        	}
        });
    });

//Blocking
    //init blocking
    $.ajax({
    	url: server_url+"get-blocked.php",
    	data: {
    		"id":user_id
    	},
    	cache: false,
    	method: "post",
    	success: function(response){
    		//make use of the response
    		if(response && response!="[]"){
    		    let list=JSON.parse(response);
    		    let blockList="";
    		    for(var i=0;i<list.length;i++){
                    var blockedUser = '<li class="list-group-item">'+ list[i].username +' <a href="#" data-user-id='+list[i].id +'>Unblock</a></li>';
                    blockList+=blockedUser;


    		    }
    		     $(".blocked-users .list-group").append(blockList)
    		}
    	}
    });
    $('#Blocking-settings .search-button').click(function(){
        $('#Search-results .list-group').empty();
        var searchText = $('#search-block-user').val();
        findLikeUsers(searchText);
    });
    $('#search-block-user').keyup(function(e) {
        if(e.which == 13) {
            $('#Search-results .list-group').empty();
            var searchText = $('#search-block-user').val();
            findLikeUsers(searchText);
            $('#Search-results').modal('show');
        }
    });
    //Make request to block user
    $(document).on('click', '.blocked-users .list-group .list-group-item a', function(e){
        e.preventDefault();

        var me = this;
        var userID = $(me).attr('data-user-id');

        console.log("UNBLOCK "+$(this).parent().attr("class")+" id:"+userID)

        //tell DB to unblock user
        $.ajax({
            url: server_url+"unblock.php",
            data: {
                // send data
                "id":user_id,
                "block_id":userID
            },
            cache: false,
            method: "post",
            success: function(response){
                //make use of response
                if(response=="true"){
                    $(me).parent().hide(500);
                }else{
                    console.log("error "+response)
                }
            }
        });
    });
    $(document).on('click', 'button.btn-contact', function(e){
        e.preventDefault();

        var me = this;
        var userID = $(me).attr('data-user-id');
        var userLink = $(me).parents('.search-result').find('a');
        var userNames = $(me).attr('data-username');

        //tell DB to Block user
        $.ajax({
            url: server_url+"block.php",
            data: {
                //send data
                "id":user_id,
                "block_id":userID
            },
            cache: false,
            method: "post",
            success: function(response){
                //make use of response
                if(response=="true"){
                    $('#Search-results').modal('hide');
                    var blockedUser = '<li class="list-group-item">'+ userNames +' <a href="#" data-user-id='+userID +'>Unblock</a></li>';
                    $(".blocked-users .list-group").append(blockedUser)
                }else{
                    console.log("error "+response)
                }
            }
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

function findLikeUsers(stringLookUp){
    console.log("LOOKUP")
    $.ajax({
        url: server_url+"search-users.php",
        data: {
            id : user_id,
            search : stringLookUp
        },
        cache: false,
        method: "post",
        success: function (response) {
            //make use of response
            console.log(response)
            var searchResults = JSON.parse(response);
            var numResults = searchResults.length;
            if(numResults > 0){
                var names = searchResults.firstname;
                var users = "";
                for(var i = 0; i < numResults; i++){
                    users +=  '<li class="list-group-item"> <div class="search-result">'+
                                        '<div class="search-user-image col-sm-2 col-xs-3"><img src="'+searchResults[i].image+'"></div>'+
                                        '<div class="col-sm-10 col-xs-9">'+
                                            '<a href="http://localhost/view_profile.html?='+searchResults[i].username+'"><h2>'+
                                                searchResults[i].firstname+' "'+ searchResults[i].username +'" ' + searchResults[i].lastname+ '</h2>'+
                                            '</a>'+
                                            '<button type="submit" class="col-md-3 btn btn-animated btn-contact btn-block ripple-alone" data-text="Block" data-username="'+searchResults[i].username+'" data-user-id="'+searchResults[i].id+'">'+
                                                '<span class="btn-icon"><span class="loader-parent"><span class="loader3"></span>span></span>'+
                                            '</button>'+
                                        '</div>'+
                                    '</div>'+
                                '</li>';
                }
                $('#Search-results .list-group').append(users);
            }
            else{
                $('.searchList').html('<p style="text-align:center;"><i style="margin:auto;">No results</i></p>');
            }
        },
        fail: function (response) {
            //make use of response
            console.log("fail "+response)
        },
        error: function (response) {
            //make use of response
            console.log("error "+response)
        }
    });
}
