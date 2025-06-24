// var server_url = "https://api.youthleague.co/api/";
var server_url = "http://139.59.139.239/ylbackend/api/";

user_id=getCookie("id");
user_username=getCookie("user");

if(user_id==null || user_username==null || user_username=="" || user_id==""){
    window.open("index.html","_self");
}

$(document).ready(function(){
//Get Categories
    fetch(server_url +"get-categories.php", {
        method: "post",
        headers: new Headers({
            'Content-Type': 'Application/x-www-form-urlencoded'
        }),
        body: $.param({
            "id": user_id//getCookie('id')
        })
    }).then(function(res){
        return res.json();
    })
    .then(function(response){
           // console.log(response);
            var size = response.length;
            var cat_id;
            var desc;
            var pic;
            var name;
            var cat = "";
            console.log("Loading Categories!");
            for(var i = 0; i < size; i++){

                 cat_id = response[i].category_id;
                 desc = response[i].description;
                 pic = response[i].image;
                 name = response[i].name;

                cat += '<div class="services-section-item col-sm-4 col-xs-6 wow fadeInUpRightScale" data-id="'+cat_id+'">'+
                            '<div class="services-section-item-icon">'+
                                '<img src=' + pic + '>'+
                            '</div>'+
                            '<h4 class="services-item-title font-second">'+name+'.</h4>'+
                        '</div>';
            }
            var cat_show = cat;//.html();
            $(".services-section-items").append(cat_show);

        /*$(".services-section-item").hover(function(){
            $(this).find('.services-section-item-text').toggle('slideInUp');
            $(this).find('img').toggle('slideInUp');
        },
        function(){
            $(this).find('.services-section-item-text').toggle('slideInUp');
            $(this).find('img').toggle('slideInUp');
        });*/
            //console.log("Append HTML to file");
        }).catch(function(error){
            console.log(error);
        });

    /*$.post(server_url +"get-categories.php", {
            "id":2 //getCookie('id');
        },
        function(response){
            response = JSON.parse(response);
            var size = response.length;
            var cat_id;
            var desc;
            var pic;
            var name;
            var cat = "";

            for(var i = 0; i < size; i++){

                 cat_id = response[i].category_id;
                 desc = response[i].description;
                 pic = response[i].image;
                 name = response[i].name;

                cat += '<div class="services-section-item col-sm-4 col-xs-6 wow fadeInUpRightScale" data-id="'+cat_id+'">'+
                            '<div class="services-section-item-icon">'+
                                '<img src=' + pic + '>'+
                            '</div>'+
                            '<h4 class="services-item-title font-second">'+name+'.</h4>'+
                        '</div>';
            }
            var cat_show = cat;//.html();

            $(".services-section-items").append(cat_show);
        }
    );*/
//View filtered posts
    $(document).on('click', '.services-section-item', function(){
        var cat_id = $(this).attr("data-id")
        window.location.href = 'mainf.html?='+cat_id;
    })
});
