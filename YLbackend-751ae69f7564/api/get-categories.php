<?php
if ($_POST){
	include_once '../config/core.php';
	include_once '../config/database.php';

	include_once '../objects/user.php';

	//class instance
	$database = new Database();
	$db = $database->getConnection();
	$user = new User($db);


	$user->id=$_POST['id'];

	//echo $user->get_category() ? "true" : "false";
	$results = $user->get_category();
	echo $results;
}
?>