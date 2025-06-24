// var server_url = "https://api.youthleague.co/api/";
var server_url = "http://139.59.139.239/ylbackend/api/";

var allWaves = [];
var pushes = [];
var user_id=2;
var lastPost=10;
var logged_id=getCookie("id");
var dp=getCookie("dp");

//Gallery variables
var imgIndex = 0;
var imagePagination = 8;

//Project variables
var projIndex = 0;
var projPagination = 8;

var a = window.location.toString();
if(a.indexOf("=")<0){
   window.open("mainf.html","_self");
}
var user_username=a.substring(a.indexOf("=")+1);
if(user_username.indexOf("%20")>0){
    user_username= user_username.substring(0, user_username.indexOf("%20")) + 
           " " + 
           user_username.substring(user_username.indexOf("%20")+3, user_username.length);
}
//alert(user_username);
if(user_username==getCookie("user")){
   window.open("profile.html","_self");
}

$(function(){
     //redirect of user not logged in
    if(logged_id==null || logged_id==""){
        window.open("index.html?=login","_self");
    }


    //Get about and check if following
    $(".user-profile-body .btn-follow-container").css("display","none");
    $(".user-profile-body #page .table .table-cell .artistimg").addClass("ylloader");
    $(".user-profile-body #page .table .table-cell .ylloader").css({"width":"200px","height":"200px"});
    $(".user-profile-body #Timeline .posts-area").html("");
    $(".user-profile-body #Timeline .posts-area").addClass("ylhomeloader");
        $(".more-posts").css("display","none");

    $.ajax({
        url: server_url + "user-data.php",
        data: {
          "id": logged_id,
          "username": user_username
        },
        cache: false,
        method: "post",
        async:false,
        success: function(response){
            var  user=JSON.parse(response)[0];
            //alert(user.username);

            if(user!=null){

                // alert(user.following);
                user_id=user.id;
                $(".btn-follow").data("user-id",user_id);
                if(user.following=="true"){
                    $(".btn-follow").attr("data-text","Unfollow");
                }else{
                    $(".btn-follow").attr("data-text","Follow");
                }
                $(".interested-work-button").data("user-id",user_id);
                // alert(user.interested_to_work)
                if(user.interested_to_work!="true"){
                    $(".interested-work-button").attr("data-status","uninterested");
                    $(".interested-work-button").addClass("ion-ios-star-outline");
                }else{
                    $(".interested-work-button").attr("data-status","interested");
                    $(".interested-work-button").addClass("ion-ios-star");
                }
                $(".user-profile-body #page .table .table-cell .artistimg").removeClass("ylloader");

                //Basic
                if(user.bio){
                    $(".user-profile-body .bio-text").html(user.bio);
                }else{
                    $("#bio-container").css("display","none");
                }

                if (user.username) {
                    $(".user-profile-body #Basic #user-username").html(user.username);
                }else{
                    $(".username-container").css("display","none");
                }

                if (user.firstname) {
                    $(".user-profile-body #Basic #user-firstname").html(user.firstname);
                }else{
                    $(".firstname-container").css("display","none");
                }

                if (user.lastname) {
                    $(".user-profile-body #Basic #user-lastname").html(user.lastname);
                } else {
                    $(".lastname-container").css("display","none");
                }

                if (user.email) {
                    $(".user-profile-body #Basic #user-email").html(user.email);
                } else {
                    $(".email-container").css("display","none");
                }

                if (user.location) {
                    $(".user-profile-body .user-location").html(user.location);
                } else {
                    $(".residence-container").css("display","none");
                }

                if (user.dob) {
                    $(".user-profile-body #Basic #user-dob").html(user.dob);
                } else {
                    $(".dob-container").css("display","none");
                }

                if (user.gender) {
                    $(".user-profile-body #Basic #user-gender").html(user.gender);
                } else {
                    $(".gender-container").css("display","none");
                }

                if (user.website) {
                    $(".user-profile-body #Basic .user-website").html(user.website);
                    $(".user-profile-body #Basic .user-website").attr("href",user.website);
                } else {
                    $(".website-container").css("display","none");
                }

                //Banner
                $(".user-profile-body #page .table .table-cell .about-quote .at").html("@"+user.username);
                $(".user-profile-body #page .table .table-cell .user-name").html(user.firstname+" "+user.lastname+"<span>.</span>");
                $(".user-profile-body #page .table .table-cell .artistimg img").attr("src",user.image);

                //Work
                if (user.work_organization) {
                    $(".user-profile-body #Work #work-organisation").html(user.work_organization);
                } else {
                    $(".org-container").css("display","none");
                }

                if (user.work_position) {
                    $(".user-profile-body #Work #work-position").html(user.work_position);
                } else {
                    $(".pos-container").css("display","none");
                }

                if (user.work_location) {
                    $(".user-profile-body #Work #work-location").html(user.work_location);
                } else {
                    $(".loc-container").css("display","none");
                }

                if (user.work_description) {
                    $(".user-profile-body #Work #work-description").html(user.work_description);
                } else {
                    $(".desc-container").css("display","none");
                }
                
                if(!user.work_organization && !user.work_position && !user.work_location && !user.work_description){
                    $("#Work").css("display","none");
                    $(".affix-work").css("display","none");
                    
                }


                $(".user-profile-body .btn-follow-container").css("display","block");

            }
        }
    });


    $.post(server_url + "get-user-skills.php",{
            "id":user_id

        },
        function(response) {
            // alert("response: "+response)

                if(response!="[]" && response!=null){

                    let res=JSON.parse(response);
                    let len=res.length;
                    let postCont="";

                    for (var i = 0; i < len; i++) {
                        postCont+='<div class="skill col-lg-3 col-md-4 col-sm-6 col-xs-6">';
                        postCont+=    '<img src="'+res[i].skill_image+'"/>';
                        postCont+=    '<p>'+res[i].skill_set_name+'</p>';
                        postCont+='</div>';
                    }



                    $(".user-profile-body .skills-cont").removeClass("ylloader");
                    $(".user-profile-body .skills-cont").html(postCont);
                }else if(response=="[]"){


                    $(".user-profile-body .skills-cont").removeClass("ylloader");
                    $(".user-profile-body .skills-cont").html("");

                    $(".user-profile-body #Skills").css("display","none");
                    $(".affix-skill").css("display","none");
                }


        }
    );

    $.post(server_url + "get-user-categories.php",{
            "id":user_id

        },
        function(response) {

                if(response!="[]" && response!=null){

                    let res=JSON.parse(response);
                    let len=res.length;
                    let postCont="";

                    for (var i = 0; i < len; i++) {
                        postCont+='<div class="skill col-lg-3 col-md-4 col-sm-6 col-xs-6">';
                        postCont+=    '<img src="'+res[i].image+'"/>';
                        postCont+=    '<p>'+res[i].name+'</p>';
                        postCont+='</div>';
                    }



                    $(".user-profile-body .categories-cont").removeClass("ylloader");
                    $(".user-profile-body .categories-cont").html(postCont);
                }else if(response=="[]"){


                    $(".user-profile-body .categories-cont").removeClass("ylloader");
                    $(".user-profile-body .categories-cont").html("");

                    $(".user-profile-body #Categories").css("display","none");
                
                    $(".affix-categories").css("display","none");
                }


        }
    );
    //Get posts

    $.post(server_url + "get-user-posts.php", {
            "id": logged_id,
            "username":user_username,
            "from":"0",
            "limit":lastPost
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
                                



                    if(posts[i].status=="blog"){

                        //alert(dt.getHours());
                        postCont+=myBlogComponent(posts[i].post_id,posts[i].description,date);

                    }else if(posts[i].status=="post"){
                        postCont+=postComponent(posts[i],date);
                    }

                }


                $(".user-profile-body #Timeline .posts-area").removeClass("ylhomeloader");
                $(".user-profile-body #Timeline .posts-area").html(postCont);
                    
                    try{
                     afterglow.init();
                    }catch(e){
                        console.log(e);
                    }
                     // alert($('.audioWave').length)
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
                          })
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


    $(".user-profile-body .yl-heading-tabs #tab-followers").on("click",function (argument) {
        $(".user-profile-body .followers-container").html("");
        $(".user-profile-body .followers-container").addClass("ylloader");
        $("footer").css("display","block");
        $(".more-posts").css("display","none");

        $.post(server_url + "get-followers.php", {
                "id": user_id
            },
            function(response){
                //alert("response: "+response);
                if(response!="[]" && response!=null){
                    let follows=JSON.parse(response);
                    let len=follows.length;
                    let folCont='';

                    for (var i = 0; i < len; i++) {
                        // folCont+=follow_component(1,"Richard Serra","images/user.jpg");

                        
                            folCont+=follow_component(follows[i].username,follows[i].image);


                    }
                    $(".user-profile-body .followers-container").removeClass("ylloader");
                    $(".user-profile-body .followers-container").html(folCont);

                }else if(response=="[]"){
                    $(".user-profile-body .followers-container").removeClass("ylloader");
                    $(".user-profile-body .followers-container").html("<p>No followers</p>");
                }
                //make use of the response here
            }
        );
    });

    $(".user-profile-body .yl-heading-tabs #tab-following").on("click",function (argument) {
        $(".user-profile-body .following-container").html("");
        $(".user-profile-body .following-container").addClass("ylloader");
        $("footer").css("display","block");
        $(".more-posts").css("display","none");

        $.post(server_url + "get-following.php", {
                "id": user_id
            },
            function(response){
                //alert("response: "+response);
                if(response!="[]" && response!=null){
                    let follows=JSON.parse(response);
                    let len=follows.length;
                    let folCont='';

                    for (var i = 0; i < len; i++) {
                        // folCont+=follow_component(1,"Richard Serra","images/user.jpg");

                            folCont+=follow_component(follows[i].username,follows[i].image);

                        

                    }
                    $(".user-profile-body .following-container").removeClass("ylloader");
                    $(".user-profile-body .following-container").html(folCont);

                }else if(response=="[]"){
                    $(".user-profile-body .following-container").removeClass("ylloader");
                    $(".user-profile-body .following-container").html("<p>Not following</p>");
                }
                //make use of the response here
            }
        );
    });

    $(".user-profile-body .yl-heading-tabs #tab-timeline").on("click",function (argument) {
        // body...
        $(".user-profile-body #Timeline .posts-area").html("");
        $(".user-profile-body #Timeline .posts-area").addClass("ylhomeloader");
        $("footer").css("display","none");
        $(".more-posts").css("display","block");
        // $(".user-profile-body #Timeline .ylloader").css({"width":"50px","height":"60px","margin-left":"30%"});
        //$(".user-profile-body #Timeline .ylloader").css({"width":"200px","height":"200px"});
        $.post(server_url + "get-user-posts.php", {
                "id": user_id,
                "username":user_username,
                "from":"0",
                "limit":lastPost
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
                              
                        if(posts[i].status=="blog"){
                            postCont+=myBlogComponent(posts[i].post_id,posts[i].description,date);

                        }else if(posts[i].status=="post"){
                            postCont+=postComponent(posts[i],date);
                        }

                    }


                    $(".user-profile-body #Timeline .posts-area").removeClass("ylhomeloader");
                    $(".user-profile-body #Timeline .posts-area").html(postCont);

                    try{
                     afterglow.init();
                    }catch(e){
                        console.log(e);
                    }
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
                          })
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
    $(".user-profile-body .yl-heading-tabs #tab-profile").on("click",function (argument) {
        $("footer").css("display","block");
        $(".more-posts").css("display","none");
    });

    /*$(".user-profile-body .btn-follow").on("click",function(argument) {
        let status=$(this).attr("data-text");
        let self=this;
        // alert(status)
        if(status=="Follow"){
            $.post(server_url + "follow.php", {
                    "id": logged_id,
                    "follow_id":user_id
                },
                function(response){
                    //make use of the response here
                    if(response=="true"){
                        $(self).attr("data-text","Unfollow");

                    }

                }
            );
        }else if(status=="Unfollow"){
            $.post(server_url + "unfollow.php", {
                    "id": logged_id,
                    "follow_id":user_id
                },
                function(response){
                    //make use of the response here
                    if(response=="true"){
                        $(self).attr("data-text","Follow");

                    }

                }
            );
        }
    })
*/

//Get User Num Following
    $.ajax({
    	url: server_url + "count-following.php",
    	data: {
    		//post data to the server
    		"id": user_id
    	},
    	cache: false,
    	method: "post",
    	success: function(response){
    		//make use of the response
    		var numFollowing = JSON.parse(response);
    		$('.num-following').text(numFollowing[0].following);
    	}
    });
//Get User Num Followers
    $.ajax({
    	url: server_url + "count-followers.php",
    	data: {
    		//post data to the server
    		"id": user_id
    	},
    	cache: false,
    	method: "post",
    	success: function(response){
    		//make use of the response
    		var numFollowers = JSON.parse(response);
    		$('.num-followers').text(numFollowers[0].followers);
    	}
    });

//Gallary:Images
	//Get images
	$(document).on('click','#gallary', function(){
		//console.log('load Gallary');
		$('#images .img-items').empty();
		//console.log('init indicator ' + imgIndex);
		getImages(0);
		//console.log('Gallary loaded successfully');
	});

	//View Selected image
	var images;
	$(document).on('click', '#images .gallary-img', function(){
		$('.item').removeClass('active');
		$('.carousel-indicators > li').removeClass('active');

		var imageNum = parseInt($(this).find('img').attr('data-img-index'));
		console.log('Selected image ' + imageNum);
		//alert(imageNum);
		images = $('#images .gallary-img img');
		addToCorousal(images);

		$('.item:nth-child('+ (imageNum) +')').addClass('active');
  		$('.carousel-indicators > li:nth-child('+ (imageNum) +')').addClass('active');
		$('#myCarousel').carousel();
	});
//Projects
    //Get user Projects
    $('#projects').click(function(){
        getVisitorProjects(0);
    })
    //View Project
	$(document).on('click', '.project-item img', function(e){
	    e.preventDefault();
	    $('#timeline').empty();
	    var project_id = $(this).parents(".project-item").attr("data-project-id");
	    var project_status = $(this).parents(".project-item").attr("data-project-status");
	    var projcet_title = $(this).parents(".project-item").find(".blog-item-title h1").text();
	    $('#viewProjectModal').attr("data-project-id", project_id)
	    $('#viewProjectModal .modal-title').text(projcet_title);
	    
	    var controls = "";
	    $('#viewProjectModal .project-controls').empty();
	    if(project_status == "complete"){
	        $('#viewProjectModal .project-status').addClass('completed');
	        controls = '<button id="btn-reopen-project" class="btn btn-animated btn-contact ripple-alone btn-post-blog" data-text="Reopen Project" data-toggle="modal" data-target="#">Reopen Project</button>';
	    }
	    else{
	        $('#viewProjectModal .project-status').addClass('inprogress');
	        controls = '<button id="Add-project-entry" class="btn btn-animated btn-contact ripple-alone btn-post-blog" data-text="Add Entry" data-toggle="modal" data-target="#">Add Entry</button>'+
                        '<button id="end-project" class="btn btn-animated btn-contact ripple-alone btn-post-blog" data-text="End Project" data-toggle="modal" data-target="#">End Project</button>';
            $('#viewProjectModal .project-controls').append(controls);
	    }
	    
	    $('#viewProjectModal .project-status h4').text(project_status);
	    
		$('#viewProjectModal').modal('show');
		var img = $(this).attr('src');
		
		$('#viewProjectModal .modal-project-cover img').attr('src', img);
		getProjectEntries(project_id);
	});
});

