<?php
    $user_number = $_POST['user-number'];
    
    $jsonFile = file_get_contents("user_tc.json");
    $userList = json_decode($jsonFile, true);
    
    unset($userList[$user_number]);
    
    $newUserList = json_encode($userList);
    file_put_contents("user_tc.json", $newUserList);
    
    echo "true";
?>