<?php
	//if the form was submitted
	if ($_POST){
		include_once '../config/core.php';
		include_once '../config/database.php';

		include_once '../objects/settings.php';

		//class instance
		$database = new Database();
		$db = $database->getConnection();
		$settings = new Settings($db);

		//authenticate user
		$settings->id=$_POST['id'];
		$results = $settings->get_blocked();

		//result
		echo $results;
	}
?>