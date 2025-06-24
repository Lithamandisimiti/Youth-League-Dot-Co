// var server_url = "https://api.youthleague.co/api/";
var server_url = "http://139.59.139.239/ylbackend/api/";


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

var post_id;
 var called = false;
 var lastPost = 4;

 function loadComments(id){
	var userComment  = "#comments" + post_id;
	var commentsDiv = "#comment_section" + post_id;

	$.ajax({
        	url:server_url + "get-comments.php",
        	data:{
        		"post_id" :post_id,
        		"from":id,
        		"limit":id+4
        		},
        	cache: false,
        	method: "post",
        	success:function(response){
        	        console.log('getting more comments');
        	        //alert('loading commends. ln47');
        			//console.log(response);
        			var comments = JSON.parse(response);
        			var numComments = comments.length;
        			for(var i=0; i<numComments; i++){
        			    comments[i].comment = comments[i].comment.replace(/&amp;lt;/g, "&lt;").replace(/&amp;gt;/g, "&gt;");
        			    console.log(comments[i].comment);
        				var comment = '<div class="row" id="user_comment"><object data="'+comments[i].image+'"><img id="img" class="col-sm-4" src="images/user.png"></object><a href=""><h6>'+comments[i].name+'</h6></a><div class="col-sm-9" id="comment"><p>'+comments[i].comment+'</p></div></div>';
        				$(commentsDiv).prepend(comment);
        			}
        		    console.log("done with comments");
        			},
        			error:function(){
        				console.log("Could not connect");
        			}
        	});
        	return id+4;
}


$(function(){

	$(document).on('click', '.comments_iconClass', function(){
		post_id = $(this).data('post-id');
		var userComment  = "#comments" + post_id;
		 var commentsDiv = "#comment_section" + post_id;
		if(!$(userComment).is(':visible')){

		   // if(called === false){
		         $.ajax({
        			url:server_url+"get-comments.php",
        			data:{
        				"post_id" :post_id,
        				"from":0,
        				"limit":4


        			},
        			cache: false,
        			method: "post",
        			success:function(response){
        					//console.log(response);
        					//alert('feed ba ln89');
        					var comments = JSON.parse(response);
        					var numComments = comments.length;
        					for(var i=numComments-1; i>=0;i--){
        					    comments[i].comment = comments[i].comment.replace(/&amp;lt;/g, "&lt;").replace(/&amp;gt;/g, "&gt;");
        					    //console.log('comment= ' + comments[i].comment);
        						var comment = '<div data-id = "'+comments[i].comment_id+'" class="row" id="user_comment"><object data="'+comments[i].image+'"><img id="img" class="col-sm-4" src="images/user.png"></object><a href=""><h6>'+comments[i].name+'</h6></a><div class="col-sm-9" id="comment"><p>'+comments[i].comment+'</p></div></div>';
        						$(commentsDiv).append(comment);
        					}
        					console.log("done with comments");
        					called = true;
        			},
        			error:function(){
        				console.log("Could not connect");
        			},
        			async:false
        		});
		   // }
			$(userComment).show();
			$('html, body').animate({ scrollTop: $(this).offset().top }, 1000);
            $('.comment_section').on('scroll', function() {
                console.log('in');
                if ($(this).scrollTop()<=0) {
                    lastPost = loadComments(lastPost);
                }
            });

		}else{
			$(userComment).hide();
		}





	});

});

$(function(){
	var id = getCookie("id");
	var user = getCookie('user');
	var dp = getCookie('dp');
	/*$('#write_comment').keypress(function(e){
		var code = (e.keyCode ? e.keycode  : e.which);
		if(code == 13){
			//$("#submit_comment").trigger('click');
			//return true

		}
	});*/
	$(document).on("click", '.submit_comment', function(e){
		e.preventDefault();
		var input = "textarea#write_comment" + post_id;
		var formData = $(input).val().toString();
		formData = formData.replace(/</g, "&lt;").replace(/>/g, "&gt;");
		console.log('data= ' + formData);
		//console.log("id: "+id);
		//console.log(post_id);
		if(formData == ""){
			console.log(formData);
			return;
		}
		$.ajax({
				url:"comment.php",
				data:{
					"id": id,
					"post_id": post_id,
					"comment":formData
				},
				cache: false,
				method: "post",
				success:function(response){
					//console.log(response);
					var commentsDiv = "#comment_section" + post_id;
					if(response.trim() == "true"){
						console.log(commentsDiv);
						var comment = '<div class="row" id="user_comment"><object data="'+dp+'"><img id="img" class="col-sm-4" src="images/user.png"></object><a href=""><h6>'+user+'</h6></a><div class="col-sm-9" id="comment"><p>'+formData+'</p></div></div>';
						$(commentsDiv).append(comment);
						$(input).val('');
					}else{
						console.log('failed');
					}
				},
				error:function(){
					console.log('Could not connect');
				}
			});
	});
});
