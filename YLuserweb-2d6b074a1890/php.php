<?php
	ini_set('display_errors', 1);
	ini_set('display_startup_errors', 1);
	error_reporting(E_ALL);	
$sent = $_GET['source'];
if ($sent != "")
{
    exec("./test '" . $sent. "'",$out);
    print_r($out); 
}
else
    echo "Please enter text";
?>
