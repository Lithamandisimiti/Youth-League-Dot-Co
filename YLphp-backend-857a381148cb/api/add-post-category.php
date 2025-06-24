<?php
	if ($_POST){
		include_once '../config/core.php';
		include_once '../config/database.php';

		include_once '../objects/post.php';

		//class instance
		$database = new Database();
		$db = $database->getConnection();
		$post = new POST($db);

		$post->post_id=$_POST['post_id'];
		$post->category_id=$_POST['category_id'];

		//result
		echo $post->add_post_category() ? "true" : "false";
	}
?>