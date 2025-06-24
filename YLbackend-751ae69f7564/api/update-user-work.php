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
		$user->work_organization=$_POST['work_organization'];
		$user->work_position=$_POST['work_position'];
		$user->work_location=$_POST['work_location'];
		$user->work_description=$_POST['work_description'];

		//result
		echo $user->update_user_work() ? "true" : "false";
	}
?>