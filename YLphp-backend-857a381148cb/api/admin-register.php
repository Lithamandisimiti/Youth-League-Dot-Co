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

		//register a new user
		$authenticate->id=$_POST['id'];

		//result
		echo $authenticate->register_admin() ? "true" : "false";
	}
?>