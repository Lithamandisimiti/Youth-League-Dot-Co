<?php

/*ini_set('display_errors', 1);
error_reporting(E_ALL);*/
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
		// $user->id=$_POST['id'];
		$start=$_POST['collab-id'];
		
	
		//result
		$results = $user->get_collaborations_list($start);
		echo $results;
	}
?>