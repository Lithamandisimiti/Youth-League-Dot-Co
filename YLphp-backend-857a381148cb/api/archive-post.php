<?php
	//if the form was submitted
	if ($_POST){
		include_once '../config/core.php';
		include_once '../config/database.php';

		include_once '../objects/post.php';

		//class instance
		$database = new Database();
		$db = $database->getConnection();
		$post = new POST($db);

		//register a new user
		$post->id=$_POST['id'];
		$post->post_id=$_POST['post_id'];

	
		//result
		echo $post->archive_post() ? "true" : "false";
	}
?>