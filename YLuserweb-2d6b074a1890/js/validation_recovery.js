var node_server = "http://139.59.139.239:2048/";
//var node_server = "http://localhost:2048/";
var api_server = "http://139.59.139.239/ylbackend/api/";
//var api_server = "http://localhost/ylbackend/api/";

var user_id = "";
var user_name = "";

var curr_url = window.location.toString();
if(curr_url.indexOf("?")>0){
   var user_details=curr_url.substring(curr_url.indexOf("?")+1).split(",");
   user_id = user_details[0].substring(user_details[0].indexOf("=")+1);
   user_name = user_details[1].substring(user_details[1].indexOf("=")+1);
}

$(document).ready(function() {
//Forgot Password
    $('#request-password-reset').submit(function(e) {
        e.preventDefault();
        $('#btn-forgot-password').addClass("btn-loading");
        var email = $('#email').val(); //"slimseal@gmail.com";
        var type = "forgot_password";

        console.log("request reset email for :" + email + ", " + type);

          /*var request = new XMLHttpRequest();
          request.onreadystatechange = function() {
            console.log("readyState:",this.readyState,"status:",this.status)
            if (this.readyState == 4 && this.status == 200) {
             console.log("response"+this.responseText);
             //let response=JSON.parse(this.responseText);
              //self.setState({category:response[0].name,categories:response,loading:"none"})
              console.log("TEXT:",this.responseText)
            }else if (this.readyState == 4) {
             //self.setState({notificationText:"error: "+this.responseText,loading:"response"})
             console.log("TEXT:",this.responseText)
            }
          }

          request.open("GET", `http://avospace.net:12321/bill/${2}`,false);
          request.send();*/
        var sendData={
            method:'POST',
            headers:new Headers({
                'Content-Type':'application/x-www-form-urlencoded'
            }),
            body:$.param({
                  email: email,
                  mailType: type
            })

        };
        fetch(node_server + "api/mailer/sendMail",sendData)
            .then((res)=> {
                console.log("res",res);
                return res.json()})
            .then(function(response){
                    //make use of response
                    console.log("response",response);
                    var data = response;

                    $('#btn-forgot-password').removeClass("btn-loading");
                    if (data.status === "fail") {
                        console.log(data.msg);
                        $('#error').text(data.msg);
                        $('#error').show();
                    }
                    else if(data.status === "success"){
                        console.log("Email send.");
                        var container = $('#request-password-reset').parent();
                        $('#request-password-reset').hide();
                        container.append("<p>An email with instructions to reset your password has been send to you. Please note it might take upto <strong>2 hours</strong> before you recieve the email.<\p>");
                    }
                    else{
                        console.log("something went wrong");
                        $('#error').text("Something went wrong.");
                        $('#error').show();
                    }
                })
            .catch(function(error) {
                 $('#btn-forgot-password').removeClass("btn-loading");
                console.log("error",error)
            });
            /*$.ajax({
                url: node_server + "mail",
                data: {
                  email: email,
                  mailType: type
                },
                cache: false,
                method: "post",
                crossDomain: true,
                async:false,
                success: function(response){
                    //make use of response
                    console.log(response);
                    var data = response.data;

                    $('#btn-forgot-password').removeClass("btn-loading");
                    if (data.status === "fail") {
                        console.log(data.msg);
                        $('#error').text(data.msg);
                        $('#error').show();
                    }
                    else if(data.status === "success"){
                        console.log("Email send.");
                        var container = $('#request-password-reset').parent();
                        $('#request-password-reset').hide();
                        container.append("<p>An email with instructions to reset your password has been send to you.<\p>");
                    }
                    else if (response == "not found") {
                        console.log("Email not found.");
                        $('#error').text("Email not found. Please make sure to type the email you used to create the account.");
                        $('#error').show();
                    }
                },
                error: function(xmr,error){
                    $('#btn-forgot-password').removeClass("btn-loading");
                    console.log(xmr);
                    console.log(error);
                }
            });*/
    });
    $('#reset-password').submit(function(e) {
        e.preventDefault();
        var newpass = $('#pass1').val();
        var newpass2 = $('#pass2').val();
        if(valid_passowrd(newpass, newpass2)){
            var sendData={
                method:'POST',
                headers:new Headers({
                    'Content-Type':'application/x-www-form-urlencoded'
                }),
                body:$.param({
                    "id": user_id,
                    "newPass": newpass
                })

            };
            fetch(api_server + "reset-password.php",sendData)
            .then((res)=> {
                console.log("res",res);
                return res.text()})
              .then(
                function(response){
                    //make use of response
                    console.log("response",response)
                    if(response == "true"){
                        $('#reset-password fieldset').hide(100);
                        $('#reset-password').append(
                            '<div class="text-center" style="margin-top: 0px;">'+
                                '<p>Your password has been successfully reset.</p>'+
                                '<div><i class="fa fa-smile-o" style="font-size: 7em" aria-hidden="true"></i></div>'+
                            '</div>');
                    }
                    else{
                        $('#error').text("Could not reset password.");
                        $('#error').show();
                    }

                })
              .catch(function(error) {
                 // $('#btn-forgot-password').removeClass("btn-loading");
                console.log("error",error)
              });
            /*$.ajax({
                url: api_server + "reset-password.php",
                data: {
                    id: user_id,
                    newPass: newpass
                },
                cache: false,
                method: "post",
                success: function(response){
                    //make use of response
                    if(response == "true"){
                        $('#reset-password fieldset').hide(100);
                        $('#reset-password').append(
                            '<div class="text-center" style="margin-top: 0px;">'+
                                '<p>Your password has been successfully reset.</p>'+
                                '<div><i class="fa fa-smile-o" style="font-size: 7em" aria-hidden="true"></i></div>'+
                            '</div>');
                    }
                    else{
                        $('#error').text("Could not reset password.");
                        $('#error').show();
                    }

                },
                error: function(xmr, error) {
                    console.log(xmr);
                    console.log(error);
                }
            });*/
        }
        else {
            $('#error').text("Passwords do not match");
            $('#error').show();
        }
    });
});

function valid_passowrd(password1, password2) {
    if(password1 == password2){
        return true;
    }

    return false;
}
