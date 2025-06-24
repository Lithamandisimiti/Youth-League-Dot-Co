<?php
	if ($_POST){
		include_once '../config/core.php';
		include_once '../config/database.php';

		include_once '../objects/settings.php';

		//class instance
		$database = new Database();
		$db = $database->getConnection();
		$settings = new Settings($db);

		$settings->id=$_POST['id'];
		$blockee_id=$_POST['block_id'];

		//result
		echo $settings->block($blockee_id) ? "true" : "false";
	}
?>