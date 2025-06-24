/*Define dependencies.*/
let http = require('http');
let express=require("express");
let fs = require('fs');
let multer  = require('multer');
let app = express();
let im = require('imagemagick');
let ffmpeg = require('fluent-ffmpeg');
let command = ffmpeg();
let request = require('request');


/*const Storage = require('@google-cloud/storage');
const projectId = '563021394432';

// Instantiates a client
const gcs = Storage({
  projectId: projectId
});

// The name for the new bucket
const bucketName = 'avo-insta';
let bucket = gcs.bucket(bucketName);
bucket.upload('public/images/877cd528144029b5309dde1adf6f589a',{destination: 'images/877cd528144029b5309dde1adf6f589a'}, function(err, file) {
        if (!err) {
                console.log('image saved');
                let pub = bucket.file('images/877cd528144029b5309dde1adf6f589a');
                pub.makePublic(function (err) {});
        }else{
                console.log('image not saved');
        }
});*/

let images = multer({ dest: 'public/images' });
let video = multer({ dest: 'public/video' });
let thumbnail = multer({ dest: 'public/thumbnail' });

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.static('public'));
app.use(express.static('files'));
app.use('/content', express.static('public'));

app.get('/', function (req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.send('cds yl server!');
});

function cloudStorage(frompath, topath, res) {
	bucket.upload(frompath,{destination: topath},
	function(err, file) {
        if (!err) {
                res('image saved');
                let pub = bucket.file(topath);
                pub.makePublic(function (err) {});
        }else{
                res('image not saved');
        }
	});
}

function resizeImage(dimensions, frompath, topath, res){
	im.convert([frompath, '-resize', dimensions, topath], 
  	function(err, stdout){
    	if (err) throw err;
    	console.log('stdout:', stdout);
    	res(topath);
  });	
}

function processVideo(frompath, topath, thumbnailpath, res){
	let path = require('path'),
    	pathToFile = path.join(__dirname, 'public/video', frompath),
    	pathToFileVid = path.join(__dirname, 'public/video', topath),
    	pathToSnapshot = path.join(__dirname, 'public/thumbnail', thumbnailpath);

	require('child_process').exec(('ffmpeg -i '+pathToFile+' -vcodec h264 -acodec aac -strict -2 '+pathToFileVid), function() {
	  	console.log('video converted');
        console.log(frompath);
	  	fs.unlink('public/video/'+frompath);
        //require('child_process').exec(('ffmpeg -ss 00:00:01 -i ' + pathToFileVid + ' -vframes 1 -q:v 5' + pathToSnapshot), function () {
	  	require('child_process').exec(('ffmpeg  -itsoffset -4  -i ' + pathToFileVid + ' -vcodec mjpeg -vframes 1 -an -f rawvideo -s 320x180 ' + pathToSnapshot), function () {
	    	console.log('Saved the thumbnail to:', pathToSnapshot);
	    	let from = 'public/thumbnail/'+thumbnailpath;
			  let to = 'thumbnail/'+thumbnailpath;
	    	res('done');
	  	});
	});
}

app.post('/api/upload/thumbnail', thumbnail.single('file'), function(req,res){
    //res.setHeader('Content-Type', 'text/*');
    console.log(req.file);
    let url = "http://avospace.net:3012/content/thumbnail/"+req.file.filename+'.jpg';
  	let from = 'public/thumbnail/'+req.file.filename;
  	let to = 'public/thumbnail/'+req.file.filename+'.jpg';
  	resizeImage('300 x 300',from, to, function(id) {
  		console.log(id);
  		to = 'thumbnail/'+req.file.filename+'.jpg';
          fs.unlink(from);
          res.end(JSON.stringify({thumbnail: url}));
  	});
});

app.post('/api/upload/image', images.single('file'), function(req,res){
	//res.setHeader('Content-Type', 'text/*');
    console.log(req.file);
	let url = "http://avospace.net:3012/content/images/"+req.file.filename+'.jpg';
	let from = 'public/images/'+req.file.filename;
	let to = 'public/images/'+req.file.filename+'.jpg';
	resizeImage('1280 x 720', from, to, function(id) {
		console.log(id);
		to = 'images/'+req.file.filename;
        fs.unlink(from);
        console.log("File uploaded Image.")
        res.end(JSON.stringify({image: url}));
	});
});

app.post('/api/upload/video', video.single('file'), function(req,res){
	//res.setHeader('Content-Type', 'text/*');
    console.log(req.file);
  	let url = "http://avospace.net:3012/content/video/"+req.file.filename+'.mp4';
  	let thumbnail = "http://avospace.net:3012/content/thumbnail/"+req.file.filename+'.jpg';
  	let from = req.file.filename;
  	let to = req.file.filename+'.mp4';
  	let thumb = req.file.filename+'.jpg';
  	console.log(req.file.originalname.slice(-4));
  	if (req.file.mimetype == 'video/mp4' && req.file.originalname.slice(-3) == 'mp4' ){
  		fs.rename(req.file.path, req.file.path+'.mp4', function(err) {
  			if (err) throw err;
  			let path = require('path'),
  			pathToFileVid = path.join(__dirname, 'public/video', req.file.filename+'.mp4'),
    		pathToSnapshot = path.join(__dirname, 'public/thumbnail', req.file.filename+'.jpg');
            //require('child_process').exec(('ffmpeg -ss 00:00:01 -i ' + pathToFileVid + ' -vframes 1 -q:v 15 ' + pathToSnapshot), function () {
  			require('child_process').exec(('ffmpeg  -itsoffset -4  -i ' + pathToFileVid + ' -vcodec mjpeg -vframes 1 -an -f rawvideo -s 320x180 ' + pathToSnapshot), function () {
		    	console.log('Saved the thumbnail to:', pathToSnapshot);
		    	from = 'public/thumbnail/'+thumb;
				to = 'thumbnail/'+thumb;
		  	});
  			console.log('rename complete');
        res.end(JSON.stringify({video: url, thumbnail: thumbnail}));
  		})
  	}else{
  		res.end(JSON.stringify({video: url, thumbnail: thumbnail}));
	  	processVideo(from, to, thumb, function(id) {
	  		console.log(id);
	  	});
	}
});

app.listen(3012,function(){
  console.log("Working on port 3012");
});