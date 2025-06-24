<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);
if ($_POST){
	include_once '../config/core.php';
	include_once '../config/database.php';

	include_once '../objects/post.php';

	//class instance
	$database = new Database();
	$db = $database->getConnection();
	$post = new POST($db);

	$post->id=$_POST['id'];
	$post->title=$_POST['title'];
	$post->description=$_POST['description'];
	$post->status=$_POST['status'];
	$post->type=$_POST['type'];
	$post->media_url=$_POST['media_url'];
	$post->location=$_POST['location'];
	$post->cover_image=$_POST['cover_image'];
	//$post->categories = array(1, 2);
	$post->categories = $_POST['categories'];

	//$cat = $_POST['category'];

	//$arr = json_decode($cat, true);

	echo $post->create_blog_post();
	//echo "string ". $cat[0]. '-'.$arr[0];
}else{
	echo "Failed";
}
?>