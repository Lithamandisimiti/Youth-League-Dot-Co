<?php
// ini_set('display_errors', 1);
// error_reporting(E_ALL);
	if ($_POST){
		include_once '../config/core.php';
		include_once '../config/database.php';

		include_once '../objects/settings.php';

		//class instance
		$database = new Database();
		$db = $database->getConnection();
		$settings = new Settings($db);

		$settings->id=$_POST['id'];
		$search=$_POST['search'];

		//result
		$results = $settings->search_block_users($search);

		echo $results;
	}
?>