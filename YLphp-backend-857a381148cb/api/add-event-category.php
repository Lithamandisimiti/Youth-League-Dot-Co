<?php
	//if the form was submitted
	if ($_POST){
		include_once '../config/core.php';
		include_once '../config/database.php';

		include_once '../objects/user.php';

		//class instance
		$database = new Database();
		$db = $database->getConnection();
		$user = new User($db);

		//register a new user
		$user->event_id=$_POST['event_id'];
		$user->category_id=$_POST['category_id'];
	
		//result
		echo $user->add_event_category() ? "true" : "false";
	}
?>