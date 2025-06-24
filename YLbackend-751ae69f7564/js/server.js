var express = require("express"),
	app= express(),
	bodyParser = require('body-parser'),
	multer = require('multer'),
	mysql = require('mysql'),
	fs = require('fs');

var server;
process.env.NODE_ENV = 'production';
var isProduction = (process.env.NODE_ENV === 'production');

if(isProduction){
  var key = fs.readFileSync(__dirname+'/encryption/privkey.pem');
  var cert = fs.readFileSync(__dirname+'/encryption/cert.pem');

  var options = {
    key: key,
    cert: cert
  };

  server=require("https").createServer(options, app);
}
else{
  server=require("http").createServer(app);
}

var io=require("socket.io")/*(server, {
  path: '/',
  serveClient: false,
  // below are engine.IO options
  pingInterval: 10000,
  pingTimeout: 5000,
  cookie: false
})*/.listen(server);

/*app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:8000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Credentials',true)
  next();
});*/
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); 

app.use(express.static('public'));
app.use(express.static('files'));
app.use('/content', express.static('public'));
app.use('/api', require('./api'));

const PORT=process.env.PORT || 2048;
server.listen(PORT);
console.log('server running on PORT %d...',PORT);

app.get('/',function(req,res) {
	res.sendFile(__dirname+'/index.html');
});

app.get('/bundle',function(req,res) {
	res.sendFile(__dirname+'/src/public/bundle.js');
});

//app.post('/mail', require('./yl-mailer').sendMail);

process.on('uncaughtException', function (error) {
   console.log(error.stack);
});

socketConnections=[];
sqlConnections=[];
onlineClients = {};