$(document).ready(function(){
    //AFFIX
    $(function() {
      var h1Height = $("#nav").height(); // get height of h1 tag
      $('#Profile .aboutLinks a').click(function (e) {
          e.preventDefault();
          var target = $(this.hash);
          $('html, body').animate({
              scrollTop: target.offset().top - h1Height // scroll to h3 minus height of h1
          }, 1000);
          return false;
      });
    });

    $('[data-toggle="tooltip"]').tooltip();
    var win = $(window);
    
    // Each time the user scrolls
    win.scroll(function() {
        // End of the document reached?
        if($("#Timeline.active").length>0){
            if ($(document).height() - win.height() == win.scrollTop()) {
                lastPost = loadPosts(lastPost);
            }
        }
    });


});

function update_basic(f,s,l,d,g) {
   // alert(f+" "+s+" "+l+" "+d+" "+g);
    $(".user-profile-body #Basic #user-firstname").html(f);
    $(".user-profile-body #Basic #user-lastname").html(s);
    $(".user-profile-body .user-location").html(l);
    $(".user-profile-body #Basic #user-dob").html(d);
    $(".user-profile-body #Basic #user-gender").html(g);
    // alert(f+" "+s+" "+l+" "+d+" "+g);

    //Banner
    $(".user-profile-body #page .table .table-cell .user-name").html(f+" "+s+"<span>.</span>");

}

