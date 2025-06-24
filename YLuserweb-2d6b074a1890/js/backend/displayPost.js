// var server_url = "https://api.youthleague.co/api/";
var server_url = "http://139.59.139.239/ylbackend/api/";

var user_id=2;
var logged_id=getCookie("id");
var dp = getCookie("dp");
var allWaves=[];

var pushes = [];

    if(logged_id==null || logged_id==""){
        window.open("index.html","_self");
    }

    var a = window.location.toString();
    if (a.indexOf("=")<0) {
      var id="";

    } else {
        var id=a.substring(a.indexOf("=")+1);
    }


    if(id==null || id==""){
        window.open("mainf.html","_self");
    }

$(function(){
	$.post(server_url+ "get-post.php", {
		  "id": logged_id,
		  "post_id": id
	    },
	    function(response){
	    	if (response!="[]" && response!=null) {
				var post = JSON.parse(response);

				var icons;
				var html="";
				var content = document.getElementById("user_posts");
				var obj = post[0].post_id;
				var post_id = "post" + obj;
				var text_id = "submit_comment" + obj;
				var comments= "comments" + obj;
				var comment_section = "comment_section" + obj;
				var write_comment = "write_comment" + obj;
				var star_id1 = "like" +obj;
				var star_id2 = "unlike" + obj;

				let Months=["January","February","March","April","May","June","July","August","September","August","September","October","November","December"];
                    var dt=new Date(post[0].date_time);
                    var dtNow=new Date();
				var date;

                    if((dtNow.getTime()-dt.getTime())<(8.64*Math.pow(Math.E,7))){
                        date="Today"
                    }else if((dtNow.getTime()-dt.getTime())<(1.728*Math.pow(Math.E,8))){
                        date="Yesterday,"+dt.getHours()+":"+dt.getMinutes();

                    }else{
                        date=Months[dt.getMonth()]+" "+dt.getDate()+", "+dt.getHours()+":"+dt.getMinutes();
                    }
                    if(post[0].category_name){
                        var cats='<i class="fa fa-folder-open"></i><a href="mainf.html?='+post[0].category_id+'">'+post[0].category_name+'</a>';
                    }else{
                        var cats='';
                    }
                    if(post[0].liked === "true"){
                        icons = '<div class="blog-item-detail row"><div class="col-sm-9"><a href="view_profile.html?='+post[0].username+'"><i class="fa fa-user"></i>'+post[0].username+'</a>'+cats+'<a href="#" onclick="return false" id="comments_icon" class="comments_iconClass" data-post-id="'+obj+'"><i class="fa fa-comment"></i> comments</a><a href="#" class= "starClass" id="'+star_id1+'" data-post-id="'+obj+'" onclick="return false" style="display:none"><i class="ion-ios-star-outline"  style="font-size: 17px;"></i></a><a class= "starClass" href="#" id="'+star_id2+'" data-post-id="'+obj+'" onclick="return false"><i class="ion-ios-star"  style="font-size: 17px;"></i>'+post[0].likes+'</a></div></div>';
                    }else{
                        icons = '<div class="blog-item-detail row"><div class="col-sm-9"><a href="view_profile.html?='+post[0].username+'"><i class="fa fa-user"></i>'+post[0].username+'</a>'+cats+'<a href="#" onclick="return false" id="comments_icon" class="comments_iconClass" data-post-id="'+obj+'"><i class="fa fa-comment"></i> comments</a><a href="#" class= "starClass" id="'+star_id1+'" data-post-id="'+obj+'" onclick="return false"><i class="ion-ios-star-outline"  style="font-size: 17px;"></i>'+post[0].likes+'</a><a class= "starClass" href="#" id="'+star_id2+'" data-post-id="'+obj+'" onclick="return false" style="display: none;"><i class="ion-ios-star"  style="font-size: 17px;"></i></a></div></div>';
                    }

                    if(post[0].type == "video"){
                        image = '<a id="'+obj+'" data-post-id="'+obj+'" href="#" onclick="return false"><div class="videoBlock"><video data-skin="light" id="myvideo" class="afterglow" id="myvideo" height="350"><source type="video/mp4" src="'+post[0].media_url+'" /><source type="video/webm" src="'+post[0].media_url+'" /><source type="video/ogg" src="'+post[0].media_url+'" /></video></div></a>';

                    }
                    if(post[0].type == "audio"){
                        image = '<a id="'+obj+'" data-post-id="'+obj+'" href="#" onclick="return false"><div class="audioBlock" style="background-image: url('+post[0].cover_image+');"><div class="whiteMask"><div id="waveform1" class="audioWave" data_song="'+post[0].media_url+'" data_id="'+obj+'"></div><div class="audioControls"><button type="button" name="button" class="smaller ion-ios-volume-low" onclick="volume('+obj+', -0.25)"></button><button type="button" name="button" class="smaller ion-ios-volume-high" onclick="volume('+obj+', 0.25)"></button><button type="button" name="button" class="play ion-ios-play" onclick="playOrPauseSong('+obj+')"></button><button type="button" name="button" class="smaller ion-stop" onclick="stopPlay('+obj+')"></button><button type="button" name="button" class="smaller ion-volume-mute" onclick="mute('+obj+')"></button></div></div></div></a>';

		                 allWaves=[]
                    }
                    if(post[0].type == "image"){
                        image = '<a class="media_content" id="'+obj+'" data-post-id="'+obj+'" href="post[0].html?='+obj+'" onclick="return false"><img style="width:100%; height:auto" src="'+post[0].media_url+'" /></a>';
                    }


				var text = '<div class="row blog-item-title-wrapper" style="border-bottom: 2px solid #F3F3F5; padding-bottom: 10px;"><div class="blog-item-title col-sm-6"><h1 class=" font-second">'+post[0].title+'</h1><span class="post-date">'+date+'</span></div><!-- Text Intro --><div class="col-sm-6 blog-item-body"><p>'+post[0].description+'</p></div></div>';
				comments = '<div id="'+comments+'" class="commentsClass" style="display: none; margin:auto; width: 90%; height: auto;"><div class="comment_section" id = "'+comment_section+'" style="max-height: 300px; overflow:auto"></div><div class="row" id="userinput_comment" style="border-top: 2px solid #F3F3F5;"><object data="'+dp+'"><img id="img" class="col-sm-4" src="images/user.png"></object><div class=" col-sm-9" id="comment_input"><form class="comment_-form"><textarea id="'+write_comment+'" name ="comment" style="height: 35px; width: 35vw; resize: none; outline: none; border: 2px solid #F3F3F5" placeholder="What are your thoughts?"></textarea></form><button id="submit_comment" type="submit" class="btn btn-animated btn-contact ripple-alone submit_comment" data-text="upload" style="width: 100px;"><span class="btn-icon"><span class="loader-parent"><span class="loader3"></span></span></span></button></div></div></div>';
				var html = ' <div data-post-id="'+obj+'" class="blog-item">'+image+icons+text+comments+'</div>';
				content.innerHTML = content.innerHTML + html;
				if (post[0].type!="image") {

		                 afterglow.init();

		                  $('.audioWave').each(function(i, obj) {
		                      var wavesurfer = WaveSurfer.create({
		                          container: obj,
		                          waveColor: 'rgba(0,0,0,.6)',
		                          progressColor: 'black'
		                      });
		                      wavesurfer.load($(obj).attr('data_song'));
		                      wavesurfer.on('finish', function(){
		                        $('.play').removeClass('ion-ios-pause');
		                        $('.play').addClass('ion-ios-play');
		                      })
		                      allWaves[ $(obj).attr('data_id') ] = wavesurfer;
		                  });

		                    $('.play').click(function(){
		                      if( $(this).attr('class') == 'play ion-ios-play'){
		                        $(this).removeClass('ion-ios-play');
		                        $(this).addClass('ion-ios-pause');
		                      }else{
		                        $(this).removeClass('ion-ios-pause');
		                        $(this).addClass('ion-ios-play');
		                      }
		                    });
				}

	    	}
	    }
	);
});


