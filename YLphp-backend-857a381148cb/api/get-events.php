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
		$from = (int)$_POST['from'];
		$limit = (int)$_POST['limit'];
	
		//result
		$results = $user->get_events($from, $limit);
		echo $results;
	}
?>