<?php
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
	$post->media_song = $_POST['media_song'];
	$post->media_artists = $_POST['media_artists'];
	$post->media_album =$_POST['media_album'];
	//$post->categories = array(1, 2);
	$post->categories = $_POST['categories'];

	//$cat = $_POST['category'];

	//$arr = json_decode($cat, true);
	$results = $post->create_post();
	
	echo  $results;
	//echo "string ". $cat[0]. '-'.$arr[0];
}
?>