io.sockets.on('connection',function(socket) {
	socketConnections.push(socket);
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

	console.log("connected: %s sockets connected",socketConnections.length);
	socket.on('init',function(data) {
		console.log(data,"initted")
		onlineClients[data] = socket.id;
	});

	//NEW PROJECT RELEASE; Mahlekenyane released a new Beauty and Fitness project
	socket.on('projectrelease',function(fromName,fromId,projectId,profile_image) {
		/*nsp.on('connection', function(socket){
		  console.log('someone connected');
		});*/
		console.log("Theres been a project release by ",fromId);
		var sql=`SELECT u.user_id,u.user_username as username,c.category_name,
                    IF(
                    (SELECT COUNT(follow_follower) FROM FOLLOW
                    WHERE FOLLOW.follow_following = u.user_id AND follow_follower= ? ) > 0 ,'true','false'
                    ) as following
					FROM PROJECT_CATEGORY pc
					INNER JOIN USER_CATEGORY uc ON
						pc.category_id=uc.category_id
					INNER JOIN USER u ON
						u.user_id=uc.user_id
					INNER JOIN CATEGORY c ON
						c.category_id=uc.category_id
					WHERE project_id=?`;

		connection.query(sql,[fromId,projectId], function (error, results, fields) {
		  if (error) throw error;
			//console.log("liked "+results.insertId," image: ",profile_image);
			let followersList=[];
			let category_name="";
			for (var i = 0; i < results.length; i++) {
				let toId=results[i].user_id;
				let toName=results[i].username;
				if (results[i].following=="true") {
					followersList.push(toId)
				}

				let message=fromName+" released a new "+category_name+" project";
				let href="view_profile.html?="+fromName;
				var insert_mes={
					notification_from:fromId,
					notification_to:toId,
					notification_message:message,
					notification_href:href,
					notification_type:"projectrelease",
					notification_viewed:0
				}

			  	if(fromName != toName){
					connection.query("INSERT INTO NOTIFICATION SET ?",[insert_mes], function (error, results, fields) {
					  if (error) throw error;
							let id = onlineClients[toId];
							let type="projectrelease";
						    io.to(id).emit(""+toName,type,href,results.insertId,message,profile_image);
						    console.log("BEF EMITTING "+toName)
					  // ...
					});
				}
			}
			//*******Now notify my followers
			//first get category name
			let sql=`SELECT pc.category_id,c.category_name
					FROM PROJECT_CATEGORY pc
					INNER JOIN CATEGORY c ON
						pc.category_id=c.category_id
					WHERE project_id=?`;
			connection.query(sql,[projectId], function (error, results, fields) {
			  if (error) throw error;
				let sql=`SELECT f.follow_follower as user_id, u.user_username as username
							FROM FOLLOW f
							INNER JOIN USER u ON u.user_id=f.follow_follower
							WHERE f.follow_following=?`;

				let category_name=results[0].category_name;

				connection.query(sql,[fromId], function (error, results, fields) {
					if (error) throw error;

					console.log(followersList)
					console.log(results.user_id)
					for (var i = 0; i < results.length; i++) {
						let toId=results[i].user_id;
						let toName=results[i].username;

						let message=fromName+" released a new "+category_name+" project";
						let href="view_profile.html?="+fromName;
						var insert_mes={
							notification_from:fromId,
							notification_to:toId,
							notification_message:message,
							notification_href:href,
							notification_type:"projectrelease",
							notification_viewed:0
						}
						console.log("IYOOOOH "+toName)

						if(followersList.indexOf(toId)==-1){
							connection.query("INSERT INTO NOTIFICATION SET ?",[insert_mes], function (error, results, fields) {
							  if (error) throw error;
							  	if(fromName != toName){
									let id = onlineClients[toId];
									let type="projectrelease";
								    io.to(id).emit(""+toName,type,href,results.insertId,message,profile_image);
								    console.log("EMITTING "+toName)
								}
							  // ...
							});
						}
					}
				});
			});


		  // ...
		});
		/*var id = onlineClients[toId];
	    io.to(id).emit('like',fromName,type,postId);*/
	});

	//NEW LIKE
	socket.on('like',function(fromName,fromId,toId,postId,postType,profile_image) {
		/*nsp.on('connection', function(socket){
		  console.log('someone connected');
		});*/
		//console.log("Theres been a like for",toId);
		var type;
		postType=='audio'?(type='song'):(type=postType)
		let message=fromName+" liked your "+postType;
		let href="post.html?="+postId;
		var insert_mes={
			notification_from:fromId,
			notification_to:toId,
			notification_message:message,
			notification_href:href,
			notification_type:"like",
			notification_viewed:0
		}

		connection.query("INSERT INTO NOTIFICATION SET?",[insert_mes], function (error, results, fields) {
		  if (error) throw error;
			var id = onlineClients[toId];
		    io.to(id).emit('like',fromName,type,href,results.insertId,profile_image);
			//console.log("liked "+results.insertId," image: ",profile_image);
		  // ...
		});
		/*var id = onlineClients[toId];
	    io.to(id).emit('like',fromName,type,postId);*/
	});

	//NEW COMMENT
	socket.on('comment',function(fromName,fromId,toId,postId,postType,profile_image) {
		/*nsp.on('connection', function(socket){
		  console.log('someone connected');
		});*/
		//console.log("Theres been a comment for",toId," image: ",profile_image);
		var type;
		postType=='audio'?(type='song'):(type=postType)
		let message=fromName+" liked your "+postType;
		let href="post.html?="+postId;
		var insert_mes={
			notification_from:fromId,
			notification_to:toId,
			notification_message:message,
			notification_href:href,
			notification_type:"comment",
			notification_viewed:0
		}

		connection.query("INSERT INTO NOTIFICATION SET?",[insert_mes], function (error, results, fields) {
		  if (error) throw error;
			var id = onlineClients[toId];
		    io.to(id).emit('comment',fromName,type,href,results.insertId,profile_image);
		  // ...
		});
		/*var id = onlineClients[toId];
	    io.to(id).emit('comment',fromName,type,postId);*/
	});

	//NEW FOLLOWER
	socket.on('follow',function(fromName,fromId,toId,profile_image) {
		/*nsp.on('connection', function(socket){
		  console.log('someone connected');
		});*/
		//console.log("Theres been a follow for",toId," image: ",profile_image);

		let message=fromName+" started following you ";
		let href="view_profile.html?="+fromName;
		var insert_mes={
			notification_from:fromId,
			notification_to:toId,
			notification_message:message,
			notification_href:href,
			notification_type:"follow",
			notification_viewed:0
		}

		connection.query("INSERT INTO NOTIFICATION SET?",[insert_mes], function (error, results, fields) {
		  if (error) throw error;
			var id = onlineClients[toId];
		    io.to(id).emit('follow',fromName,href,results.insertId,profile_image);
		  // ...
		});
		/*var id = onlineClients[toId];
	    io.to(id).emit('follow',fromName);*/
	});

	//NEW INTEREST
	socket.on('interested',function(fromName,fromId,toId,profile_image) {
		/*nsp.on('connection', function(socket){
		  console.log('someone connected');
		});*/
		//console.log("Theres been a interst for",toId," image: ",profile_image);

		let message=fromName+" is interested in working with you ";
		let href="view_profile.html?="+fromName;
		var insert_mes={
			notification_from:fromId,
			notification_to:toId,
			notification_message:message,
			notification_href:href,
			notification_type:"interest",
			notification_viewed:0
		}

		connection.query("INSERT INTO NOTIFICATION SET?",[insert_mes], function (error, results, fields) {
		  if (error) throw error;
			var id = onlineClients[toId];
		    io.to(id).emit('interested',fromName,href,results.insertId,profile_image);
		  // ...
		});
	});

	//NEW COLLABO REQUEST
	socket.on('createrequestcollabo',function(fromName,fromId,toIdArray,toNamesArray,profile_image) {
		/*nsp.on('connection', function(socket){
		  console.log('someone connected');
		});*/
		connection.query("INSERT INTO COLLABO SET ?",[{user_id:fromId}], function (error, results, fields) {
		  if (error) throw error;
		  let collabId=results.insertId;

			//NOTIFY MYSELF
			let message="You want to collaborate with "+toNamesArray.join();
			let href="[-1,3,"+fromId+"]";
			var insert_mes={
				notification_from:fromId,
				notification_to:fromId,
				notification_message:message,
				notification_href:href,
				notification_type:"collabo",
				notification_viewed:0
			}

			connection.query("INSERT INTO NOTIFICATION SET?",[insert_mes], function (error, results, fields) {
			  if (error) throw error;
			  	console.log("NOTIFIED MYSELF!! "+message)
				var id = onlineClients[fromId];
			    io.to(id).emit('requestcollabo',fromName,href,results.insertId,profile_image,message);
				  // NOTIFY EVERYONE YOU WANT TO FOLLOW

					for (var i = 0; i < toIdArray.length; i++) {
						let toId=toIdArray[i];
						//console.log("Theres been a requestcollabo for",toId," image: ",profile_image);
						connection.query("INSERT INTO ARTIST SET ?",[{user_id:toId,collabo_id:collabId}], function (error, results, fields) {
						  if (error) throw error;

							let message=fromName+" wants to collaborate with you ";
							//for collabos, href's have format [i,j], i ∈ real,j ∈ [0,3]
							//  i=collaboId
							//	j=0 => no action on collab, j=1 =>  collab accepted
							//  j=2 => collab rejected, j=3 =>  collab creator
							let href="["+collabId+",0,"+fromId+"]";
							var insert_mes={
								notification_from:fromId,
								notification_to:toId,
								notification_message:message,
								notification_href:href,
								notification_type:"collabo",
								notification_viewed:0
							}

							connection.query("INSERT INTO NOTIFICATION SET?",[insert_mes], function (error, results, fields) {
							  if (error) throw error;
							  	//console.log("NOTIFIED!!")
								var id = onlineClients[toId];
							    io.to(id).emit('requestcollabo',fromName,href,results.insertId,profile_image,message);
							  // ...
							});
						  // ...
						});
					}
			  // ...
			});
		  // ...
		});
		/*var id = onlineClients[toId];
	    io.to(id).emit('follow',fromName);*/
	});

	//ACCEPT/REJECT COLLABO
		socket.on('acceptcollab',function(fromName,userid,notifid,href,profile_image) {
			// body...
			var sql = "UPDATE NOTIFICATION SET notification_href = '"+href+"' WHERE notification_id ="+notifid;
			connection.query(sql, function (err, result) {
			if (err) throw err;
				console.log("NOTIFICATION: "+result.affectedRows + " record(s) updated");
				let array=JSON.parse(href);
				let collabId=array[0];
				let collabCreatorId=array[2];
				var sql = "UPDATE ARTIST SET artist_approve = 1 WHERE user_id="+userid+" AND collabo_id="+collabId;
				connection.query(sql, function (err, result) {
				if (err) throw err;
					//console.log("ARTIST: "+result.affectedRows + " record(s) updated");
					//DO A CHECK FOR COLLAB RESPONSES THEN NOTIFY ADMIN AND COLLAB CREATOR
					//FIRST, notify collab creator about this response:
						let message=fromName+" accepted your collaboration request";
						let href="[-1,3,-1]";
						var insert_mes={
							notification_from:userid,
							notification_to:collabCreatorId,
							notification_message:message,
							notification_href:href,
							notification_type:"collabo",
							notification_viewed:0
						}

						connection.query("INSERT INTO NOTIFICATION SET ?",[insert_mes], function (error, results, fields) {
						  if (error) throw error;
							var id = onlineClients[collabCreatorId];
						    io.to(id).emit('requestcollabo',fromName,href,results.insertId,profile_image,message);
						  // ...
						});

					//NOW, notify admin about this collab if it all users responded:
					    var sql="SELECT * from ARTIST WHERE collabo_id="+collabId;
						connection.query(sql, function (error, results, fields) {
						  if (error) throw error;
						  	let responses=0;
						  	let responsesLen=results.length;
						  	let collabAllResponded=true;
						  	for (var i = 0; i < results.length; i++) {
						  		responses+=results[i].artist_approve;
						  		if (results[i].artist_approve==0) {

						  			collabAllResponded=false;
						  		}

						  	}
						  	if (collabAllResponded) {
						  		//NOTIFY CREATOR and ADMIN
								var id = onlineClients[collabCreatorId];
								var sql="SELECT user_image from USER WHERE user_id="+collabCreatorId;
								connection.query(sql, function (error, results, fields) {
								  if (error) throw error;
								  const profile_image=results[0].user_image;
								  		var sql="SELECT * from COLLABO WHERE collabo_id="+collabId;
										connection.query(sql, function (error, results, fields) {
										  if (error) throw error;
										   //console.log("COLLABO done response for id:"+collabId+" is: "+results[0].collabo_created)

										   let Months=["January","February","March","April","May","June","July","August","September","October","November","December"];
										   let date_time=""+results[0].collabo_created;
									   	   let date = date_time.split(" ")[1]+" "+date_time.split(" ")[2];

									  		if (responsesLen==responses) {
											    // io.to(id).emit('collabo',fromName,href,results.insertId,profile_image,message);
													let message="All artists accepted the collaboration you requested on "+date+". You'll hear from Youth League soon with more details.";
													let href="[-1,3,-1]";
													var insert_mes={
														notification_from:collabCreatorId,
														notification_to:collabCreatorId,
														notification_message:message,
														notification_href:href,
														notification_type:"collabo",
														notification_viewed:0
													}

													connection.query("INSERT INTO NOTIFICATION SET ?",[insert_mes], function (error, results, fields) {
													  if (error) throw error;
														var id = onlineClients[collabCreatorId];
													    io.to(id).emit('requestcollabo',"fromName",href,results.insertId,profile_image,message);
													  // ...

														/***** NOTIFY ADMIN
														connection.query("INSERT INTO NOTIFICATION SET ?",[insert_mes], function (error, results, fields) {
														  if (error) throw error;
															var id = onlineClients[collabCreatorId];
														    io.to(id).emit('admincollabonotify',"fromName",href,results.insertId,profile_image,message);
														  // ...
														});*****/
													});

									  		} else {
											    // io.to(id).emit('collabo',fromName,href,results.insertId,profile_image,message);
											    	let numRejectors=responses-responsesLen;
													let message="All artists responded to the collaboration you requested on "+date+". "+numRejectors+" artist(s) rejected";
													let href="[-1,3,-1]";
													var insert_mes={
														notification_from:collabCreatorId,
														notification_to:collabCreatorId,
														notification_message:message,
														notification_href:href,
														notification_type:"collabo",
														notification_viewed:0
													}

													connection.query("INSERT INTO NOTIFICATION SET ?",[insert_mes], function (error, results, fields) {
													  if (error) throw error;
														var id = onlineClients[collabCreatorId];
													    io.to(id).emit('requestcollabo',"fromName",href,results.insertId,profile_image,message);
													});
									  		}
									  		connection.query("INSERT INTO ARTIST SET ?",[{user_id:collabCreatorId,collabo_id:collabId,artist_approve:1}], function (error, results, fields) {
											  if (error) throw error;
											});




										});
								});

						  	}


						  // ...
						});
				});
			});
		})
		socket.on('rejectcollab',function(fromName,userid,notifid,href,profile_image) {
			// body...
			var sql = "UPDATE NOTIFICATION SET notification_href = '"+href+"' WHERE notification_id ="+notifid;
			connection.query(sql, function (err, result) {
			if (err) throw err;
				console.log("NOTIFICATION: "+result.affectedRows + " record(s) updated");
				let array=JSON.parse(href);
				let collabId=array[0];
				let collabCreatorId=array[2];
				var sql = "UPDATE ARTIST SET artist_approve = 2 WHERE user_id="+userid+" AND collabo_id="+collabId;
				connection.query(sql, function (err, result) {
				if (err) throw err;
					//console.log("ARTIST: "+result.affectedRows + " record(s) updated");
					//DO A CHECK FOR COLLAB RESPONSES THEN NOTIFY ADMIN AND COLLAB CREATOR
					//FIRST, notify collab creator about this response:
						let message=fromName+" rejected your collaboration request";
						let href="[-1,3,-1]";
						var insert_mes={
							notification_from:userid,
							notification_to:collabCreatorId,
							notification_message:message,
							notification_href:href,
							notification_type:"collabo",
							notification_viewed:0
						}

						connection.query("INSERT INTO NOTIFICATION SET ?",[insert_mes], function (error, results, fields) {
						  if (error) throw error;
							var id = onlineClients[collabCreatorId];
						    io.to(id).emit('requestcollabo',fromName,href,results.insertId,profile_image,message);
						  // ...
						});

					//NOW, notify admin about this collab if it all users responded:
					    var sql="SELECT * from ARTIST WHERE collabo_id="+collabId;
						connection.query(sql, function (error, results, fields) {
						  if (error) throw error;
						  	let responses=0;
						  	let responsesLen=results.length;
						  	let collabAllResponded=true;
						  	for (var i = 0; i < results.length; i++) {
						  		responses+=results[i].artist_approve;
						  		if (results[i].artist_approve==0) {
						  			collabAllResponded=false;
						  		}

						  	}
						  	if (collabAllResponded) {
						  		//NOTIFY CREATOR and ADMIN
								var id = onlineClients[collabCreatorId];
								var sql="SELECT user_image from USER WHERE user_id="+collabCreatorId;
								connection.query(sql, function (error, results, fields) {
								  if (error) throw error;
								  const profile_image=results[0].user_image;
								  		var sql="SELECT * from COLLABO WHERE collabo_id="+collabId;
										connection.query(sql, function (error, results, fields) {
										  if (error) throw error;
										   console.log("COLLABO done response for id:"+collabId+" is: "+results[0].collabo_created)

										   let Months=["January","February","March","April","May","June","July","August","September","October","November","December"];
										   let date_time=""+results[0].collabo_created;
									   	   let date = date_time.split(" ")[1]+" "+date_time.split(" ")[2];//+", "+d.getFullYear();

									  		if (responsesLen==responses) {
											    // io.to(id).emit('collabo',fromName,href,results.insertId,profile_image,message);
													let message="All artists accepted the collaboration you requested on "+date+". You'll hear from Youth League soon with more details.";
													let href="[-1,3,-1]";
													var insert_mes={
														notification_from:collabCreatorId,
														notification_to:collabCreatorId,
														notification_message:message,
														notification_href:href,
														notification_type:"collabo",
														notification_viewed:0
													}

													connection.query("INSERT INTO NOTIFICATION SET ?",[insert_mes], function (error, results, fields) {
													  if (error) throw error;
														var id = onlineClients[collabCreatorId];
													    io.to(id).emit('requestcollabo',"fromName",href,results.insertId,profile_image,message);
													  // ...

														/***** NOTIFY ADMIN
														connection.query("INSERT INTO NOTIFICATION SET ?",[insert_mes], function (error, results, fields) {
														  if (error) throw error;
															var id = onlineClients[collabCreatorId];
														    io.to(id).emit('admincollabonotify',"fromName",href,results.insertId,profile_image,message);
														  // ...
														});*****/
													});

									  		} else {
											    // io.to(id).emit('collabo',fromName,href,results.insertId,profile_image,message);
											    	let numRejectors=responses-responsesLen;
													let message="All artists responded to the collaboration you requested on "+date+". "+numRejectors+" artist(s) rejected";
													let href="[-1,3,-1]";
													var insert_mes={
														notification_from:collabCreatorId,
														notification_to:collabCreatorId,
														notification_message:message,
														notification_href:href,
														notification_type:"collabo",
														notification_viewed:0
													}

													connection.query("INSERT INTO NOTIFICATION SET ?",[insert_mes], function (error, results, fields) {
													  if (error) throw error;
														var id = onlineClients[collabCreatorId];
													    io.to(id).emit('requestcollabo',"fromName",href,results.insertId,profile_image,message);
													});

									  		}
									  		connection.query("INSERT INTO ARTIST SET ?",[{user_id:collabCreatorId,collabo_id:collabId,artist_approve:1}], function (error, results, fields) {
											  if (error) throw error;
											});




										});
								});

						  	}


						  // ...
						});
				});
			});
		})

	//VIEW NOTIFICATION
	socket.on('viewnotification',function(notification_id) {
		//console.log("Theres been a notification viewed "+notification_id);


		var sql = "UPDATE NOTIFICATION SET notification_viewed = 1 WHERE notification_id ="+notification_id;
		connection.query(sql, function (err, result) {
		if (err) throw err;
			//console.log(result.affectedRows + " record(s) updated");
		});
		/*var id = onlineClients[toId];
	    io.to(id).emit('follow',fromName);*/
	});


	//INIT NOTIFICATIONS LIST
	socket.on('initlinenotifications',function(user_id) {
		//console.log("Theres been a notification initline requests from "+user_id);

            var query = `SELECT n.notification_id as id, n.notification_message as message, n.notification_time as date_time, n.notification_href as href, n.notification_type as type, u.user_username as name,
            u.user_image as profile_image
            FROM NOTIFICATION n
            inner JOIN USER u ON n.notification_from = u.user_id
            WHERE n.notification_to=?
            GROUP BY n.notification_id, u.user_username
            ORDER BY n.notification_time DESC
            LIMIT 0, 7`;
		connection.query(query,[user_id], function (err, result) {
		if (err) throw err;
			// console.log(result.affectedRows + " record(s) updated");
			var id = onlineClients[user_id];
			io.to(id).emit('initlinenotifications',result);
		});
		/*var id = onlineClients[toId];
	    io.to(id).emit('follow',fromName);*/
	});


	//INIT NOTIFICATIONS BADGE
	socket.on('initbadgenotifications',function(user_id) {
		//console.log("Theres been a notification initbadge requests from "+user_id);

            var query = `SELECT n.notification_id as id FROM NOTIFICATION n
            WHERE n.notification_to=? AND n.notification_viewed=0`;
		connection.query(query,[user_id], function (err, result) {
		if (err) throw err;
			// console.log(result.affectedRows + " record(s) updated");
			var id = onlineClients[user_id];
			io.to(id).emit('initbadgenotifications',result);
		});
		/*var id = onlineClients[toId];
	    io.to(id).emit('follow',fromName);*/
	});

	//Disconnect
	socket.on('disconnect',function(data) {
		var socketIndex=socketConnections.indexOf(socket);

		socketConnections.splice(socketIndex,1);


		connection.end();
		console.log("Disconnected from %s: %s sockets connected. ",data,socketConnections.length);
	});

});
