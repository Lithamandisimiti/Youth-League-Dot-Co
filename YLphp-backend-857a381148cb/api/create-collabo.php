<?php
// ini_set('display_errors', 1);
// error_reporting(E_ALL);
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
		$user->time_limit=$_POST['time_limit'];
		$user->artists = $_POST['artists'];
	
		//result
		echo $user->create_collabo() ? "true" : "false";
	}
?>