/*$(document).ready(function(){
    //COMMENTS
    $(function(){
        $(document).on('click', '.comments_iconClass', function(){
            post_id = $(this).data('post-id');
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
                        var comments = JSON.parse(response);
                        var numComments = comments.length;
                        var commentsDiv = "#comment_section" + post_id;
                        for(var i=numComments-1; i>=0;i--){
                            var comment = '<div class="row" id="user_comment"><object data="'+comments[i].image+'"><img id="img" class="col-sm-4" src="images/user.png"></object><a href=""><h6>'+comments[i].name+'</h6></a><div class="col-sm-9" id="comment"><p>'+comments[i].comment+'</p></div></div>';
                            $(commentsDiv).append(comment);

                        }
                        $("#comments"+post_id).css("display","block");
                },
                error:function(){
                    console.log("Could not connect");
                }
            });
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
      /*  $(document).on("click", '.submit_comment', function(e){
            e.preventDefault();
            var input = "textarea#write_comment" + post_id;
            var formData = $(input).val().toString();
            if(formData == ""){
                console.log(formData);
                return;
            }
            $.ajax({
                    url:server_url+"comment.php",
                    data:{
                        "id": id,
                        "post_id": post_id,
                        "comment":formData
                    },
                    cache: false,
                    method: "post",
                    success:function(response){
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
    $(".comments_iconClass").trigger("click");
});*/
