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
		$post->username=$_POST['username'];
		$from = (int)$_POST['from'];
		$limit = (int)$_POST['limit'];

		$results = $post->get_user_blogs($from, $limit);

		echo $results;
	}
?>