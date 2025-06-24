var user_id=getCookie("id");
var user_username=getCookie("user");

if(user_id==null || user_username==null || user_username=="" || user_id==""){
    // console.log(user_id)
   window.open("index.html?=login","_self");
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
