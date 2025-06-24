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
		$project->project_id=$_POST['project_id'];
		$category_id=$_POST['category_id'];
	
		//result
		echo $project->add_project_category($category_id) ? "true" : "false";
	}
?>