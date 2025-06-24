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
		$user->username=$_POST['username'];
		$user->email=$_POST['email'];
		$user->firstname=$_POST['firstname'];
		$user->lastname=$_POST['lastname'];
		$user->dob=$_POST['dob'];
		$user->gender=$_POST['gender'];
		$user->location=$_POST['location'];
		$user->website=$_POST['website'];
		

		//result
		echo $user->update_user_basic() ? "true" : "false";
	}
?>