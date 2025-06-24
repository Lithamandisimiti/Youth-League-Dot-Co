<?php
	if ($_POST){
		include_once '../config/core.php';
		include_once '../config/database.php';

		include_once '../objects/user.php';

		//class instance
		$database = new Database();
		$db = $database->getConnection();
		$user = new User($db);

		$user->id=$_POST['id'];
		$user->follow_id=$_POST['interest_id'];

		//result
		echo $user->uninterest() ? "true" : "false";
	}
?>