function myBlogComponent(post_id,description,date) {
    var blog='<div data-post-id='+post_id+' class="blog-post-item ">';
        blog+='<p>'+description+'</p>';
        blog+='<div class="blog-item-detail row"><div class="col-sm-9"></div><div class="col-sm-3  padding-top-xs-15"><a href="#" onclick="return false" id="comments_icon" class="comments_iconClass" data-post-id="'+post_id+'"><i class="fa fa-comment"></i> comments </a></div></div>';
        blog+='<div class="row blog-item-title-wrapper"><div class="blog-item-title col-sm-6"><span class="post-date">'+date+'</span></div><div class="col-sm-6"></div></div>';
        blog+= '<div id="comments'+post_id+'" class="commentsClass" style="display: none; margin:auto; width: 90%; height: auto;"><div id = "comment_section'+post_id+'" style="min-height: 50px;"></div><div class="row" id="userinput_comment" style="border-top: 2px solid #F3F3F5;"><object data=""><img id="img" class="col-sm-4" src="images/user.png"></object><div class=" col-sm-9" id="comment_input"><form class="comment_-form"><textarea id="write_comment'+post_id+'" name ="comment" style="height: 35px; width: 35vw; resize: none; outline: none; border: 2px solid #F3F3F5" placeholder="What are your thoughts?"></textarea></form><button id="submit_comment" type="submit" class="btn btn-animated btn-contact ripple-alone submit_comment" data-text="upload" style="width: 100px;"><span class="btn-icon"><span class="loader-parent"><span class="loader3"></span></span></span></button></div></div></div></div>';

    return blog;
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
                        icons = '<div class="blog-item-detail row"><div class="col-sm-9"><a href="view_profile.html?='+Post.username+'"><i class="fa fa-user"></i>'+Post.username+'</a>'+cats+'<a href="#" onclick="return false" id="comments_icon" class="comments_iconClass" data-post-id="'+obj+'"><i class="fa fa-comment"></i> comments</a><a href="#" class= "starClass" id="'+star_id1+'" data-post-id="'+obj+'" data-user-id="'+Post.user_id+'" data-post-type="'+Post.type+'" onclick="return false" style="display:none"><i class="ion-ios-star-outline"  style="font-size: 17px;"></i></a><a class= "starClass" href="#" id="'+star_id2+'" data-post-id="'+obj+'" onclick="return false"><i class="ion-ios-star"  style="font-size: 17px;"></i>'+Post.likes+'</a></div><div class="col-sm-3 text-right padding-top-xs-15"><a href="post.html?='+obj+'" class="btn-blog-more animsition-link"><span>view post</span><i class="btn-icon fa fa-long-arrow-right"></i></a></div></div>';
                    }else{
                        icons = '<div class="blog-item-detail row"><div class="col-sm-9"><a href="view_profile.html?='+Post.username+'"><i class="fa fa-user"></i>'+Post.username+'</a>'+cats+'<a href="#" onclick="return false" id="comments_icon" class="comments_iconClass" data-post-id="'+obj+'"><i class="fa fa-comment"></i> comments</a><a href="#" class= "starClass" id="'+star_id1+'" data-post-id="'+obj+'" data-user-id="'+Post.user_id+'" data-post-type="'+Post.type+'" onclick="return false"><i class="ion-ios-star-outline"  style="font-size: 17px;"></i>'+Post.likes+'</a><a class= "starClass" href="#" id="'+star_id2+'" data-post-id="'+obj+'" onclick="return false" style="display: none;"><i class="ion-ios-star"  style="font-size: 17px;"></i></a></div><div class="col-sm-3 text-right padding-top-xs-15"><a href="post.html?='+obj+'" class="btn-blog-more animsition-link"><span>view post</span><i class="btn-icon fa fa-long-arrow-right"></i></a></div></div>';
                    }
                    if(Post.type == "video"){
                        image = '<a id="'+obj+'" data-post-id="'+obj+'" href="#" onclick="return false"><div class="videoBlock"><video data-skin="light" id="myvideo" class="afterglow" id="myvideo" height="350"><source type="video/mp4" src="'+Post.media_url+'" /><source type="video/webm" src="'+Post.media_url+'" /><source type="video/ogg" src="'+Post.media_url+'" /></video></div></a>';
                    }
                    if(Post.type == "audio"){
                        image = '<a id="'+obj+'" data-post-id="'+obj+'" href="#" onclick="return false"><div class="audioBlock" style="background-image: url('+Post.cover_image+');"><div class="whiteMask"><div id="waveform1" class="audioWave" data_song="'+Post.media_url+'" data_id="'+obj+'"></div><div class="audioControls"><button type="button" name="button" class="smaller ion-ios-volume-low" onclick="volume('+obj+', -0.25)"></button><button type="button" name="button" class="smaller ion-ios-volume-high" onclick="volume('+obj+', 0.25)"></button><button type="button" name="button" class="play ion-ios-play" onclick="playOrPauseSong('+obj+')"></button><button type="button" name="button" class="smaller ion-stop" onclick="stopPlay('+obj+')"></button><button type="button" name="button" class="smaller ion-volume-mute" onclick="mute('+obj+')"></button></div></div></div></a>';
                    }
                    if(Post.type == "image"){
                        image = '<a class="media_content" id="'+obj+'" data-post-id="'+obj+'" href="post.html?='+obj+'" ><img style="width:100%; height:350px; background:black;" src="'+Post.media_url+'" /></a>';
                    }
                    text = '<div class="row blog-item-title-wrapper" style="/*border-bottom: 2px solid #F3F3F5; */padding-bottom: 10px;"><div class="blog-item-title col-sm-6"><h1 class=" font-second">'+Post.title+'</h1><span class="post-date">'+date+'</span></div><!-- Text Intro --><div class="col-sm-6 blog-item-body"><p>'+Post.description+'</p></div></div>';
                    comments = '<div id="'+comments+'" class="commentsClass" style="display: none; margin:auto; width: 90%; height: auto;"><div class="comment_section" id = "'+comment_section+'" style="max-height: 300px; overflow:auto"></div><div class="row" id="userinput_comment" style="border-top: 2px solid #F3F3F5;"><object data="'+dp+'"><img id="img" class="col-sm-4" src="images/user.png"></object><div class=" col-sm-9" id="comment_input"><form class="comment_-form"><textarea id="'+write_comment+'" name ="comment" style="height: 35px; width: 35vw; resize: none; outline: none; border: 2px solid #F3F3F5" placeholder="What are your thoughts?"></textarea></form><button id="submit_comment" type="submit" class="btn btn-animated btn-contact ripple-alone submit_comment" data-post-id="'+obj+'" data-user-id="'+Post.user_id+'" data-post-type="'+Post.type+'" data-text="upload" style="width: 100px;"><span class="btn-icon"><span class="loader-parent"><span class="loader3"></span></span></span></button></div></div></div>';
                    html = ' <div data-post-id="'+obj+'" class="blog-item">'+image+icons+text+comments+'</div>';
                    return html;

}


