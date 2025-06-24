<?php

	ini_set('display_errors', 0);
	ini_set('display_startup_errors', 0);
// 	error_reporting(E_ALL);	

    if($_POST['folder']=="projects"){
        $target_dir = "media/projects/";   
    }else if($_POST['folder']=="uploads"){
        $target_dir = "media/uploads/";
    }
	$hostname = gethostbyname(gethostname());
	$sourcePath = $_FILES['file']['tmp_name'];
	if(!file_exists($sourcePath) || !is_uploaded_file($sourcePath)) {
    	echo 'No uploads';
	}else{
		//$temp = explode(".", $_FILES["file"]["name"]);
		//$newfilename = round(time(true)) . '.' . end($temp);
		$rand = rand(10000000, 999999999);
		$time = date().time();
		$filename = $rand.$time.$_FILES["file"]["name"];
		$targetPath = $target_dir.basename($filename);
		$FileType = pathinfo($targetPath,PATHINFO_EXTENSION);
		if(move_uploaded_file($sourcePath, $targetPath)){
			$targetPath = "http://".'beta.youthleague.co/'.$targetPath;
			echo ($targetPath);
		}else{
			echo "No upload";
		}
	}

	header('Access-Control-Allow-Origin: *');
?>
