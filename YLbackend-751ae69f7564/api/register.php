<?php
	//if the form was submitted
/*ini_set('display_errors', 1);
error_reporting(E_ALL);*/
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
		$authenticate->password=$_POST['password'];
		$authenticate->firstname=$_POST['firstname'];
		$authenticate->lastname=$_POST['lastname'];
		$authenticate->dob=$_POST['dob'];

		//result
		//echo $authenticate->register() ? "true" : "false";
		$results = $authenticate->register();
		echo $results;
	}
?>