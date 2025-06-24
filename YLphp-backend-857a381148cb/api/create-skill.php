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
		$user->name=$_POST['name'];
		$user->image=$_POST['image'];

	
		//result
		echo $user->create_skill() ? "true" : "false";
	}
?>