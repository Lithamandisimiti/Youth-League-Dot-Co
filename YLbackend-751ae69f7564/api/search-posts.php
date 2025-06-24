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
		$post->search=$_POST['search'];

		$results = $post->search_posts();

		echo $results;
	}
?>