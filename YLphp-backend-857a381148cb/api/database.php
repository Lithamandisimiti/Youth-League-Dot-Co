<?php
// ini_set('display_errors', 1);
// error_reporting(E_ALL);
 
	/*$servername = "178.62.217.145";
	$username = "avospace";
	$password = "thenamelesssix";

	/*$servername = "localhost";
	$username = "root";
	$password = "";
	

	try {
	    $conn = new PDO("mysql:host=$servername;", $username, $password);
	    // set the PDO error mode to exception
	    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	    $sql = "DROP DATABASE yl_dev";
	    // use exec() because no results are returned
	    $conn->exec($sql);
	    echo "Database dropped successfully<br>";
	}
	catch(PDOException $e)
	    {
	    echo $sql . "<br>" . $e->getMessage();
	}

	try {
	    $conn = new PDO("mysql:host=$servername;", $username, $password);
	    // set the PDO error mode to exception
	    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	    $sql = "CREATE DATABASE yl_dev";
	    // use exec() because no results are returned
	    $conn->exec($sql);
	    echo "Database created successfully<br>";
	}
	catch(PDOException $e)
	    {
	    echo $sql . "<br>" . $e->getMessage();
	}

	$conn = null;*/


	include_once '../config/core.php';
	include_once '../config/database.php';

	include_once '../objects/schema.php';

	//class instance
	$database = new Database();
	$db = $database->getConnection();
	$schema = new Schema($db);

	//echo $schema->database() ? "true" : "false";
	echo $schema->user() ? "true" : "false";
	echo $schema->skill() ? "true" : "false";
	echo $schema->skill_set() ? "true" : "false";
	echo $schema->user_skill() ? "true" : "false";
	echo $schema->category() ? "true" : "false";
	echo $schema->user_category() ? "true" : "false";
	echo $schema->post() ? "true" : "false";
	echo $schema->media() ? "true" : "false";
	echo $schema->post_category() ? "true" : "false";
	echo $schema->like() ? "true" : "false";
	echo $schema->comment() ? "true" : "false";
	echo $schema->event() ? "true" : "false";
	echo $schema->event_category() ? "true" : "false";
	echo $schema->attend() ? "true" : "false";
	echo $schema->block() ? "true" : "false";
	echo $schema->interested_work() ? "true" : "false";
	echo $schema->follow() ? "true" : "false";
	echo $schema->collabo() ? "true" : "false";
	echo $schema->artist() ? "true" : "false";
	echo $schema->privacy() ? "true" : "false";
	echo $schema->vote() ? "true" : "false";
	echo $schema->project() ? "true" : "false";
	echo $schema->project_category() ? "true" : "false";
	echo $schema->project_entry() ? "true" : "false";
	echo $schema->notification() ? "true" : "false";
	echo $schema->chat() ? "true" : "false";

?>