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

 function Validate(Security_Code){
 	var securitycode = getCookie('dGsHsja');
 	if( securitycode === Security_Code){
 		return true
 	}
 	return false;
 }

 $(function(){
 	var error = document.getElementById('error');
 	$("button#btn-submit").click(function (e){
 		e.preventDefault();
 		var SecurityCode = document.getElementById("security-code").value;
 		if(Validate(SecurityCode)){
 			window.location.href = "mainf.html";
 		}else{
 			error.innerHTML = "Invalid Code";
      		error.show(250).delay(3000).fadeOut();
 		}
 	})
 })