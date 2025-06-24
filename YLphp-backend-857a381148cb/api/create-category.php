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
	$user->name=$_POST['name'];
	$user->description=$_POST['description'];
	$user->image=$_POST['image'];

	echo $user->create_category() ? "true" : "false";
}
?>