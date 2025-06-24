<?php
// ini_set('display_errors', 1);
// error_reporting(E_ALL);
class Authenticate{
    private $conn;

    //object properties
    public $email;
    public $password;
    public $username;
    public $firstname;
    public $lastname;
    public $dob;
    public $gender;
    public $email_username; 

    public function __construct($db){
        $this->conn = $db;
    }

    public function register(){
        try{

            $queryUsername = "SELECT user_id as id FROM USER 
            WHERE user_username=:username ";

            //prepare query for excecution
            $stmtUsername = $this->conn->prepare($queryUsername);

            // sanitize
            $email=htmlspecialchars(strip_tags($this->email));
            $username=htmlspecialchars(strip_tags($this->username));

            // bind the parameters
            $stmtUsername->bindParam(':username', $username);

            $stmtUsername->execute();
            

            $resultsUsername=$stmtUsername->fetchAll(PDO::FETCH_ASSOC);
            if (count($resultsUsername)==0) {
                $queryEmail = "SELECT user_id as id FROM USER 
                WHERE user_email=:email ";

                //prepare query for excecution
                $stmtEmail = $this->conn->prepare($queryEmail);

                // bind the parameters
                $stmtEmail->bindParam(':email', $email);

                $stmtEmail->execute();
                $resultsEmail=$stmtEmail->fetchAll(PDO::FETCH_ASSOC);

                if (count($resultsEmail)==0) {
                    $query = "
                    INSERT INTO USER 
                    SET user_email=:email, user_password=:password, user_username=:username, user_image='https://youthleague.co/images/user.png', user_firstname=:firstname, 
                    user_lastname=:lastname, user_dob=:dob;
                    ";
         
                    // prepare query for execution
                    $stmt = $this->conn->prepare($query);
         
                    // sanitize
                    $password=htmlspecialchars(strip_tags($this->password));
                    $firstname=htmlspecialchars(strip_tags($this->firstname));
                    $lastname=htmlspecialchars(strip_tags($this->lastname));
                    $dob=htmlspecialchars(strip_tags($this->dob));
                    
                    // bind the parameters
                    $stmt->bindParam(':email', $email);
                    $stmt->bindParam(':password', $password);
                    $stmt->bindParam(':username', $username);
                    $stmt->bindParam(':firstname', $firstname);
                    $stmt->bindParam(':lastname', $lastname);
                    $stmt->bindParam(':dob', $dob);
         
                    // Execute the query
                    if($stmt->execute()){
                        //return true;
                        $lastid = $this->conn->lastInsertId();
                        $return = $this->conn->prepare(
                            "SELECT user_id as id, user_username as username FROM USER WHERE user_id='$lastid';
                             INSERT INTO PRIVACY(user_id) VALUES (".$lastid.")"
                        );
                        $return->execute();
                        $results=$return->fetchAll(PDO::FETCH_ASSOC);
                        $results["0"]["status"]="success";
                        $results["0"]["msg"]="User successfully registered";
                        return json_encode($results);
                    }else{
                        $errObj["status"]="error";
                        $errObj["msg"]="Insertion error";
                        return json_encode($errObj);
                    }
                }else{               
                    $errObj["status"]="error";
                    $errObj["msg"]="Email already taken";
                    return json_encode($errObj);
                }
            }else{
                $errObj["status"]="error";
                $errObj["msg"]="Username already taken";
                return json_encode($errObj);
            }
            
        }

        catch(PDOException $exception){
            die('ERROR: ' . $exception->getMessage());
        }
    }

    public function validate(){
        try{

            $queryUsername = "SELECT user_id as id FROM USER 
            WHERE user_username=:username ";

            //prepare query for excecution
            $stmtUsername = $this->conn->prepare($queryUsername);

            // sanitize
            $email=htmlspecialchars(strip_tags($this->email));
            $username=htmlspecialchars(strip_tags($this->username));

            // bind the parameters
            $stmtUsername->bindParam(':username', $username);

            $stmtUsername->execute();
            

            $resultsUsername=$stmtUsername->fetchAll(PDO::FETCH_ASSOC);
            if (count($resultsUsername)==0) {
                $queryEmail = "SELECT user_id as id FROM USER 
                WHERE user_email=:email ";

                //prepare query for excecution
                $stmtEmail = $this->conn->prepare($queryEmail);

                // bind the parameters
                $stmtEmail->bindParam(':email', $email);

                $stmtEmail->execute();
                $resultsEmail=$stmtEmail->fetchAll(PDO::FETCH_ASSOC);

                if (count($resultsEmail)==0) {
                    $result["status"] = "success";
                    $result["msg"] = "Proceed with account creation";
                    return json_encode($result);
                }else{
                $errObj["status"]="error";
                $errObj["msg"]="Email already taken";
                return json_encode($errObj);
                }
            }else{
                $errObj["status"]="error";
                $errObj["msg"]="Username already taken";
                return json_encode($errObj);
            }
            
        }catch(PDOException $exception){
            die('ERROR: ' . $exception->getMessage());
        }
    }

    public function register_admin(){
        try{
            $query = "UPDATE USER
                SET user_admin=:id WHERE user_id=:id";
 
            // prepare query for execution
            $stmt = $this->conn->prepare($query);
 
            // sanitize
            $id=htmlspecialchars(strip_tags($this->id));
            
            // bind the parameters
            $stmt->bindParam(':id', $id);
 
            // Execute the query
            if($stmt->execute()){
                return true;
            }else{
                return false;
            }
        }

        catch(PDOException $exception){
            die('ERROR: ' . $exception->getMessage());
        }
    }

    public function login(){
        try{
            $query = "SELECT user_id as id, user_username as username, user_image as image FROM USER 
            WHERE (user_email=:email_username OR user_username=:email_username) AND (user_password=BINARY :password) ";

            //prepare query for excecution
            $stmt = $this->conn->prepare($query);

            // sanitize
            $email_username=htmlspecialchars(strip_tags($this->email_username));
            $password=htmlspecialchars(strip_tags($this->password));

            // bind the parameters
            $stmt->bindParam(':email_username', $email_username);
            $stmt->bindParam(':password', $password);

            $stmt->execute();

            $results=$stmt->fetchAll(PDO::FETCH_ASSOC);
            return json_encode($results);
        }

        catch(PDOException $exception){
            die('ERROR: ' . $exception->getMessage());
        }
    }    
}
?>