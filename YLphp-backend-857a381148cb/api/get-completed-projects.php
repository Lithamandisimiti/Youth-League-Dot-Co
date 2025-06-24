<?php
	//if the form was submitted
	//echo "YO ".$_GET['id'];
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
		$creator_id=$_POST['creator_id'];

	
		//result
		echo $project->get_completed_projects($creator_id);
	}
?>