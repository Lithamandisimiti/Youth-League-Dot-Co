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
		$user->venue=$_POST['venue'];
		$user->date_time=$_POST['date_time'];
		$user->image=$_POST['image'];
		$user->categories = $_POST['categories'];

	
		//result
		echo $user->create_event() ? "true" : "false";
	}
?>