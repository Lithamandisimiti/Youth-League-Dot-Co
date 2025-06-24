<?php
	if ($_POST){
		include_once '../config/core.php';
		include_once '../config/database.php';

		include_once '../objects/project.php';

		//class instance
		$database = new Database();
		$db = $database->getConnection();
		$project = new Project($db);

		$project->id=$_POST['id'];
		$project->project_id=$_POST['project_id'];

		//result
		$results = $project->get_project_entry();

		echo $results;
	}
?>