function follow_component(name,image) {
    // body...
    var div='<div class="user-x col-lg-2 col-md-3 col-sm-3 col-xs-4">';
        div+='<a href="view_profile.html?='+name+'" data-user-name='+name+'><img src="'+image+'">';
        div+='<div>'+name+'</div></a></div>';

    return div;
}


function loadPosts(start){
    $(".user-profile-body .more-posts").addClass("ylloader");
    $.post(server_url + "get-user-posts.php", {
            "id": logged_id,
            "username":user_username,
            "from":start,
            "limit":start+10
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

                    if((dtNow.getTime()-dt.getTime())<(8.64*Math.pow(Math.E,7))){
                        date="Today"
                    }else if((dtNow.getTime()-dt.getTime())<(1.728*Math.pow(Math.E,8))){
                        date="Yesterday,"+dt.getHours()+":"+dt.getMinutes();

                    }else{
                        date=Months[dt.getMonth()]+" "+dt.getDate()+", "+dt.getHours()+":"+dt.getMinutes();
                    }


                    if(posts[i].status=="blog"){

                        //alert(dt.getHours());
                        postCont+=myBlogComponent(posts[i].post_id,posts[i].description,date);

                    }else if(posts[i].status=="post"){
                        postCont+=postComponent(posts[i],date);
                    }

                }

                $(".user-profile-body .more-posts").removeClass("ylloader");
                $(".user-profile-body #Timeline .posts-area").append(postCont);
                 
                    try{
                     afterglow.init();
                    }catch(e){
                        console.log(e);
                    }
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
                          })
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

    return start+10;
}
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function addToCorousal(images){
	$('#myCarousel .carousel-inner').empty();
	$('#myCarousel .carousel-indicators').empty();

	var length = images.length
	//console.log('number of images = ' + length);
	for(var i = 0; i < length; i++)
	{
    //Add image
    	//console.log('image ' + i);
		var imgSrc = $(images[i]).attr('src');
		var imgItem = '<div class="img-Display item">'+
                          '<img src=' + imgSrc +'>'+
                        '</div>';
        $('#myCarousel .media-display').append(imgItem);
        //alert(imgItem);

	//Add indicator
        var indicator = '<li data-target="#myCarousel" data-slide-to="' + i + '"></li>';
        $('#myCarousel .carousel-indicators').append(indicator);
	}
}

