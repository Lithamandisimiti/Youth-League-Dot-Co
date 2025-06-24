<?php

	ini_set('display_errors', 1);
	ini_set('display_startup_errors', 1);
	error_reporting(E_ALL);	


	$target_dir = "./uploads/";
	$hostname = gethostbyname(gethostname());
	$sourcePath = $_FILES['file']['tmp_name'];
	if(!file_exists($sourcePath) || !is_uploaded_file($sourcePath)) {
    	echo 'No upload';
	}else{
		//$temp = explode(".", $_FILES["file"]["name"]);
		//$newfilename = round(time(true)) . '.' . end($temp);
		$rand = rand(10000000, 999999999);
		$time - microtime();
		$filename = $rand.$time.$_FILES["file"]["name"];
		$targetPath = $target_dir.basename($filename);
		$FileType = pathinfo($targetPath,PATHINFO_EXTENSION);
		move_uploaded_file($sourcePath, $targetPath);
		$targetPath = "http://".'avospace.net/'.$targetPath;
		print ($targetPath);
	}

	header('Access-Control-Allow-Origin: *');
?>
