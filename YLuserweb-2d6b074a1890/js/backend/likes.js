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

$(function(){
    var user_id = getCookie('id');
    $(document).on("click",".starClass", function(){
        var data = $(this).data('post-id');
        var id1  = "like" + data;
        var id2  = "unlike" + data;
        var id = $(this).attr('id');
        if(id==id1){
            id2 = "#" + id2;
            id = "#" + id;
            $.ajax({
                url:server_url+"like.php",
                data:{
                    "id":user_id,
                    "post_id":data
                },
                cache:false,
                method:"post",
                success: function(response){
                    console.log(response);
                    $(id).hide();
                    var str = $(id).text();
                    var num = parseInt(str);
                    num++;
                    $(id2).html('<i class="ion-ios-star"  style="font-size: 17px;"></i>'+ num);
                    $(id2).show();
                },
                error: function(){
                    console.log("cant connect.")
                }
            });
        }else
        if(id==id2){
            id1 = "#" + id1;
            id = "#" + id;
            $.ajax({
                url:server_url+"unlike.php",
                data:{
                    "id":user_id,
                    "post_id":data
                },
                cache:false,
                method:"post",
                success: function(response){
                    console.log(response);
                    $(id).hide();
                    var str = $(id).text();
                    var num = parseInt(str);
                    num--;
                    $(id1).html('<i class="ion-ios-star-outline"  style="font-size: 17px;"></i>'+ num);
                    $(id1).show();
                },
                error: function(){
                    console.log("cant connect.")
                }
            });


        }
    });
});