function getImages(start){
	var end = start + imagePagination;
	//console.log('curr indicator1 ' + imgIndex);
	$.ajax({
		url: server_url + "get-images.php",
		data: {
			//post data to the server
			"id": user_id,
			"from": start,
			"limit": end
		},
		cache: false,
		method: "post",
		success: function(response){
			//make use of the response
			//console.log(response);
			var ImageList = JSON.parse(response);
			var newIMG = '';
			var len = ImageList.length;
			//console.log(len + ' images');
			for(var i = 0; i < len; i++){
				newIMG += '<div class="img-container col-sm-3">'+
                            '<div class="gallary-img" data-toggle="modal" data-target="#viewMedia">'+
                                '<img data-img-index="' + (start + i + 1) + '" src="' + ImageList[i].media_url +'">'+
                            '</div></div>';
       			//console.log('added img ' + (start + i + 1));
			}
			
			$('#images .img-items').append(newIMG);
		}
	});
	imgIndex = end;
}

function getVisitorProjects(start){
    var end = start + projPagination;
    
	$.ajax({
		url: server_url + "get-completed-projects.php",
		data: {
			//post data to the server
			"id": logged_id,
			"creator_id": user_id
		},
		cache: false,
		method: "post",
		success: function(response){
			//make use of the response
			var myProjects = JSON.parse(response);
			var len = myProjects.length;
			var projItems = '';
			
			for(var i = 0; i < len; i++){
			    var status = "";
			    
			    if(myProjects[i].project_complete == 0){
			        status = "in-progress";
			    }
			    else{
			        status = "complete";
			    }
			    
			    projItems += '<div class="project-item" data-project-id=' + myProjects[i].id + ' data-project-status='+ status +'>'+
                            '<a class="blog-media animsition-link" href="#">'+
                                '<img class="parallax-img img-responsive" src="' + myProjects[i].image + '"  data-center="transform: translate3d(0px, -50%, 0px)" ></a>'+
                            '<div class="row blog-item-title-wrapper">'+
                                '<div class="dropdown">'+
                                    '<button class="dropdown-toggle" type="button" data-toggle="dropdown">'+
                                        '<span class="caret"></span>'+
                                    '</button>'+
                                '</div>'+
                                '<div class="blog-item-title col-sm-6">'+
                                    '<h1 class=" font-second">'+  myProjects[i].title + '</h1>'+
                                    '<span class="post-date">'+ myProjects[i].start.replace("-", "/") + '-' + myProjects[i].end.replace("-", "/") + '</span>'+
                                '</div>'+
                                '<div class="col-sm-6 blog-item-body">'+
                                    '<p>' + myProjects[i].description + '</p></div></div></div>';
			}
			
			$('#Projects .projects').append(projItems);
		}
	});
	projIndex = end;
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