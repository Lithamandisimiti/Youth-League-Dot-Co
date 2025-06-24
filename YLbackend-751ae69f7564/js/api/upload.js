//api/upload/upload.js
let express=require("express");
let fs = require('fs');
let multer  = require('multer');
let im = require('imagemagick');
let ffmpeg = require('fluent-ffmpeg');
let command = ffmpeg();
let request = require('request');

var router = express.Router();

let images = multer({ dest: './public/images' });
let video = multer({ dest: './public/video' });
let thumbnail = multer({ dest: './public/thumbnail' });
let audio = multer({dest: './public/audio'});

router.use(express.static('public'));
router.use(express.static('files'));

router.get('/', function (req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.send('YL file uploader is online!');
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
    	pathToFile = path.join(__dirname, '../public/video', frompath),
    	pathToFileVid = path.join(__dirname, '../public/video', topath),
    	pathToSnapshot = path.join(__dirname, '../public/thumbnail', thumbnailpath);

	require('child_process').exec(('ffmpeg -i '+pathToFile+' -vcodec h264 -acodec aac -strict -2 '+pathToFileVid), function() {
	  	console.log('video converted');
        console.log(frompath);
	  	fs.unlink('./public/video/'+frompath);
        //require('child_process').exec(('ffmpeg -ss 00:00:01 -i ' + pathToFileVid + ' -vframes 1 -q:v 5' + pathToSnapshot), function () {
	  	require('child_process').exec(('ffmpeg  -itsoffset -4  -i ' + pathToFileVid + ' -vcodec mjpeg -vframes 1 -an -f rawvideo -s 320x180 ' + pathToSnapshot), function () {
	    	console.log('Saved the thumbnail to:', pathToSnapshot);
	    	let from = './public/thumbnail/'+thumbnailpath;
			  let to = 'thumbnail/'+thumbnailpath;
	    	res('done');
	  	});
	});
}

function processAudio(frompath, topath, res){
  let path = require('path'),
      pathToFile = path.join(__dirname, '../public/audio', frompath),
      pathToFileAudio = path.join(__dirname, '../public/audio',topath);
      //pathToSnapshot = path.join(__dirname, './public/thumbnail', thumbnailpath);
      console.log(path);

  require('child_process').exec(('ffmpeg -i '+pathToFile+' -vn -ar 44100 -ac 2 -ab 192k -f mp3 '+pathToFileAudio), function(err) {
      console.log('audio converted');
      console.log(err);
      fs.unlink('./public/audio/'+frompath);
      res('done');
  });
}

router.post('/thumbnail', thumbnail.single('file'), function(req,res){
    //res.setHeader('Content-Type', 'text/*');
    console.log('file = ' + req.file);
    console.log(req.body);
    let url = "https://youthleague.co:2048/content/thumbnail/"+req.file.filename+'.jpg';
    //let url = "http://localhost:2048/content/thumbnail/"+req.file.filename+'.jpg';
  	let from = './public/thumbnail/'+req.file.filename;
  	let to = './public/thumbnail/'+req.file.filename+'.jpg';
  	resizeImage('300 x 300',from, to, function(id) {
  		console.log(id);
  		to = 'thumbnail/'+req.file.filename+'.jpg';
          fs.unlink(from);
          res.end(JSON.stringify({
            status: 'success',
            thumbnail: url
          }));
  	});
});

router.post('/image', images.single('file'), function(req,res){
	//res.setHeader('Content-Type', 'text/*');
    console.log(req.file);
	let url = "https://youthleague.co:2048/content/images/"+req.file.filename+'.jpg';
  //let url = "http://localhost:2048/content/images/"+req.file.filename+'.jpg';
	let from = './public/images/'+req.file.filename;
	let to = './public/images/'+req.file.filename+'.jpg';
	resizeImage('1280 x 720', from, to, function(id) {
		console.log(id);
		to = 'images/'+req.file.filename;
        fs.unlink(from);
        console.log("File uploaded Image.")
        res.end(JSON.stringify({
          status: 'success',
          image: url}));
	});
});

router.post('/video', video.single('file'), function(req,res){
	//res.setHeader('Content-Type', 'text/*');
    console.log(req.file);
  	let url = "https://youthleague.co:2048/content/video/"+req.file.filename+'.mp4';
    //let url = "http://localhost:2048/content/video/"+req.file.filename+'.mp4';
  	let thumbnail = "https://youthleague.co:2048/content/thumbnail/"+req.file.filename+'.jpg';
    //let thumbnail = "http://localhost:2048/content/thumbnail/"+req.file.filename+'.jpg';
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
		    	from = './public/thumbnail/'+thumb;
				to = 'thumbnail/'+thumb;
		  	});
  			console.log('rename complete');
        res.end(JSON.stringify({
          status: 'success',
          video: url, 
          thumbnail: thumbnail}));
  		})
  	}else{
  		res.end(JSON.stringify({status: 'success',video: url, thumbnail: thumbnail}));
	  	processVideo(from, to, thumb, function(id) {
	  		console.log(id);
	  	});
	}
});

router.post('/audio', audio.single('file'), function(req,res){
    //res.setHeader('Content-Type', 'text/*');
    console.log('file = ' + req.file);
   // console.log('request = ' + req.body);
      //res.setHeader('Content-Type', 'text/*');
    console.log(req.file);
    let url = "https://youthleague.co:2048/content/audio/"+req.file.filename+'.mp3';
    //let url = "http://localhost:2048/content/audio/"+req.file.filename+'.mp3';
    let from = req.file.filename;
    let to = req.file.filename+'.mp3';

    
    processAudio(from, to, function(resp) {
        console.log(resp);
        
      });
      res.end(JSON.stringify({
          status: 'success',
          audio: url}));
    
});

module.exports = router;
