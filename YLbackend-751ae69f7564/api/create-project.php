<?php
	//if the form was submitted
	if ($_POST){
		include_once '../config/core.php';
		include_once '../config/database.php';

		include_once '../objects/project.php';

		//class instance
		$database = new Database();
		$db = $database->getConnection();
		$project = new Project($db);

		//register a new user
		$project->id=$_POST['id'];
		$project->title=$_POST['title'];
		$project->description=$_POST['description'];
		$project->image=$_POST['image'];

	
		//result
		echo $project->create_project();// ? "true" : "false";
	}
?>