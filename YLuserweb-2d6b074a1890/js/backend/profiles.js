// var server_url = "https://api.youthleague.co/api/";
// var node_server = "https://youthleague.co:2048/";
var server_url = "http://139.59.139.239/ylbackend/api/";
var node_server = "http://139.59.139.239:2048/";


var allWaves = [];
var pushes = [];
var lastPost=4;
var user_id=getCookie("id");
var user_username=getCookie("user");
var dp = getCookie("dp");
//Gallery variables
var imgIndex = 0;
var imagePagination = 8;

//Project variables
var projIndex = 0;
var projPagination = 8;

$(function(){
    /*user_id=3;
    user_username="Thelonius";*/

     //redirect of user not logged in


    //Get about
    $(".user-profile-body #page .table .table-cell .artistimg").addClass("ylloader");
    $(".user-profile-body #page .table .table-cell .ylloader").css({"width":"200px","height":"200px"});

//Get User Data
    $.ajax({
        url: server_url + "user-data.php",
        data: {
          "id": user_id,
          "username": user_username
        },
        cache: false,
        method: "post",
         async:false,
        success: function(response){
            var  user=JSON.parse(response)[0];
            //console.log(response);
            //alert(user.username);

            if(user!==null){
                $(".user-profile-body #page .table .table-cell .artistimg").removeClass("ylloader");

                //Basic
                $(".user-profile-body .bio-text").html(user.bio);
                $(".user-profile-body #Basic #user-username").html(user.username);
                $(".user-profile-body #Basic #user-firstname").html(user.firstname);
                $(".user-profile-body #Basic #user-lastname").html(user.lastname);
                $(".user-profile-body #Basic #user-email").html(user.email);
                $(".user-profile-body .user-location").html(user.location);
                $(".user-profile-body #Basic #user-dob").html(user.dob);
                $(".user-profile-body #Basic #user-gender").html(user.gender);

                $(".user-profile-body #Basic .user-website").html(user.website);
                $(".user-profile-body #Basic .user-website").attr("href","http://"+user.website);

                //Banner
                $(".user-profile-body #page .table .table-cell .about-quote .at").html("@"+user.username);
                $(".user-profile-body #page .table .table-cell .user-name").html(user.firstname+" "+user.lastname+"<span>.</span>");
                $(".user-profile-body #page .table .table-cell .artistimg img").attr("src",user.image);

                //Work
                $(".user-profile-body #Work #work-organisation").html(user.work_organization);
                $(".user-profile-body #Work #work-position").html(user.work_position);
                $(".user-profile-body #Work #work-location").html(user.work_location);
                $(".user-profile-body #Work #work-description").html(user.work_description);

            }
              //  console.log("ajax ready");
        }
    });

//Get User Skills
    var Skills=[];
    var Categories=[];
    $.post(server_url + "get-user-skills.php",{
            "id":user_id
        },
        function(response) {
            // alert("response: "+response)

                if(response!="[]" && response!=null){
                    // alert("response: "+response)

                    let res=JSON.parse(response);
                    let len=res.length;
                    let postCont="";


                    for (var i = 0; i < len; i++) {
                        postCont+='<div class="skill col-lg-4 col-md-4 col-sm-6 col-xs-6">';
                        postCont+=    '<img src="'+res[i].skill_image+'"/>';
                        postCont+=    '<p>'+res[i].skill_set_name+'</p>';
                        postCont+='</div>';
                        var obj={};
                        obj.id=res[i].skill_set_id;
                        obj.skillid=res[i].skill_id;
                        obj.image=res[i].skill_image;
                        obj.name=res[i].skill_set_name;
                        Skills.push(obj);
                    }



                    $(".user-profile-body .skills-cont").removeClass("ylloader");
                    $(".user-profile-body .skills-cont").html(postCont);
                }else if(response=="[]"){

                    $(".user-profile-body .skills-cont").removeClass("ylloader");
                    $(".user-profile-body .skills-cont").html("");
                }

        }
    );

//Get User Categories
    $.post(server_url + "get-user-categories.php",{
            "id":user_id

        },
        function(response) {
                if(response!="[]" && response!=null){

                    let res=JSON.parse(response);
                    let len=res.length;
                    let postCont="";

                    for (var i = 0; i < len; i++) {
                        postCont+='<div data-id="'+res[i].category_id+'" class="skill col-md-4 col-sm-6 col-xs-6">';
                        postCont+=    '<img src="'+res[i].image+'"/>';
                        postCont+=    '<p>'+res[i].name+'</p>';
                        postCont+='</div>';
                        var obj={};
                        obj.id=res[i].category_id;
                        obj.image=res[i].image;
                        obj.name=res[i].name;
                        Categories.push(obj);
                    }



                    $(".user-profile-body .categories-cont").removeClass("ylloader");
                    $(".user-profile-body .categories-cont").html(postCont);
                }else if(response=="[]"){
                    $(".user-profile-body .categories-cont").removeClass("ylloader");
                    $(".user-profile-body .categories-cont").html("");

                    // $(".user-profile-body #Categories").css("display","none");
                }


        }
    );

//Get User Posts
    $(".user-profile-body #Timeline .posts-area").html("");
    $(".user-profile-body #Timeline .posts-area").addClass("ylhomeloader");
    $(".more-posts").css("display","none");

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

                        //alert(dt.getHours());
                        postCont+=myBlogComponent(posts[i].post_id,posts[i].description,date);

                    }else if(posts[i].status=="post"){
                        postCont+=postComponent(posts[i],date);
                    }


                }
                postCont+='<div class="more-posts"></div>';

                $(".user-profile-body #Timeline .posts-area").removeClass("ylhomeloader");
                $(".user-profile-body #Timeline .posts-area").html(postCont);

                    try{
                     afterglow.init();
                    }catch(e){
                        console.log(e);
                    }
                // alert($('.audioWave').length)
                      $('.audioWave').each(function(i, obj) {
                        // alert("YP")
                        if($(this).find("canvas").length<1){

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
                          })
                          allWaves[ $(obj).attr('data_id') ] = wavesurfer;
                        }
                      });


            }
        }
    );


