<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);
	//if ($_GET){
		include_once '../config/core.php';
		include_once '../config/database.php';

		include_once '../objects/settings.php';

		//class instance
		$database = new Database();
		$db = $database->getConnection();
		$settings = new Settings($db);

		// $settings->id=$_GET['id'];

		//result
		echo $settings->fill_privacy() ? "true" : "false";
	//}
?>