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
		$user->skill_id=$_POST['skill_id'];
		$user->name=$_POST['name'];

	
		//result
		echo $user->create_skill_set() ? "true" : "false";
	}
?>