//Create Blog
    $(".user-profile-body #Timeline .btn-post-blog").on("click",function (argument) {
        let blog=$(".user-profile-body .blog-textarea textarea").val();
        if(blog!=""){
            $(this).addClass("btn-loading");
            var self=this;
            $.post(server_url + "create-blog-post.php", {
                    "id": user_id,
                    "title": "",
                    "description": blog,
                    "status": "blog",
                    "type": "",
                    "media_url": "",
                    "cover_image": "",
                    "location": "",
                    "categories": ""
                },
                function(response){
                    //make use of the response here

                    if(response!="false"){
                        //alert("in")

                        let posts=$(".user-profile-body #Timeline .posts-area").html();
                        let postCont=myBlogComponent(response,blog,"Now");

                        $(".user-profile-body .blog-textarea textarea").val("");

                         $(self).removeClass("btn-loading");
                        $(".user-profile-body #Timeline .posts-area").html(postCont+posts);

                    }
                }
            );

        }
    });

    $(".user-profile-body #Profile .btn-edit").on("click",function (argument) {

        if($(this).attr("data-state")=="normal"){

            $(this).attr("data-state","edit").attr("data-text","Save");
            $(this).parent().parent().find("p.editable").attr("contentEditable","true").addClass("edit-profile-content");
            $(this).parent().parent().find("a.editable").attr("contentEditable","true").addClass("edit-profile-content");
            $('#user-gender').hide();
            $(this).parent().parent().find('.user-gender').show();
            /*var genderDrop = '<div class="dropdown gender">'+
                                '<button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">choose...<span class="caret"></span></button>'+
                                '<ul class="dropdown-menu dropdown-menu-right"><li><a href="#">Male</a></li><li><a href="#">Female</a></li></ul>'+
                            '</div>';
            var parent = $('#user-gende').parent();
            $('#user-gende').remove();
            $(parent).append(genderDrop);*/

        }else{
            // $(this).parent().parent().find(".load-div-cont .load-div").addClass("ylaboutloader");
            $(this).addClass("btn-loading");
            switch($(this).parent().parent().attr("id")){
                case "Basic":{
                   let fname=$(".user-profile-body #Basic #user-firstname").html();
                   let sname=$(".user-profile-body #Basic #user-lastname").html();
                   //let gender=$(".user-profile-body #Basic #user-gender").html();
                   let gender=$("#Basic .user-gender").val();
                   let dob=$(".user-profile-body #Basic #user-dob").html();
                   let location=$(".user-profile-body #Basic .user-location").html();
                   let website=$(".user-profile-body #Basic .user-website").html();
                   // alert(website)
                   let self=this;
                   $.post(server_url + "update-user-basic.php", {
                            "id": user_id,
                            "firstname": fname,
                            "lastname": sname,
                            "gender": gender,
                            "dob": dob,
                            "location": location,
                            "website":website
                        },
                        function(response){
                            //alert("response: "+response);
                            if(response=="true"){

                                update_basic(fname,sname,location,dob,gender,website);
                                $(self).attr("data-state","normal").attr("data-text","edit");
                                $(self).parent().parent().find("p.editable").attr("contentEditable","false").removeClass("edit-profile-content");
                                $(self).parent().parent().find("a.editable").attr("contentEditable","false").removeClass("edit-profile-content");
                                $('#user-gender').show();
                                $('#Profile .btn-edit').parent().parent().find('.user-gender').hide();
                                $(self).removeClass("btn-loading");

                            }
                            //make use of the response here
                        }
                    );
                }
                break;
                case "bio-container":{
                   let bio=$(".user-profile-body #bio-container .bio-text").html();
                   let self=this;
                    $.post(server_url + "update-user-bio.php", {
                            "id": user_id,
                            "bio":bio
                        },
                        function(response){
                            if(response=="true"){

                                //update_basic(fname,sname,location,dob,gender);
                                $(".user-profile-body .bio-text").html(bio);
                                $(self).attr("data-state","normal").attr("data-text","edit");
                                $(self).parent().parent().find("p.editable").attr("contentEditable","false").removeClass("edit-profile-content");
                                $(self).removeClass("btn-loading");

                            }
                            //make use of the response here
                        }
                    );

                }
                break;
                case "Work":{
                    let worg=$(".user-profile-body #Work #work-organisation").html();
                    let wpos=$(".user-profile-body #Work #work-position").html();
                    let wloc=$(".user-profile-body #Work #work-location").html();
                    let wdes=$(".user-profile-body #Work #work-description").html();
                   let self=this;
                    $.post(server_url + "update-user-work.php", {
                              "id": user_id,
                              "work_organization": worg,
                              "work_position": wpos,
                              "work_location": wloc,
                              "work_description": wdes
                        },
                        function(response){
                            // alert("response: "+response);
                            if(response=="true"){

                                $(".user-profile-body #Work #work-organisation").html(worg);
                                $(".user-profile-body #Work #work-position").html(wpos);
                                $(".user-profile-body #Work #work-location").html(wloc);
                                $(".user-profile-body #Work #work-description").html(wdes);

                                $(self).attr("data-state","normal").attr("data-text","edit");
                                $(self).parent().parent().find("p.editable").attr("contentEditable","false").removeClass("edit-profile-content");
                                $(self).removeClass("btn-loading");

                            }
                            //make use of the response here
                        }
                    );

                }
                break;
            }


        }

    });
