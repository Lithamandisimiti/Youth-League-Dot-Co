// var node_servre_url = "https://youthleague.co:2048/";
// var server_url = "https://api.youthleague.co/api/";
var server_url = "http://139.59.139.239/ylbackend/api/";
var node_servre_url = "http://139.59.139.239:2048/";

var allWaves=[];
var lastPost=10;
if(getCookie("id") !=="" ){
     window.location.href="mainf.html"
}

var a = window.location.toString();
if (a.indexOf("=")<0) {
  var str="";

}else {
  var str=a.substring(a.indexOf("=")+1);
}


$(document).ready(function(){

  if (str=="login") {
    $('#loginModal').modal('show');
  }

  if (window.location.href.toLowerCase().indexOf("about")<0) {
    var win = $(window);
    win.scroll(function() {
        // End of the document reached?
            if ($(document).height() - win.height() == win.scrollTop()) {
                lastPost = loadPosts(lastPost);
            }
    });
  }
//Temp user
    $('#btn-temp-user').click(function(e){
        e.preventDefault();

        $.ajax({
      url: server_url + "login.php",
      data: {
            //post data
            "email_username": "tj@gmail.com",
            "password": "123456"
        },
      type:"POST",

      success:function(response){
        

          if (response != "[]") {
             response = JSON.parse(response);
            setCookie("id", response[0].id, 365);
            setCookie("user", response[0].username, 365);
            setCookie("dp", response[0].image, 365);
            window.location.href = "mainf.html";
            return;
          }
         error.innerHTML = "Incorrect password/email";
         error.style.display = "block";
         document.getElementById('password').value = "";
      },
      error: function(e){
          console.log(e);
         alert('request failed');
      }
    });
    });

//Terms
    $('input:checkbox').change(
        function(){
            if ($(this).is(':checked')) {
                $('#btn-submit1').prop('disabled', false);
            }
            else{
                $('#btn-submit1').prop('disabled', true);
            }
    });
});

