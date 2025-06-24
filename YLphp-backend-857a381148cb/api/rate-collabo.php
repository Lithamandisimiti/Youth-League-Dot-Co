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
		$user->collabo_id=$_POST['collabo_id'];
		$user->rating=$_POST['rating'];
	
		//result
		echo $user->rate_collabo() ? "true" : "false";
	}
?>