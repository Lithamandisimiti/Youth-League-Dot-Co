//api/mailer/yl-mailer.js
var express=require("express");
var router = express.Router();
var nodemailer = require('nodemailer');
var mysql = require('mysql')
const site_url = "http://youthleague.co/"

var mail_Origin = "noreply@youthleague.co";
var mail_password = "miti-litha-123";

/*var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '',
	database : 'yl_dev',
	timezone: 'utc'
});*/
var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'avospace',
	password : 'thenamelesssix',
	database : 'yl_dev',
	timezone: 'utc'
});

connection.connect();
router.get('/', (req, res) => {
	res.setHeader('Content-Type', 'text/html');
    res.send('YL Mailer is online');
});

router.post('/sendMail', (req, res) => {
	var request_Object = req.body;
	//console.log(request_Object);
	//request_Object = {mailType: "forgot_password", email: "slimseal@gmail.com", id: "22"}
	if(!request_Object.mailType){
		return res.json({
			status: "fail",
			msg: "No mail Type Specified."
			});
	}
	if(!request_Object.email){
		return res.json({
			status: "fail",
			msg: "No email Specified"
		});
	}
	//console.log(request_Object);
	var result = "nothing happend!";
	var html_msg = "";
	var msg_subjesct = "";
	var link = "#";
	var user_name = "";
	var user_emial = "";
	var user_username="";
	var user_image="";
	var user_id= "";
	
	//Create Query
	var key = "";
	if(request_Object.mailType == "forgot_password"){
		//request_Object = email, mailType
		var sql_query = "SELECT user_id, user_firstname, user_username, user_email FROM  USER WHERE user_email=?"; 
		key = request_Object.email;
		
	}
	else if(request_Object.mailType == "email_valid") {
		//request_Object = id, mailType
		var sql_query = "SELECT user_id, user_firstname, user_username, user_email, user_image FROM  USER WHERE user_id=?";
		key = request_Object.id;
	}else if(request_Object.mailType == "validate_email"){
				
				user_name = request_Object.username;
				//Create message
				console.log("Checking existence of email.");
				//Send to validate a user email
				link = site_url + "mainf.html?user_id="+ result[0].user_id + ",user_name=" + result[0].user_username;
				html_msg = '<body><table class="email-wrapper" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;" ><tr><td align="center"><table class="email-content" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;color:#666;" ><!-- Email Body --><tr><td class="email-body" width="100%" cellpadding="0" cellspacing="0"><table class="email-body_inner" align="center" width="570" cellpadding="0" cellspacing="0" style="margin-bottom:20px;" ><tr><td class="content-cell"><h1>Hi there '+
				user_name+',</h1><p style="margin-top:0;margin-bottom:21px;margin-right:0;margin-left:0;" >Welcome to the Youth League Dot Co. You will receive another email shortly with your security code to activate your account</p><p style="margin-top:0;margin-bottom:21px;margin-right:0;margin-left:0;" >If this is not you, and you did not create an account with us, please click the link below.</p><table class="body-action" align=<td align="center"><a href="'+
				link+'">Not me</a></td></tr></table><p class="regards" style="margin-top:0;margin-bottom:21px;margin-right:0;margin-left:0;" >Thanks,<br>Youth League Team</p></td></tr></table></td></tr><tr><td><table class="email-footer" align="center" width="570" cellpadding="0" cellspacing="0" style="margin-bottom:20px;" ><tr><td class="content-cell" align="center"><p class="sub align-center" style="margin-top:0;margin-bottom:21px;margin-right:0;margin-left:0;" >&copy; 2017 Youth League. All rights reserved.</p><p class="sub align-center" style="margin-top:0;margin-bottom:21px;margin-right:0;margin-left:0;" >Youth League Inc.<br></p></td></tr></table></td></tr></table></td></tr></table></body>';
				msg_subjesct = "Email Validation"
				

				//***
				var smtpConfig = {
				    host: 'www.avohost-server.avohost.net',//'brooklyn.aserv.co.za',
				    port: 465,
				    secure: true, // use SSL
				    auth: {
				        user: mail_Origin,
				        pass: mail_password
				    }
				};
				//create transporter
				var transporter = nodemailer.createTransport(smtpConfig);

				var mailOptions = {
					from: mail_Origin,
					to: request_Object.email,
					subject: msg_subjesct,
					html: html_msg
				}

				console.log("Sending email...");
				transporter.sendMail(mailOptions, function(error, info) {
					if(error){
						console.log(error);
						result = {
							status: "fail",
							msg: "An Error occured"
						};
						console.log("Could not send email");
						
						return res.json(result);
					}

					console.log('Email sent to "' + request_Object.email + '".');
					result = {
						status: "success",
						msg: "Email Send to " + request_Object.email
					};
					//console.log(result);
					res.json(result)
					return;
				});
			return;
	}

	console.log('Making Query...')
	connection.query(sql_query,[key], function(error, result, fields){
		if(error) throw error;
		console.log("query returned.");
		console.log(result);
		if(result.length > 0){
			user_name = result[0].user_firstname;
			user_username = result[0].user_username;
			user_image = result[0].user_image;
			user_id = result[0].user_id;
			//Create message
			console.log("Create mail text.");
			if(request_Object.mailType == "forgot_password"){
				//Send user a promt with a link to reset their password.
				link = site_url + "password_change.html?user_id="+ result[0].user_id + ",user_name=" + result[0].user_username;
					html_msg = '<body><table class="email-wrapper" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;" ><tr><td align="center"><table class="email-content" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;color:#666;" ><!-- Email Body --><tr><td class="email-body" width="100%" cellpadding="0" cellspacing="0"><table class="email-body_inner" align="center" width="570" cellpadding="0" cellspacing="0" style="margin-bottom:20px;" ><!-- Body content --><tr><td class="content-cell"><h1>Hi there '+
					user_name+
					',</h1><p style="margin-top:0;margin-bottom:21px;margin-right:0;margin-left:0;" >You recently requested to reset your password for your account. Click the button below to reset it.</p><!-- Action --><table class="body-action" align="center" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;" ><tr><td align="center"><a class="btn btn-success" href="'+
					link+
					'" target="_blank" style="padding-top:0.5rem;padding-bottom:0.5rem;padding-right:1rem;padding-left:1rem;font-size:1.25rem;line-height:1.5;color:#fff;background-color:#000;border-color:#28a745;border-radius:50px;text-decoration:none;margin-bottom:10px;" >Reset your password</a></td></tr> </table><p style="margin-top:0;margin-bottom:21px;margin-right:0;margin-left:0;" >If you did not request a password reset, please ignore this email or <a href="#">contact us</a> for any queries.</p><p class="regards" style="margin-top:0;margin-bottom:21px;margin-right:0;margin-left:0;" >Thanks,<br>Youth League Team</p></td></tr></table></td></tr><tr><td><table class="email-footer" align="center" width="570" cellpadding="0" cellspacing="0" style="margin-bottom:20px;" ><tr><td class="content-cell" align="center"><p class="sub align-center" style="margin-top:0;margin-bottom:21px;margin-right:0;margin-left:0;" >&copy; 2017 Youth League. All rights reserved.</p>'+
					'<p class="sub align-center" style="margin-top:0;margin-bottom:21px;margin-right:0;margin-left:0;" >Youth League Inc.<br></p></td></tr></table></td></tr></table></td></tr></table></body>';
				msg_subjesct = "Password Reset";
			}
			else if(request_Object.mailType == "email_valid"){
				//Send to validate a user email
				securityCode = Math.round(Math.random() * (1000000-1000) + 1000);
				link = "#";
					html_msg = '<body><table class="email-wrapper" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;" ><tr><td align="center"><table class="email-content" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;color:#666;" ><!-- Email Body --><tr><td class="email-body" width="100%" cellpadding="0" cellspacing="0"><table class="email-body_inner" align="center" width="570" cellpadding="0" cellspacing="0" style="margin-bottom:20px;" ><tr><td class="content-cell"><h1>Hi there '+
					user_name+',</h1><p style="margin-top:0;margin-bottom:21px;margin-right:0;margin-left:0;" >Your account has been successfuly created.</p><p style="margin-top:0;margin-bottom:21px;margin-right:0;margin-left:0;" >Your security code is </p><table class="body-action" align=<td align="center"><a href="'+
					link+'">'+securityCode+'</a></td></tr></table><p class="regards" style="margin-top:0;margin-bottom:21px;margin-right:0;margin-left:0;" >Thanks,<br>Youth League Team</p></td></tr></table></td></tr><tr><td><table class="email-footer" align="center" width="570" cellpadding="0" cellspacing="0" style="margin-bottom:20px;" ><tr><td class="content-cell" align="center"><p class="sub align-center" style="margin-top:0;margin-bottom:21px;margin-right:0;margin-left:0;" >&copy; 2017 Youth League. All rights reserved.</p><p class="sub align-center" style="margin-top:0;margin-bottom:21px;margin-right:0;margin-left:0;" >Youth League Inc.<br></p></td></tr></table></td></tr></table></td></tr></table></body>';
				msg_subjesct = "Securicty Code"
			}

			//***
			var smtpConfig = {
			    host: 'www.avohost-server.avohost.net',//'brooklyn.aserv.co.za',
			    port: 465,
			    secure: true, // use SSL
			    auth: {
			        user: mail_Origin,
			        pass: mail_password
			    }
			};
			//create transporter
			var transporter = nodemailer.createTransport(smtpConfig);

			var mailOptions = {
				from: mail_Origin,
				to: request_Object.email,
				subject: msg_subjesct,
				html: html_msg
			}

			console.log("Sending email...");
			transporter.sendMail(mailOptions, function(error, info) {
				if(error){
					console.log(error);
					result = {
						status: "fail",
						msg: "An Error occured"
					};
					console.log("Could not send email");
					
					return res.json(result);
				}

				console.log('Email sent to "' + request_Object.email + '".');
				if(request_Object.mailType == "forgot_password"){
					result = {
						status: "success",
						msg: "Email Send to " + request_Object.email,
					};
				}else if(request_Object.mailType == "email_valid"){
					result = {
						status: "success",
						msg: "Email Send to " + request_Object.email,
						securityCode: securityCode,
						username:user_username,
						image:user_image,
						id:user_id
					};
				}
				
				//console.log(result);
				res.json(result)
				return;
			});
		}
		else {
			console.log("User with email '%s' not found\n",request_Object.email);
			res.json({
				status: "fail",
				msg: "Email not found. Please make sure you typed the email correctly."
			});
		}
	});
});

module.exports = router;
