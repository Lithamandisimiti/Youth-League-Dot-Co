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
		$from = (int)$_POST['from'];
		$limit = (int)$_POST['limit'];
		
		$results = $project->get_user_projects($from,$limit);

	
		//result
		echo $results;
	}
?>