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
		$project->project_id=$_POST['project_id'];
		$project->description=$_POST['description'];
		$project->media_url=$_POST['media_url'];
		$project->entry_type=$_POST['entry_type'];

	
		//result
		echo $project->add_project_entry() ? "true" : "false";
	}
?>