if (window.location.href.toLowerCase().indexOf("about")<0) {
    $(function() {
    //   $(".index-post-area").addClass("ylhomeloader");
      $(".index-post-area").html("");
      $.post(server_url+"get-hot-posts.php", {
              //post data to the server
              "id": "-1",
              "from": "0",
              "limit": lastPost
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


                            //$(".index-post-area").removeClass("ylhomeloader");
                            $(".index-post-area").html(postCont);
                                 afterglow.init();
                                 // alert($('.audioWave').length)
                                 //allWaves=[]
                                  $('.audioWave').each(function(i, obj) {
                                  	if($(this).find("wave").length<1){

                                      var wavesurfer = WaveSurfer.create({
                                          container: obj,
                                          waveColor: 'rgba(0,0,0,.6)',
                                          progressColor: 'black'
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


    function loadPosts(start){
        $(".more-posts").addClass("ylloader");
        $.post(server_url+"get-hot-posts.php", {
                //post data to the server
                "id": "-1",
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
                    $(".index-post-area").append(postCont);
                         afterglow.init();
                         // alert($('.audioWave').length)
                         //allWaves=[];
                          $('.audioWave').each(function(i, obj) {
                                  	if($(this).find("wave").length<1){
                                      var wavesurfer = WaveSurfer.create({
                                          container: obj,
                                          waveColor: 'rgba(0,0,0,.6)',
                                          progressColor: 'black'
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
                        icons = '<div class="blog-item-detail row"><div class="col-sm-9"><a href="view_profile.html?='+Post.username+'"><i class="fa fa-user"></i>'+Post.username+'</a>'+cats+'<a href="#" onclick="return false" id="comments_icon" class="comments_iconClass" data-post-id="'+obj+'"><i class="fa fa-comment"></i> comments</a><a href="#" class= "starClass" id="'+star_id1+'" data-post-id="'+obj+'" onclick="return false" style="display:none"><i class="ion-ios-star-outline"  style="font-size: 17px;"></i></a><a class= "starClass" href="#" id="'+star_id2+'" data-post-id="'+obj+'" onclick="return false"><i class="ion-ios-star"  style="font-size: 17px;"></i>'+Post.likes+'</a></div><div class="col-sm-3 text-right padding-top-xs-15"><a href="post.html?='+obj+'" class="btn-blog-more animsition-link"><span>view post</span><i class="btn-icon fa fa-long-arrow-right"></i></a></div></div>';
                    }else{
                        icons = '<div class="blog-item-detail row"><div class="col-sm-9"><a href="view_profile.html?='+Post.username+'"><i class="fa fa-user"></i>'+Post.username+'</a>'+cats+'<a href="#" onclick="return false" id="comments_icon" class="comments_iconClass" data-post-id="'+obj+'"><i class="fa fa-comment"></i> comments</a><a href="#" class= "starClass" id="'+star_id1+'" data-post-id="'+obj+'" onclick="return false"><i class="ion-ios-star-outline"  style="font-size: 17px;"></i>'+Post.likes+'</a><a class= "starClass" href="#" id="'+star_id2+'" data-post-id="'+obj+'" onclick="return false" style="display: none;"><i class="ion-ios-star"  style="font-size: 17px;"></i></a></div><div class="col-sm-3 text-right padding-top-xs-15"><a href="post.html?='+obj+'" class="btn-blog-more animsition-link"><span>view post</span><i class="btn-icon fa fa-long-arrow-right"></i></a></div></div>';
                    }
                        if(Post.type == "video"){
                            image = '<a id="'+obj+'" data-post-id="'+obj+'" href="#" onclick="return false"><div class="videoBlock"><video data-skin="light" id="myvideo" class="afterglow" id="myvideo" height="350"><source type="video/mp4" src="'+Post.media_url+'" /><source type="video/webm" src="'+Post.media_url+'" /><source type="video/ogg" src="'+Post.media_url+'" /></video></div></a>';
                        }
                        if(Post.type == "audio"){
                            image = '<a id="'+obj+'" data-post-id="'+obj+'" href="#" onclick="return false"><div class="audioBlock" style="background-image: url('+Post.cover_image+');"><div class="whiteMask"><div id="waveform1" class="audioWave" data_song="'+Post.media_url+'" data_id="'+obj+'"></div><div class="audioControls"><button type="button" name="button" class="smaller ion-ios-volume-low" onclick="volume('+obj+', -0.25)"></button><button type="button" name="button" class="smaller ion-ios-volume-high" onclick="volume('+obj+', 0.25)"></button><button type="button" name="button" class="play ion-ios-play" onclick="playOrPauseSong('+obj+')"></button><button type="button" name="button" class="smaller ion-stop" onclick="stopPlay('+obj+')"></button><button type="button" name="button" class="smaller ion-volume-mute" onclick="mute('+obj+')"></button></div></div></div></a>';
                        }
                        if(Post.type == "image"){
                            image = '<a class="media_content" id="'+obj+'" data-post-id="'+obj+'" href="post.html?='+obj+'" onclick="return false"><img style="width:100%; height:350px; background:black;" src="'+Post.media_url+'" /></a>';
                        }
                        text = '<div class="row blog-item-title-wrapper" style="/*border-bottom: 2px solid #F3F3F5; */padding-bottom: 10px;"><div class="blog-item-title col-sm-6"><h1 class=" font-second">'+Post.title+'</h1><span class="post-date">'+date+'</span></div><!-- Text Intro --><div class="col-sm-6 blog-item-body"><p>'+Post.description+'</p></div></div>';
                        comments = '<div id="'+comments+'" class="commentsClass" style="display: none; margin:auto; width: 90%; height: auto;"><div id = "'+comment_section+'" style="min-height: 50px;"></div><div class="row" id="userinput_comment" style="border-top: 2px solid #F3F3F5;"><object data=""><img id="img" class="col-sm-4" src="images/user.png"></object><div class=" col-sm-9" id="comment_input"><form class="comment_-form"><textarea id="'+write_comment+'" name ="comment" style="height: 35px; width: 35vw; resize: none; outline: none; border: 2px solid #F3F3F5" placeholder="What are your thoughts?"></textarea></form><button id="submit_comment" type="submit" class="btn btn-animated btn-contact ripple-alone submit_comment" data-text="upload" style="width: 100px;"><span class="btn-icon"><span class="loader-parent"><span class="loader3"></span></span></span></button></div></div></div>';
                        html = ' <div data-post-id="'+obj+'" class="blog-item">'+image+icons+text+comments+'</div>';
                        return html;

    }


}


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
        window.location.href="mainf.html"
    } else {
        window.location.href="index.html"
    }
}

function ValidateMail(){
    var x= document.getElementById("Semail").value;
    var atpos =x.indexOf("@");
    var dotpos = x.lastIndexOf(".");
    if(atpos<1 || dotpos<atpos+2 || dotpos+2>=x.length){
      return false;
    }
    return true;
}

function ValidatePass(){
  var pass1 = document.getElementById("pass").value;
  var pass2 = document.getElementById("conpass").value;
  if(pass1!=pass2 || pass1=="" || pass1 == null){
      return false
  }
  return true;
}

function ValidateInputS(){
  var isValid = true;
  var Fname = document.getElementById("name").value;
  var Lname = document.getElementById("lastname").value;
  var Username = document.getElementById("username").value;
  var dob = document.getElementById("dob").value;
  var location = document.getElementById("country").value;
  var email = document.getElementById("Semail").value;
  var pass = document.getElementById("pass").value;
  if(Fname == ""||Lname==""||Username==""||dob==""||location==""||email==""||pass==""){
    isValid = false;
  }

    return isValid;
}

function ValidateInputL(){
  var isValid = true;
  var email = document.getElementById('email').value;
  var pass = document.getElementById('password').value;
  if(email==="" || pass ===""){
        isValid = false;
   }
   return isValid;
}

$(function(){
  var form = $('form.login-form');
  var error = document.getElementById('error');
  $("button#btn-submit").click(function (e){
     e.preventDefault();
    var validateInput = ValidateInputL();
    var validateMail = ValidateMail();
     if(validateInput == false){
      error.innerHTML = "Please fill in your credentials";
      error.show(250).delay(3000).fadeOut();;
      return;
    }
    /*if(validateMail == false){
      console.log("Mail not valid");
      error.innerHTML = "Please fill in valid email";
      error.style.display = "block";
      return;
    }*/
    console.log('logging in');
    var formData = $(form).serialize();

    $.ajax({
      url:server_url + "login.php",
      data: formData,
      type:"POST",

      success:function(res){
        
          let response = JSON.parse(res);

          if (response != "[]") {
            console.log(response[0].id)
            setCookie("id", response[0].id, 365);
            setCookie("user", response[0].username, 365);
            setCookie("dp", response[0].image, 365);
            window.location.href = "mainf.html";
            return;
          }
         error.innerHTML = "Incorrect password/email";
         error.style.display = "block";
         document.getElementById('password').value = "";
      },
      error: function(e){
          console.log(e);
         alert('request failed');
      }
    });
  });

});

$(function(){
  var form = $('form.signup-form');
  var error2 = document.getElementById('error2');
  $('button#btn-submit1').click(function(e){
    e.preventDefault();
    let $btn_submit = $(this)
    $btn_submit.addClass("btn-loading");
    var validateInput = ValidateInputS();
    var validateMail = ValidateMail();
    var validatePass = ValidatePass();
    if(validateInput == false){
      error2.innerHTML = "Please fill in your credentials";
      error2.style.display = "block";
      return;
    }
 /* if(validateMail == false){
    console.log("Mail not valid");
    error2.innerHTML = "Please fill in valid email";
    error2.style.display = "block";
    return;
  }*/
  if(validatePass == false){
    error2.innerHTML = "Password do not match";
    error2.show(250).delay(3000).fadeOut();
    return;
  }

    var data = {
      formData : $(form).serialize(),
      username : document.getElementById("username").value,
      email : document.getElementById("Semail").value
    }
    var sendData={
            method:'POST',
            headers:new Headers({
                'Content-Type':'application/x-www-form-urlencoded'
            }),
            body:$.param(data)
        };
    fetch(server_url + "validate.php",sendData)
    .then(function(response){
      return response.json();
    })
    .then(function(response){
      if(response.status === "success" && response.msg === "Proceed with account creation"){
        validate_email(data,$btn_submit);
      }else{
        $('#error2').text(response.msg);
        $("#error2").show(250).delay(3000).fadeOut();
        $btn_submit.removeClass('btn-loading')
      }
    })
  });
});

function send_email(user_id, email,$btn_submit) {
        var sendData={
            method:'POST',
            headers:new Headers({
                'Content-Type':'application/x-www-form-urlencoded'
            }),
            body:$.param({
                id : user_id,
                mailType: "email_valid",
                email: email,
            })

        };
        fetch(node_servre_url + "api/mailer/sendMail",sendData)
            .then((res)=> {
                return res.json()})
            .then(function(response){
                    //make use of response
                    var data = response;

                    if(data.status === "success"){
                        $btn_submit.removeClass('btn-loading')
                        setCookie("dGsHsja", data.securityCode, 1);
                        setCookie("id", data.id, 365);
                        setCookie("user", data.username, 365);
                        setCookie("dp", data.image, 365);
                        window.location.href = "mail_validation.html";
                    }
                    else{
                        //console.log(responce);
                        $btn_submit.removeClass('btn-loading')
                    }
                })
            .catch(function(error) {
                console.log("error",error)
                $btn_submit.removeClass('btn-loading')
            });
    /*$.ajax({
        url: node_servre_url + "mail",
        data: {
            id : user_id,
            mailType: "validate_email"
        },
        cache: false,
        method: "post",
        success: function(response) {
            //make use of responce
            var data = response.data;
            if(data.status === "success"){
                console.log(data.msg);
                window.location.href = "mail_validation.html";
            }
            else {
                console.log(data.msg);
                //console.log(responce);
            }
        },
        error: function(xmr,error){
            console.log(xmr);
            console.log(error);
        }
    });*/
}

function validate_email(userData,$btn_submit) {
        var sendData={
            method:'POST',
            headers:new Headers({
                'Content-Type':'application/x-www-form-urlencoded'
            }),
            body:$.param({
                username : userData.username,
                mailType: "validate_email",
                email: userData.email,
            })

        };
        fetch(node_servre_url + "api/mailer/sendMail",sendData)
            .then((res)=> {
               
                return res.json()})
            .then(function(response){
                    //make use of response
                   
                    var data = response;
                    if(data.status === "success"){
                        $.ajax({
                            url: server_url + "register.php",
                            data: userData.formData,
                            type: "POST",
                            success: function(response){
                              //console.log('response ready');
                             
                              var data = JSON.parse(response);
                              
                              if (response != "[]") {

                                  if(data.status){
                                      
                                      if(data.status == "error") {
                                          $("#error2").text(data.msg);
                                          $("#error2").show(250).delay(3000).fadeOut();
                                      }
                                  }
                                  else if(data[0].status){
                                      if(data[0].status == "success"){ 
                                          send_email(data[0].id, userData.email,$btn_submit)
                                      }
                                      else {
                                          $('#error2').text(data[0].msg);
                                          $("#error2").show(250).delay(3000).fadeOut();;
                                          $btn_submit.removeClass('btn-loading')
                                      }
                                  }
                                  

                                  /*setCookie("id", response[0].id, 365);
                                  setCookie("user", response[0].username, 365);
                                  setCookie("dp", response[0].image, 365);*/
                                  
                                  //window.location.href = "mainf.html";
                                  return;
                              }
                              error2.innerHTML = "Something went wrong";
                              error2.style.display = "block";
                              $btn_submit.removeClass('btn-loading')
                            },
                            error: function(xmr,error){
                              console.log(xmr);
                              console.log(error);
                              $btn_submit.removeClass('btn-loading')
                            }
                          });
                    }
                    else{
                       
                        //console.log(responce);
                        $btn_submit.removeClass('btn-loading');
                        error2.innerHTML = "Your email if not valid";
                        error2.style.display = "block";
                    }
                })
            .catch(function(error) {
                console.log("error",error)
                $btn_submit.removeClass('btn-loading')
            });
}
