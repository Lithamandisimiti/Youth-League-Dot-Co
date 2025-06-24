<?php
	//if the form was submitted
	if ($_POST){
		include_once '../config/core.php';
		include_once '../config/database.php';

		include_once '../objects/authenticate.php';

		//class instance
		$database = new Database();
		$db = $database->getConnection();
		$authenticate = new Authenticate($db);

		//authenticate user
		$authenticate->email_username=$_POST['email_username'];
		$authenticate->password=$_POST['password'];
		$results = $authenticate->login();

		//result
		echo $results;
	}
?>