// var server_url = "https://api.youthleague.co/api/";
var server_url = "http://139.59.139.239/ylbackend/api/";


var user_id=getCookie("id");
var user_username=getCookie("user");
var dp = getCookie("dp");
var lastPost=10;
var allWaves=[];


var a = window.location.toString();
if (a.indexOf("=")<0) {
    var cat_id="";
} else {
    var cat_id=a.substring(a.indexOf("=")+1);
}

//if url came attached with category id, show only category posts, else normal newsfeed
if(cat_id==""){
  var url=server_url+"get-posts.php",
      data={
            "id": user_id,
            "from": "0",
            "limit": lastPost
          };
          $(".page-header-title-middle h1").html("Home<span>.</span>");

}else if(cat_id=="explore"){
  var url=server_url+"get-hot-posts.php",
      data={
            "id": user_id,
            "from": "0",
            "limit": lastPost
          };

          $(".page-header-title-middle h1").html("Explore<span>.</span>");

}else {
  var url=server_url+"get-category-posts.php",
      data={
              "id": user_id,
              "category": cat_id,
              "from": "0",
              "limit": lastPost
          };

}
  $(function() {
    $(".main-post-area").addClass("ylhomeloader");
    $(".main-post-area").html("");
    $.post(url, data,
        function(response){
          //make use of the response here
            if(response!="[]" && response!=null){
                  console.log(response);

                    let posts=JSON.parse(response);
                    let len=posts.length;
                    let postCont="";
                    let Months=["January","February","March","April","May","June","July","August","September","October","November","December"];

                    for (var i = 0; i < len; i++) {
                        var dtT=posts[i].date_time.split(" ");
                        var dt=Date.parseExact(dtT[0],"yyyy-MM-dd");
                        var H=dtT[1].split(":")[0];
                        var M=dtT[1].split(":")[1];
                        var dtNow=new Date();
                        var date=Months[dt.getMonth()]+" "+dt.getDate()+", "+H+":"+M;


                        if(posts[i].status=="post"){
                            postCont+=postComponent(posts[i],date);
                        }
                    }

                  $(".main-post-area").removeClass("ylhomeloader");
                  $(".main-post-area").html(postCont);
                        try{
                         afterglow.init();
                        }catch(e){
                            console.log(e);
                        }
                       // alert($('.audioWave').length)
                    //   allWaves=[]
                        $('.audioWave').each(function(i, obj) {
                            if($(this).find("wave").length<1){
                                var wavesurfer = WaveSurfer.create({
                                    container: obj,
                                    waveColor: 'rgba(0,0,0,.6)',
                                    progressColor: 'black',
                                    backend: 'MediaElement'
                                });
                                wavesurfer.load($(obj).attr('data_song'));
                                wavesurfer.on('finish', function(){
                                    $('.play').removeClass('ion-ios-pause');
                                    $('.play').addClass('ion-ios-play');
                                });
                                allWaves[ $(obj).attr('data_id') ] = wavesurfer;
                            }
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
    );

  });

$(document).ready(function(){
    if (window.location.href.toLowerCase().indexOf("about")<0) {
        var win = $(window);
        win.scroll(function() {
            // End of the document reached?
            if ($(document).height() - win.height() == win.scrollTop()) {
                if (cat_id=="") {
                    lastPost = loadPosts(lastPost);
                }else {
                    lastPost = loadCatPosts(lastPost);
                }
            }
        });
    }
});

function loadCatPosts(start){
    $(".more-posts").addClass("ylloader");
    $.post(server_url+"get-category-posts.php", {
            //post data to the server
            "id": user_id,
            "category":cat_id,
            "from": start,
            "limit": start+10
        },
        function(response){
            //make use of the response here

            if(response!="[]" && response!=null){

                let posts=JSON.parse(response);
                let len=posts.length;
                let postCont="";
                            let Months=["January","February","March","April","May","June","July","August","September","October","November","December"];

                            for (var i = 0; i < len; i++) {
                                var dtT=posts[i].date_time.split(" ");
                                var dt=Date.parseExact(dtT[0],"yyyy-MM-dd");
                                var H=dtT[1].split(":")[0];
                                var M=dtT[1].split(":")[1];
                                var dtNow=new Date();
                                var date=Months[dt.getMonth()]+" "+dt.getDate()+", "+H+":"+M;


                                if(posts[i].status=="post"){
                                    postCont+=postComponent(posts[i],date);
                                }

                            }

                $(".more-posts").removeClass("ylloader");
                $(".main-post-area").append(postCont);
                    try{
                     afterglow.init();
                    }catch(e){
                        console.log(e);
                    }
                     // alert($('.audioWave').length)
                     //allWaves=[];
                      $('.audioWave').each(function(i, obj) {
                                if($(this).find("wave").length<1){
                                  var wavesurfer = WaveSurfer.create({
                                      container: obj,
                                      waveColor: 'rgba(0,0,0,.6)',
                                      progressColor: 'black',
                                      backend: 'MediaElement'
                                  });

                                  wavesurfer.load($(obj).attr('data_song'));
                                  wavesurfer.on('finish', function(){
                                    $('.play').removeClass('ion-ios-pause');
                                    $('.play').addClass('ion-ios-play');
                                  });
                                  allWaves[ $(obj).attr('data_id') ] = wavesurfer;
                                }
                      });

            }
        }
    );

    return start+10;
}

function loadPosts(start){
    $(".more-posts").addClass("ylloader");
    $.post(server_url+"get-posts.php", {
            //post data to the server
            "id": user_id,
            "from": start,
            "limit": start+10
        },
        function(response){
            //make use of the response here

            if(response!="[]" && response!=null){

                let posts=JSON.parse(response);
                let len=posts.length;
                let postCont="";
                let Months=["January","February","March","April","May","June","July","August","September","August","September","October","November","December"];

                for (var i = 0; i < len; i++) {
                                var dtT=posts[i].date_time.split(" ");
                                var dt=Date.parseExact(dtT[0],"yyyy-MM-dd");
                                var H=dtT[1].split(":")[0];
                                var M=dtT[1].split(":")[1];
                                var dtNow=new Date();
                                var date=Months[dt.getMonth()]+" "+dt.getDate()+", "+H+":"+M;


                    if(posts[i].status=="post"){
                        postCont+=postComponent(posts[i],date);
                    }

                }

                $(".more-posts").removeClass("ylloader");
                $(".main-post-area").append(postCont);
                    try{
                     afterglow.init();
                    }catch(e){
                        console.log(e);
                    }
                     // alert($('.audioWave').length)
                     //allWaves=[];
                      $('.audioWave').each(function(i, obj) {
                                if($(this).find("wave").length<1){
                                  var wavesurfer = WaveSurfer.create({
                                      container: obj,
                                      waveColor: 'rgba(0,0,0,.6)',
                                      progressColor: 'black',
                                      backend: 'MediaElement'
                                  });

                                  wavesurfer.load($(obj).attr('data_song'));
                                  wavesurfer.on('finish', function(){
                                    $('.play').removeClass('ion-ios-pause');
                                    $('.play').addClass('ion-ios-play');
                                  });
                                  allWaves[ $(obj).attr('data_id') ] = wavesurfer;
                                }
                      });

            }
        }
    );

    return start+10;
}

function postComponent(Post,date){
                var image;
                var cover;
                var icons;
                var text;
                var html="";
                    var obj = Post.post_id;
                    var post_id = "post" + obj;
                    var text_id = "submit_comment" + obj;
                    var comments= "comments" + obj;
                    var comment_section = "comment_section" + obj;
                    var write_comment = "write_comment" + obj;
                    var star_id1 = "like" +obj;
                    var star_id2 = "unlike" + obj;
                    if(Post.category_name){
                        var cats='<i class="fa fa-folder-open"></i><a href="mainf.html?='+Post.category_id+'">'+Post.category_name+'</a>';
                    }else{
                        var cats='';
                    }
                    if(Post.liked === "true"){
                        icons = '<div class="blog-item-detail row"><div class="col-sm-9 col-xs-8"><a href="view_profile.html?='+Post.username+'"><i class="fa fa-user"></i>'+Post.username+'</a>'+cats+'<a href="#" onclick="return false" id="comments_icon" class="comments_iconClass" data-post-id="'+obj+'"><i class="fa fa-comment"></i> comments</a><a href="#" class= "starClass" id="'+star_id1+'" data-post-id="'+obj+'" data-user-id="'+Post.user_id+'" data-post-type="'+Post.type+'" onclick="return false" style="display:none"><i class="ion-ios-star-outline"  style="font-size: 17px;"></i></a><a class= "starClass" href="#" id="'+star_id2+'" data-post-id="'+obj+'" onclick="return false"><i class="ion-ios-star"  style="font-size: 17px;"></i>'+Post.likes+'</a></div><div class="col-sm-3 col-xs-4 text-right"><a href="post.html?='+obj+'" class="btn-blog-more animsition-link"><span>view post</span><i class="btn-icon fa fa-long-arrow-right"></i></a></div></div>';
                    }else{
                        icons = '<div class="blog-item-detail row"><div class="col-sm-9 col-xs-8"><a href="view_profile.html?='+Post.username+'"><i class="fa fa-user"></i>'+Post.username+'</a>'+cats+'<a href="#" onclick="return false" id="comments_icon" class="comments_iconClass" data-post-id="'+obj+'"><i class="fa fa-comment"></i> comments</a><a href="#" class= "starClass" id="'+star_id1+'" data-post-id="'+obj+'" data-user-id="'+Post.user_id+'" data-post-type="'+Post.type+'" onclick="return false"><i class="ion-ios-star-outline"  style="font-size: 17px;"></i>'+Post.likes+'</a><a class= "starClass" href="#" id="'+star_id2+'" data-post-id="'+obj+'" onclick="return false" style="display: none;"><i class="ion-ios-star"  style="font-size: 17px;"></i></a></div><div class="col-sm-3 col-xs-4 text-right"><a href="post.html?='+obj+'" class="btn-blog-more animsition-link"><span>view post</span><i class="btn-icon fa fa-long-arrow-right"></i></a></div></div>';
                    }
                    if(Post.type == "video"){
                        image = '<a id="'+obj+'" data-post-id="'+obj+'" href="#" onclick="return false"><div class="videoBlock"><video data-skin="light" preload="none" poster="'+Post.cover_image+'" id="myvideo" class="afterglow" id="myvideo" height="350"><source type="video/mp4" src="'+Post.media_url+'" /><source type="video/webm" src="'+Post.media_url+'" /><source type="video/ogg" src="'+Post.media_url+'" /></video></div></a>';
                    }
                    if(Post.type == "audio"){
                        image = '<a id="'+obj+'" data-post-id="'+obj+'" href="#" onclick="return false"><div class="audioBlock" style="background-image: url('+Post.cover_image+');"><div class="whiteMask"><div id="waveform1" class="audioWave" data_song="'+Post.media_url+'" data_id="'+obj+'"></div><div class="audioControls"><button type="button" name="button" class="smaller ion-ios-volume-low" onclick="volume('+obj+', -0.25)"></button><button type="button" name="button" class="smaller ion-ios-volume-high" onclick="volume('+obj+', 0.25)"></button><button type="button" name="button" class="play ion-ios-play" onclick="playOrPauseSong('+obj+')"></button><button type="button" name="button" class="smaller ion-stop" onclick="stopPlay('+obj+')"></button><button type="button" name="button" class="smaller ion-volume-mute" onclick="mute('+obj+')"></button></div></div></div></a>';
                    }
                    if(Post.type == "image"){
                        image = '<a class="media_content" id="'+obj+'" data-post-id="'+obj+'" href="post.html?='+obj+'" ><img style="width:100%; height:350px; background:black;" src="'+Post.media_url+'" /></a>';
                    }
                    text = '<div class="row blog-item-title-wrapper showTop" style="/*border-bottom: 2px solid #F3F3F5; */padding-bottom: 10px;"><div class="blog-item-title col-sm-6"><h1 class=" font-second">'+Post.title+'</h1><span class="post-date">'+date+'</span></div><!-- Text Intro --><div class="col-sm-6 blog-item-body"><p>'+Post.description+'</p></div></div>';
                    comments = '<div id="'+comments+'" class="commentsClass" style="display: none; margin:auto; width: 90%; height: auto;"><div class="comment_section" id = "'+comment_section+'" style="max-height: 300px; overflow:auto"></div><div class="row" id="userinput_comment" style="border-top: 2px solid #F3F3F5;"><object class="col-xs-3" data="'+dp+'"><img id="img" class="col-sm-4" src="images/user.png"></object><div class=" col-sm-9 col-xs-9" id="comment_input"><form class="comment_-form"><textarea id="'+write_comment+'" name ="comment" style="height: 35px; width: 100%; resize: none; outline: none; border: 2px solid #F3F3F5" placeholder="What are your thoughts?"></textarea></form><button id="submit_comment" type="submit" class="btn btn-animated btn-contact ripple-alone submit_comment" data-post-id="'+obj+'" data-user-id="'+Post.user_id+'" data-post-type="'+Post.type+'" data-text="upload" style="width: 100px;"><span class="btn-icon"><span class="loader-parent"><span class="loader3"></span></span></span></button></div></div></div>';
                    html = ' <div data-post-id="'+obj+'" class="blog-item">'+image+icons+text+comments+'</div>';
                    return html;

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
