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
		$user->id=$_POST['id'];
		$user->skill_id=$_POST['skill_id'];
		$user->skill_set_id=$_POST['skill_set_id'];

	
		//result
		echo $user->remove_user_skill() ? "true" : "false";
	}
?>