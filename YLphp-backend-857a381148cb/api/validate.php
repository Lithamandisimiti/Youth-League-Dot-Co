<?php
	if ($_POST){
		include_once '../config/core.php';
		include_once '../config/database.php';

		include_once '../objects/authenticate.php';

		//class instance
		$database = new Database();
		$db = $database->getConnection();
		$authenticate = new Authenticate($db);

		//register a new user
		$authenticate->email=$_POST['email'];
		$authenticate->username=$_POST['username'];

		//result
		//echo $authenticate->register() ? "true" : "false";
		$results = $authenticate->validate();
		echo $results;
	}
?>