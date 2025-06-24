<?php
 //   header('Access-Control-Allow-Origin: *');
ini_set('display_errors', 1);
error_reporting(E_ALL);
session_start();
$session_id='1'; 
$path = "media/profiles/";
$valid_formats = array("jpg", "png", "gif", "bmp","jpeg","JPG","JPEG","BMP","GIF");
if(isset($_POST) and $_SERVER['REQUEST_METHOD'] == "POST")
{
    $data = $_POST["profile_pic_input"];
    $user = $_POST["profile_pic_user"];
    if ($data) {
        list($type, $data) = explode(';', $data);
        list(, $data)      = explode(',', $data);
        $data = base64_decode($data);

        if(file_put_contents($path.$user.'.png', $data)){
            echo "true";
        }else{
            echo "false";
        }
    }else{
        echo "no data";
    }

}
      
?>