//Ger User Followers
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
                    $(".user-profile-body .followers-container").html("<p>You don't have followers</p>");
                }
                //make use of the response here
            }
        );
    });
//Get User Following
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
                    $(".user-profile-body .following-container").html("<p>You don't have followers</p>");
                }
                //make use of the response here
            }
        );
    });
//Get User Posts
    $(".user-profile-body .yl-heading-tabs #tab-timeline").on("click",function (argument) {
        // body...
        $(".user-profile-body #Timeline .posts-area").html("");
        $(".user-profile-body #Timeline .posts-area").addClass("ylhomeloader");
        $("footer").css("display","none");
        $(".more-posts").css("display","block");

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
                    console.log(response)
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


                        if(posts[i].status=="blog"){
                            postCont+=myBlogComponent(posts[i].post_id,posts[i].description,posts[i].date_time);

                        }else if(posts[i].status=="post"){
                            postCont+=postComponent(posts[i],date);
                        }

                    }

                    postCont+='<div class="more-posts"></div>';

                    $(".user-profile-body #Timeline .posts-area").removeClass("ylhomeloader");
                    $(".user-profile-body #Timeline .posts-area").html(postCont);


                    try{
                     afterglow.init();
                    }catch(e){
                        console.log(e);
                    }
                     // alert($('.blog-item').length)
                      $('.audioWave').each(function(i, obj) {
                        if($(this).find("canvas").length<1){
                        //  alert("hi");

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

    $(".user-profile-body #Categories .btn").on("click",function (argument) {
        // body...
        $(".user-profile-body .categories-modal-cont").html("");
        $(".user-profile-body .categories-modal-cont").addClass("ylloader");
        $(".user-profile-body #categoryModal .modal-body .btn-cont").css("display","none");
        // $(".user-profile-body #Timeline .ylloader").css({"width":"50px","height":"60px","margin-left":"30%"});
        //$(".user-profile-body #Timeline .ylloader").css({"width":"200px","height":"200px"});
        $.post(server_url + "get-categories.php", {
                "id": user_id
            },
            function(response){
                //make use of the response here
                if(response!="[]" && response!=null){

                    let posts=JSON.parse(response);
                    let len=posts.length;
                    let postCont="";

                    for (var i = 0; i < len; i++) {
                            if(Categories.findId(posts[i].category_id)<0){
                                postCont+=  '<div data-id="'+posts[i].category_id+'" class="skill col-lg-4 col-md-4 col-sm-6 col-xs-6">';
                            }else{
                                postCont+=  '<div data-id="'+posts[i].category_id+'" class="skill chosen-skill col-lg-4 col-md-4 col-sm-6 col-xs-6">';
                            }

                            postCont+=     '<img src="'+posts[i].image+'"/>';
                            postCont+=     '<p>'+posts[i].name+'</p>';
                            postCont+= '</div>';
                    }

                    $(".user-profile-body .categories-modal-cont").removeClass("ylloader");
                    $(".user-profile-body .categories-modal-cont").html(postCont);
                    $(".user-profile-body .modal-body .btn-cont").css("display","block");
                    CategoriesTemp=Categories.slice(0,Categories.length);




                }
            }
        );
    });

    $(".user-profile-body #Skills .btn").on("click",function (argument) {
        let skillHead=[];


        $(".user-profile-body .skills-modal-cont").html("");
        $(".user-profile-body .skills-modal-cont").addClass("ylloader");
        $(".user-profile-body #skillsModal .modal-body .btn-cont").css("display","none");
        // $(".user-profile-body #Timeline .ylloader").css({"width":"50px","height":"60px","margin-left":"30%"});
        //$(".user-profile-body #Timeline .ylloader").css({"width":"200px","height":"200px"});
        $.post(server_url + "get-skills.php", {
                "id": user_id
            },
            function(response){
                //make use of the response here
                if(response!="[]" && response!=null){

                    let res=JSON.parse(response);
                    let len=res.length;
                    let postCont="";
                    let skillHead=[];
                    let skillSet=[];


                    for (var i = 0; i < len; i++) {
                        var head=res[i].skill_name;
                        var pos=skillHead.indexOf(head);
                        var object={};
                        object.id=res[i].skill_set_id;
                        object.skillid=res[i].skill_id;
                        object.name=res[i].skill_set_name;
                        object.image=res[i].skill_image;
                        if(pos<0){
                            skillHead.push(head);
                            pos=skillHead.indexOf(head);
                            //alert("Pos: "+pos)
                        }
                            if(!skillSet[pos]){
                                skillSet[pos]=new Array();
                            }
                            skillSet[pos].push(object);



                    }

                    let lenH=skillHead.length;
                    for (var i = 0; i < lenH; i++) {
                        let lenS=skillSet[i].length;
                        postCont+='<div class="row skills-modal-cont"><h3>'+skillHead[i]+'</h3>';
                        for (var j = 0;j < lenS; j++) {

                                if(Skills.findId(skillSet[i][j].id)<0){
                                    postCont+=  '<div data-id="'+skillSet[i][j].id+'" data-skill-id="'+skillSet[i][j].skillid+'" class="skill col-lg-4 col-md-4 col-sm-6 col-xs-6">';
                                }else{
                                    postCont+=  '<div data-id="'+skillSet[i][j].id+'" data-skill-id="'+skillSet[i][j].skillid+'" class="skill chosen-skill col-lg-4 col-md-4 col-sm-6 col-xs-6">';

                                }
                                postCont+=     '<img src="'+skillSet[i][j].image+'"/>';
                                postCont+=     '<p>'+skillSet[i][j].name+'</p>';
                                postCont+= '</div>';

                        }
                        postCont+='</div>';

                    }


                    $(".user-profile-body .skills-modal-cont").removeClass("ylloader");
                    $(".user-profile-body .skills-modal-cont").html(postCont);
                    $(".user-profile-body .modal-body .btn-cont").css("display","block");
                    SkillsTemp=Skills.slice(0, Skills.length);



                }
            }
        );
    });

    //Skills&Categories ICONS and ASSIGNING
    var SkillsTemp=[];
    var CategoriesTemp=[];
    Array.prototype.findObj = function(obj) {
        var index=-1;
        for (var i = 0; i < this.length; i++) {
            if (obj.id==this[i].id) {
                index=i;
                break;
            }

        }

        return index;
    }
    Array.prototype.findId = function(obj) {
        var index=-1;
        for (var i = 0; i < this.length; i++) {
            if (obj==this[i].id) {
                index=i;
                break;
            }

        }

        return index;
    }
    $(document).on("click",".skills-modal-cont .skill",function (argument) {
        // body...

        var obj={};
            obj.id=$(this).attr("data-id");
            obj.skillid=$(this).attr("data-skill-id");
            obj.image=$(this).find("img").attr("src");
            obj.name=$(this).find("p").html();
        if(SkillsTemp.findObj(obj)<0){
            SkillsTemp.push(obj);
            $(this).addClass("chosen-skill");
        }else{
            SkillsTemp.splice(SkillsTemp.findObj(obj), 1);
            $(this).removeClass("chosen-skill");
        }
    });
    $(document).on("click",".categories-modal-cont .skill",function (argument) {
        // body..
        var obj={};
            obj.id=$(this).attr("data-id");
            obj.image=$(this).find("img").attr("src");
            obj.name=$(this).find("p").html();
        if(CategoriesTemp.findObj(obj)<0){
            CategoriesTemp.push(obj);
            $(this).addClass("chosen-skill");
        }else{
            CategoriesTemp.splice(CategoriesTemp.findObj(obj), 1);
            $(this).removeClass("chosen-skill");
        }
    });

    $(".user-profile-body #skillsModal .btn").on("click",function (argument) {
        // body...
        $(this).addClass("btn-loading");
        for (var i = 0; i < Skills.length; i++) {
            if (SkillsTemp.findObj(Skills[i])<0) {

                $.ajax({
                    url: server_url + "delete-user-skill.php",
                    data: {
                      "id": user_id,
                      "skill_id": Skills[i].skillid,
                      "skill_set_id": Skills[i].id
                    },
                    cache: false,
                    method: "post",
                    async:false,
                    success: function(response){
                        //make use of the response
                        console.log("remove");
                    },
                    error: function(e){
                      console.log(e);
                    }
                });

            }

        }
        Skills=SkillsTemp;
        if(Skills.length>0){
            var postCont="";
            $(".user-profile-body .skills-cont").html("");
            for (var i = 0; i < Skills.length; i++) {
                // Skills[i]


                $.ajax({
                    url: server_url + "create-user-skill.php",
                    data: {
                      "id": user_id,
                      "skill_id": Skills[i].skillid,
                      "skill_set_id": Skills[i].id
                    },
                    cache: false,
                    method: "post",
                    async:false,
                    success: function(response){
                        postCont+='<div class="skill col-lg-4 col-md-4 col-sm-6 col-xs-6">';
                        postCont+=    '<img src="'+Skills[i].image+'"/>';
                        postCont+=    '<p>'+Skills[i].name+'</p>';
                        postCont+='</div>';
                    },
                    error: function(e){
                      console.log(e);
                    }
                });
            }
            $(this).removeClass("btn-loading");
            $(".user-profile-body .skills-cont").html(postCont);

        }
        $('#skillsModal').modal('hide');
    });

    $(".user-profile-body #categoryModal .btn").on("click",function (argument) {
        // body...
        $(this).addClass("btn-loading");
        for (var i = 0; i < Categories.length; i++) {
            // Categories[i]
            if (CategoriesTemp.findObj(Categories[i])<0) {
                $.ajax({
                    url: server_url + "delete-user-category.php",
                    data: {
                      "id": user_id,
                      "category_id": Categories[i].id
                    },
                    cache: false,
                    method: "post",
                    async:false,
                    success: function(response){
                        //make use of the response
                        console.log("removed");
                    },
                    error: function(e){
                      console.log(e);
                    }
                });

            }
        }
        Categories=CategoriesTemp;
        if(Categories.length>0){
            var postCont="";
            $(".user-profile-body .categories-cont").html("");
            for (var i = 0; i < Categories.length; i++) {
                // Skills[i]


                $.ajax({
                    url: server_url + "add-user-category.php",
                    data: {
                      "id": user_id,
                      "category_id": Categories[i].id
                    },
                    cache: false,
                    method: "post",
                    async:false,
                    success: function(response){
                        postCont+='<div class="skill col-lg-4 col-md-4 col-sm-6 col-xs-6">';
                        postCont+=    '<img src="'+Categories[i].image+'"/>';
                        postCont+=    '<p>'+Categories[i].name+'</p>';
                        postCont+='</div>';
                    },
                    error: function(e){
                      console.log(e);
                    }
                });
            }
            $(this).removeClass("btn-loading");
            $(".user-profile-body .categories-cont").html(postCont);

        }
        $('#categoryModal').modal('hide');
    });

//Profile Picture

    $(".upload-profile").on("click",function(argument) {
        // body...
        $("#profileimage").trigger("click");
    });
    $("#profileimage").on("change",function(argument) {
        // body...
        //alert("#profileimage");
        $("#cropModal").modal("show");
    });
    $('.image-editor').cropit({
      smallImage: 'allow',
      minSize:'fit',
      maxZoom:'2'
    });

   /* $('.rotate-cw').click(function() {
      $('.image-editor').cropit('rotateCW');
    });
    $('.rotate-ccw').click(function() {
      $('.image-editor').cropit('rotateCCW');
    });*/

    $('.user-profile-body #cropModal .btn').on("click",function() {
        var imageData = $('.image-editor').cropit('export');
        $("#profile-image-submit").val(imageData);
        $("#profile-user").val(user_username);
        $(this).addClass("btn-loading");
        var self=this;
        $("#profile_pic_form").ajaxForm({
            success:function (argument) {
                if(argument=="true"){
                    // var imageurl="http://avospace.net/YL/media/profiles/"+user_username+".png";
                    dp="http://localhost/media/profiles/"+user_username+".png";
                    setCookie("dp",dp,365);
                    $.post(server_url + "update-user-image.php", {
                          "id": user_id,
                          "image":dp
                        },
                        function(response){
                            if (response=="true") {
                                $(self).removeClass("yluploadloader");
                                $(".artistimg img").attr("src",dp);
                                $("#cropModal").modal("hide");
                                window.location.reload();
                            }
                        }
                    );
                }
            }
        }).submit();
          // alert(imageData)
    });

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
//Gallery:Images
	//Get images
	$(document).on('click','#gallary', function(){
		console.log('load Gallary');
		getUserVideos('a');
		$('#images .img-items').empty();
		//console.log('init indicator ' + imgIndex);
		getImages(0);
		console.log('Gallary loaded successfully');
	});
    $(document).on('click', '#images .more-imgs', function(){
        $('#images .more-imgs').remove();
        getImages(imgIndex);
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
    //Add Project Category
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
            var categs = JSON.parse(response);
            var len = categs.length;
            var categoryList = '';

            for (var i = 0; i < len; i++) {
                categoryList += '<option value="'+ categs[i].category_id + '">' + categs[i].name + '</option>';
            }

            $('#createProjectModal .cat-list select').append(categoryList);
        }
    });
    //Create Project
	$('#createProject').submit(function(e){
		e.preventDefault();

        $('#btn-create-project').addClass("btn-loading");
		var projTitle = $('#project-title').val();
		var projDesc = $('#project-desc').val();
		var categoryID = $('#createProject .cat-list select').val();

		//var projCover = $('#project-cover').val();
	//	$('.file-url').text(projCover);
		var date = new Date();
 		//var projStart = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate();

		function Post(callback){
		    var projectCover = new FormData($('#upload-project-cover')[0]);
		    projectCover.append('folder','projects');
		    	$.ajax({
				url:node_server+"api/upload/image",
				data: projectCover,
				type: "POST",
				contentType: false,
	            processData: false,
				success: callback,
				error: function(XMLHttpRequest, error){
					console.log("not done");
					console.debug(XMLHttpRequest);
					console.debug(error);
					console.log('ggggg');
					return;
				}
			});
		}

		Post(function(res){
                let results = JSON.parse(res);
                console.log(results);
    		    $.ajax({
    			url: server_url + "create-project.php",
    			data: {
    				//post data to the server
    				"id": user_id,
    				"title": projTitle,
    				"description": projDesc,
    				"image": results.image
    			},
    			cache: false,
    			method: "post",
    			success: function(response){
    				//make use of the response

                    $('#btn-create-project').removeClass("btn-loading");
    				//console.log('response from create project: ' + response);
    				var proj_id = JSON.parse(response);
    				addProjectCategory(proj_id, categoryID);

    				$('#createProjectModal').modal('hide');
    				document.getElementById('#createProject').reset();
    			    document.getElementById('#upload-project-cover').reset();
    			},
    			fail: function(error){
    			    //code failure
                    $('#btn-create-project').removeClass("btn-loading");
    			},
    			error: function(error){
    			    //code failure
    			    console.log(error)
                    $('#btn-create-project').removeClass("btn-loading");
    			}
    		});
	    });
	});
	//End Project
        //*****CHECK REACTED NOTIFICATION CODE
	//Reopen Project
	$(document).on('click', '#btn-reopen-project', function(e){
	    e.preventDefault();
	    var project_id = $('#viewProjectModal').attr("data-project-id");

	    $.ajax({
	        url: server_url + "reopen-project.php",
	        data: {
	            //post data to server
                "id": user_id,
                "project_id": project_id
	        },
	        cache: false,
	        method: "post",
	        success: function(response){
	            //make use of response
	            var result = JSON.parse(response);

	            if(result == false){
	                console.log("Could not reopen project");
	            }
	            else{
	                console.log("Successfully reopened project");
	                var project_status = "in-progress";

	                $('.project-item[data-project-id="'+ project_id +'"]').attr('data-project-status', project_status);
	                $('.project-item[data-project-id="'+ project_id +'"]').find('.project-status').text('in-progress');//this line update the project status
	                $('#viewProjectModal').modal("hide");
	                //$('#viewProjectModal .project-status').addClass('inprogress');
	                $('#viewProjectModal .project-status').removeClass('completed');
	            }
	        }
	    });
	})
	//Get Projects
	$(document).on('click','#projects', function(){
		//console.log('load projects');
		$('#Projects .projects').empty();

		getUserProjects(0);
	});
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

	        $('#viewProjectModal .project-controls').append(controls);
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
	//Delete Project
	$(document).on('click', '#Projects .project-item .del-Post', function(e){
	    e.preventDefault();
	    var projItem = $(this).parents('.project-item');
	    var projID = $(projItem).attr('data-project-id');
	    //console.log('delete project ' + projID);

	    $.ajax({
	        url: server_url + 'archive-project.php',
	        data: {
	            "id": user_id,
	            "project_id": projID
	        },
	        cache: false,
	        method: "post",
	        success: function(response){
	            //maek use of the response
	            console.log('delete done, ' + response);
	            $(projItem).hide(500);
	        }
	    });
	});
	//Add Project entry
	var entry_media_type;
	$(document).on('click', '#Proj-entry-image', function(e){
	   entry_media_type = "image";
	   console.log(entry_media_type);
	});
	$(document).on('click', '#Proj-entry-video', function(e){
	   entry_media_type = "video";
	   console.log(entry_media_type);
	});
	$(document).on('click', '#Add-project-entry', function(e){
	    e.preventDefault();
	    $('#viewProjectModal .add-project-entry').toggle(500);
	});
	$(document).on('click', '#btn-submit-proj-endtry', function(e){
	    e.preventDefault();

	    var text = $('#Proj-entry-text').val();
	    var project_id = $('#viewProjectModal').attr("data-project-id");
	   	var formDatai = new FormData($("#upload-Proj-entry-image")[0]);
		var formDatav = new FormData($("#upload-Proj-entry-video")[0]);
		formDatai.append('folder','projects');
		formDatav.append('folder','projects');
	   function PostImage(callback){
	       $.ajax({
				url:node_server+"api/upload/image",
				data: formDatai,
				type: "POST",
				contentType: false,
	            processData: false,
				success:callback,
				error: function(XMLHttpRequest, error){
					console.log("not done");
					console.debug(XMLHttpRequest);
					console.debug(error);
					console.log('unable to create post.');
					return;
				}
			});
	   }

	   function PostVideo(callback){
	       $.ajax({
				url:node_server+"api/upload/video",
				data: formDatav,
				type: "POST",
				contentType: false,
	            processData: false,
				success:callback,
				error: function(XMLHttpRequest, error){
					console.log("not done");
					console.debug(XMLHttpRequest);
					console.debug(error);
					console.log('ggggg');
					return;
				}
			});
	   }

	   if(entry_media_type ==="image"){
	       console.log("entry_media_type is image");
	       PostImage(function(result){
	            $.ajax({
        	        url: server_url + 'add-project-entry.php',
        	        data: {
                    //post data to server
                    "id": user_id,
                    "project_id": project_id,
                    "description": text,
                    "entry_type": entry_media_type,
                    "media_url": result
        	        },
        	        cache: false,
        	        method: "post",
        	        success: function(response){
        	            //make use of response
        	            var result = JSON.parse(response);

        	            if(result == true){
        	                $('#viewProjectModal .add-project-entry').toggle(500);
        	            }
        	            else{
        	                alert("Could not add project entry.");
        	            }

        	        }
        	    });
	       });
	   }else if(entry_media_type ==="video"){
	       console.log("entry_media_type is video");
	        PostVideo(function(result){
	                $.ajax({
            	        url: server_url + 'add-project-entry.php',
            	        data: {
                        //post data to server
                        "id": user_id,
                        "project_id": project_id,
                        "description": text,
                        "entry_type": entry_media_type,
                        "media_url": result
            	        },
            	        cache: false,
            	        method: "post",
            	        success: function(response){
            	            //make use of response
            	            var result = JSON.parse(response);

            	            if(result == true){
            	                $('#viewProjectModal .add-project-entry').toggle(500);
            	            }
            	            else{
            	                alert("Could not add project entry.");
            	            }

            	        }
            	  });
	       });
	   }
	});
});

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
$(document).ready(function(){
    var win = $(window);

    $('[data-toggle="tooltip"]').tooltip();
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
//FUNCTIONS AND COMPONENTS
function update_basic(f,s,l,d,g,w) {
   // alert(f+" "+s+" "+l+" "+d+" "+g);
    $(".user-profile-body #Basic #user-firstname").html(f);
    $(".user-profile-body #Basic #user-lastname").html(s);
    $(".user-profile-body .user-location").html(l);
    $(".user-profile-body #Basic #user-dob").html(d);
    $(".user-profile-body #Basic #user-gender").html(g);
    $(".user-profile-body #Basic .user-website").html(w);
    $(".user-profile-body #Basic .user-website").attr("href","http://"+w);
    // alert(f+" "+s+" "+l+" "+d+" "+g);

    //Banner
    $(".user-profile-body #page .table .table-cell .user-name").html(f+" "+s+"<span>.</span>");
}

function myBlogComponent(post_id,description,date) {
    var postdelete='<div class="dropdown"><button class="dropdown-toggle" type="button" data-toggle="dropdown"><span class="caret"></span></button><ul class="dropdown-menu dropdown-menu-right"><li><a href="#" class="del-Post">Delete Post</a></li><li><a href="#" class="edit-Post" data-toggle="modal" data-target="#editPostModal">Edit Post</a></li></ul></div>';
    var blog='<div data-post-id='+post_id+' class="blog-post-item blog-item ">';
        blog+='<p>'+description+'</p>';
        blog+='<div class="blog-item-detail row"><div class="col-sm-9"></div><div class="col-sm-3 padding-top-xs-15"><a href="#" onclick="return false" id="comments_icon" class="comments_iconClass" data-post-id="'+post_id+'"><i class="fa fa-comment"></i> comments </a></div></div>';
        blog+='<div class="row blog-item-title-wrapper">'+postdelete+'<div class="blog-item-title col-sm-6"><span class="post-date">'+date+'</span></div><div class="col-sm-6 blog-item-body"></div></div>';
        blog+= '<div id="comments'+post_id+'" class="commentsClass" style="display: none; margin:auto; width: 90%; height: auto;"><div id = "comment_section'+post_id+'" style="min-height: 50px;"></div><div class="row" id="userinput_comment" style="border-top: 2px solid #F3F3F5;"><object data="'+dp+'"><img id="img" class="col-sm-4" src="images/user.png"></object><div class=" col-sm-9" id="comment_input"><form class="comment_-form"><textarea id="write_comment'+post_id+'" name ="comment" style="height: 35px; width: 35vw; resize: none; outline: none; border: 2px solid #F3F3F5" placeholder="What are your thoughts?"></textarea></form><button id="submit_comment" type="submit" class="btn btn-animated btn-contact ripple-alone submit_comment" data-text="upload" style="width: 100px;"><span class="btn-icon"><span class="loader-parent"><span class="loader3"></span></span></span></button></div></div></div></div>';

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
                        icons = '<div class="blog-item-detail row"><div class="col-sm-9"><a href="profile.html"><i class="fa fa-user"></i>'+Post.username+'</a>'+cats+'<a href="#" onclick="return false" id="comments_icon" class="comments_iconClass" data-post-id="'+obj+'"><i class="fa fa-comment"></i> comments</a><a href="#" class= "starClass" id="'+star_id1+'" data-post-id="'+obj+'" data-user-id="'+Post.user_id+'" data-post-type="'+Post.type+'" onclick="return false" style="display:none"><i class="ion-ios-star-outline"  style="font-size: 17px;"></i></a><a class= "starClass" href="#" id="'+star_id2+'" data-post-id="'+obj+'" onclick="return false"><i class="ion-ios-star"  style="font-size: 17px;"></i>'+Post.likes+'</a></div><div class="col-sm-3 text-right padding-top-xs-15"><a href="post.html?='+obj+'" class="btn-blog-more animsition-link"><span>view post</span><i class="btn-icon fa fa-long-arrow-right"></i></a></div></div>';
                    }else{
                        icons = '<div class="blog-item-detail row"><div class="col-sm-9"><a href="profile.html"><i class="fa fa-user"></i>'+Post.username+'</a>'+cats+'<a href="#" onclick="return false" id="comments_icon" class="comments_iconClass" data-post-id="'+obj+'"><i class="fa fa-comment"></i> comments</a><a href="#" class= "starClass" id="'+star_id1+'" data-post-id="'+obj+'" data-user-id="'+Post.user_id+'" data-post-type="'+Post.type+'" onclick="return false"><i class="ion-ios-star-outline"  style="font-size: 17px;"></i>'+Post.likes+'</a><a class= "starClass" href="#" id="'+star_id2+'" data-post-id="'+obj+'" onclick="return false" style="display: none;"><i class="ion-ios-star"  style="font-size: 17px;"></i></a></div><div class="col-sm-3 text-right padding-top-xs-15"><a href="post.html?='+obj+'" class="btn-blog-more animsition-link"><span>view post</span><i class="btn-icon fa fa-long-arrow-right"></i></a></div></div>';
                    }
                    if(Post.type == "video"){
                        image = '<a id="'+obj+'" data-post-id="'+obj+'" href="#" onclick="return false"><div class="videoBlock"><video data-skin="dark" preload="none" poster="'+Post.cover_image+'" id="myvideo" class="afterglow" id="myvideo" height="350"><source type="video/mp4" src="'+Post.media_url+'" /><source type="video/webm" src="'+Post.media_url+'" /><source type="video/ogg" src="'+Post.media_url+'" /></video></div></a>';
                    }
                    if(Post.type == "audio"){
                        image = '<a id="'+obj+'" data-post-id="'+obj+'" href="#" onclick="return false"><div class="audioBlock" style="background-image: url('+Post.cover_image+');"><div class="whiteMask"><div id="waveform1" class="audioWave" data_song="'+Post.media_url+'" data_id="'+obj+'"></div><div class="audioControls"><button type="button" name="button" class="smaller ion-ios-volume-low" onclick="volume('+obj+', -0.25)"></button><button type="button" name="button" class="smaller ion-ios-volume-high" onclick="volume('+obj+', 0.25)"></button><button type="button" name="button" class="play ion-ios-play" onclick="playOrPauseSong('+obj+')"></button><button type="button" name="button" class="smaller ion-stop" onclick="stopPlay('+obj+')"></button><button type="button" name="button" class="smaller ion-volume-mute" onclick="mute('+obj+')"></button></div></div></div></a>';
                    }
                    if(Post.type == "image"){
                        image = '<a class="media_content" id="'+obj+'" data-post-id="'+obj+'" href="post.html?='+obj+'"><img style="width:100%; height:350px; background:black;" src="'+Post.media_url+'" /></a>';
                    }

                    var postdelete='<div class="dropdown"><button class="dropdown-toggle" type="button" data-toggle="dropdown"><span class="caret"></span></button><ul class="dropdown-menu dropdown-menu-right"><li><a href="#" class="del-Post">Delete Post</a></li><li><a href="#" class="edit-Post" data-toggle="modal" data-target="#editPostModal">Edit Post</a></li></ul></div>';

                    text = '<div class="row blog-item-title-wrapper" style="padding-bottom: 10px;">'+postdelete+'<div class="blog-item-title col-sm-6"><h1 class=" font-second">'+Post.title+'</h1><span class="post-date">'+date+'</span></div><!-- Text Intro --><div class="col-sm-6 blog-item-body"><p>'+Post.description+'</p></div></div>';
                    comments = '<div id="'+comments+'" class="commentsClass" style="display: none; margin:auto; width: 90%; height: auto;"><div class="comment_section" id = "'+comment_section+'" style="max-height: 300px; overflow:auto"></div><div class="row" id="userinput_comment" style="border-top: 2px solid #F3F3F5;"><object data="'+dp+'"><img id="img" class="col-sm-4" src="images/user.png"></object><div class=" col-sm-9" id="comment_input"><form class="comment_-form"><textarea id="'+write_comment+'" name ="comment" style="height: 35px; width: 35vw; resize: none; outline: none; border: 2px solid #F3F3F5" placeholder="What are your thoughts?"></textarea></form><button id="submit_comment" type="submit" class="btn btn-animated btn-contact ripple-alone submit_comment" data-post-id="'+obj+'" data-user-id="'+Post.user_id+'" data-post-type="'+Post.type+'" data-text="upload" style="width: 100px;"><span class="btn-icon"><span class="loader-parent"><span class="loader3"></span></span></span></button></div></div></div>';
                    html = ' <div data-post-id="'+obj+'" class="blog-item">'+image+icons+text+comments+'</div>';
                    return html;

}

function follow_component(name,image) {
    // body...
    var div='<div class="user-x col-lg-2 col-md-3 col-sm-3 col-xs-4">';
        div+='<a href="view_profile.html?='+name+'" data-user-name='+name+'><img src="'+image+'">';
        div+=name+'</a></div>';

    return div;
}
function loadPosts(start){
    $(".user-profile-body .more-posts").addClass("ylloader");
    $.post(server_url + "get-user-posts.php", {
            "id": user_id,
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
                let Months=["January","February","March","April","May","June","July","August","September","October","November","December"];

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
                              progressColor: 'black',
                              backend: 'MediaElement'
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
//Get user Images for gallery
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

			if(len = imagePagination){
			    var more = '<div class="more-imgs col-sm-12"><a href="#"><strong>more...</strong></a></div>';
			    $('#images').append(more);
			}
		}
	});
	imgIndex = end;
}
function getUserVideos(start){

    $.ajax({
    	url: server_url + "get-videos.php",
    	data: {
    		//post data to the server
    		"id": user_id,
            "from": "0",
            "limit": "6"
    	},
    	cache: false,
    	method: "post",
    	success: function(response){
    		//make use of the response
    		//console.log(response);
    		var video = JSON.parse(response);
    		var vid = '<a id="'+video.post_id+'" data-post-id="'+video.post_id+'" href="#" onclick="return false">'+
                            '<div class="videoBlock">'+
                                '<video data-skin="dark" preload="none" poster="'+"images/art1.jpg"+'" id="myvideo" class="afterglow" id="myvideo" height="350">'+
                                    '<source type="video/mp4" src="'+video.media_url+'" /><source type="video/webm" src="'+video.media_url+'" /><source type="video/ogg" src="'+video.media_url+'" />'+
                                    '</video>'+
                            '</div>'+
                        '</a>';
            $('#videos').append(vid);
    	}
    });

}
function addProjectCategory(project_id, category_id){
    $.ajax({
        url: server_url + "add-project-category.php",
        data: {
            //post data to server
            "project_id": project_id,
            "category_id": category_id
        },
        cache: false,
        method: "post",
        success: function(response){
            //make use of response
            console.log("project category "+response)

        }
    });
}
function getUserProjects(start){
    var end = start + projPagination;
	//console.log('curr indicator1 ' + imgIndex);
	$.ajax({
		url: server_url + "get-user-projects.php",
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
            var myProjects = JSON.parse(response);
            console.log(myProjects);
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

			    projItems += '<div class="project-item" data-project-id=' + myProjects[i].project_id + ' data-project-status='+ status +'>'+
                            '<a class="blog-media animsition-link" href="#">'+
                                '<img class="parallax-img img-responsive" src="' + myProjects[i].image + '"  data-center="transform: translate3d(0px, -50%, 0px)" ></a>'+
                            '<div class="row blog-item-title-wrapper">'+
                                '<div class="dropdown">'+
                                    '<button class="dropdown-toggle" type="button" data-toggle="dropdown">'+
                                        '<span class="caret"></span>'+
                                    '</button>'+
                                    '<ul class="dropdown-menu dropdown-menu-right">'+
                                        '<li><a href="#" class="del-Post">Delete Project</a></li>'+
                                        '<li><a href="#" class="edit-Post">Edit Project</a></li>'+
                                    '</ul>'+
                                '</div>'+
                                '<div class="blog-item-title col-sm-6">'+
                                    '<h1 class=" font-second">'+  myProjects[i].title + '</h1>'+
                                    '<span class="project-status">'+status+'</span>'+
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
                for(var i = len-1; i >= 0; i--){
                    var mediaType = entries[i].entry_type;
                    var entryMedia;

                    if(mediaType === "image"){
                        entryMedia = '<img src="' + entries[i].media + '">';
                    }

                    time_line += '<div class="time-stamp selected" data-entry-id='+ entries[i].id +'>'+
                                    entryMedia+
                                    '<h2><span class="fa fa-square"></span>' + entries[i].date.replace(/-/g,'/') + '</h2>'+
                                    '<p>'+ entries[i].description+'</p>'+
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
