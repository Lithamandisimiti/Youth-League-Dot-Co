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
	$from = (int)$_POST['from'];
	$limit = (int)$_POST['limit'];
		
	$results = $post->get_videos($from,$limit);
	//$results = $post->get_videos();

	echo $results;
}
?>