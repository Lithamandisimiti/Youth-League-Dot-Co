<?php
// ini_set('display_errors', 1);
// error_reporting(E_ALL);
class Settings{
    private $conn;

    //object properties
    public $id;
    public $email;
    public $password;
    public $username;
    public $firstname;
    public $lastname;

    public function __construct($db){
        $this->conn = $db;
    }
    public function fill_privacy(){   //MODIFIER
        try{
            $query = "SELECT user_id as id FROM USER";

            // prepare query for execution
            $stmt = $this->conn->prepare($query);

            // sanitize

            // bind the parameters

            // Execute the query
            $stmt->execute();

            $results=$stmt->fetchAll(PDO::FETCH_ASSOC);

            for ($i=0; $i < count($results); $i++) {
                # code...
                $id=$results[$i]['id'];
                $return = $this->conn->prepare("INSERT INTO PRIVACY(user_id) VALUES (".$id.")");
                if($return->execute()){
                	echo "done<br>";
                }else{
                	echo "not done<br>";
                }
            }
            return json_encode($results);
        }

        catch(PDOException $exception){
            die('ERROR: ' . $exception->getMessage());
        }
    }
    public function deactivate_user_account() {
        try{
            $query="UPDATE USER
                SET  user_account_deactivated=1
                WHERE user_id=:id";

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
    public function activate_user_account() {
        try{
            $query="UPDATE USER
                SET  user_account_deactivated=0
                WHERE user_id=:id";

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

    public function get_user_settings() {
        try{
            $query = "SELECT p.user_id as id,p.privacy_posts as posts,p.privacy_details as details,p.privacy_messages as messages, u.user_account_deactivated as account_deactivated
            		FROM PRIVACY p
            		LEFT JOIN USER u ON u.user_id=p.user_id
            		WHERE p.user_id=:id";

            // prepare query for execution
            $stmt = $this->conn->prepare($query);

            // sanitize
            $id=htmlspecialchars(strip_tags($this->id));

            // bind the parameters
            $stmt->bindParam(':id', $id);

            // Execute the query
            $stmt->execute();

            $results=$stmt->fetchAll(PDO::FETCH_ASSOC);
            return json_encode($results);
        }

        catch(PDOException $exception){
            die('ERROR: ' . $exception->getMessage());
        }
    }

    public function reset_password($newPass){
        try{
            $query = "SELECT user_id as id FROM USER WHERE user_id = :id";

            $stmt = $this->conn->prepare($query);

            $id = htmlspecialchars(strip_tags($this->id));
            $newPassSan = htmlspecialchars(strip_tags($newPass));

            $stmt->bindParam(':id',$id);

            $stmt->execute();

            $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
            if(count($results)>0){
                $query = "UPDATE USER SET user_password=:pass WHERE user_id =:id";

                $stmt= $this->conn->prepare($query);
                $stmt->bindParam(':id',$id);
                $stmt->bindParam(':pass',$newPassSan);

                if($stmt->execute()){
                    return true;	
                }else{
                    return false;
                }
            }else{
                return false;
            }
        }
        catch(PDOException $exception){
            die('ERROR: ' . $exception->getMessage());
        }
    }
    public function change_password($oldPass,$newPass) {
        try{
            $query = "SELECT user_id as id FROM USER WHERE user_id=:id AND user_password=:pass";

            // prepare query for execution
            $stmt = $this->conn->prepare($query);

            // sanitize
            $id=htmlspecialchars(strip_tags($this->id));
            $oldPassSan=htmlspecialchars(strip_tags($oldPass));
            $newPassSan=htmlspecialchars(strip_tags($newPass));

            // bind the parameters
            $stmt->bindParam(':id', $id);
            $stmt->bindParam(':pass', $oldPassSan);

            // Execute the query
            $stmt->execute();

            $results=$stmt->fetchAll(PDO::FETCH_ASSOC);
            if(count($results)>0){
                $query="UPDATE USER
                SET  user_password=:pass
                WHERE user_id=:id";

                $stmt = $this->conn->prepare($query);
                $stmt->bindParam(':id', $id);
                $stmt->bindParam(':pass', $newPassSan);

                if($stmt->execute()){
                    return true;
                }else{
                    return false;
                }

            }else{
                return false;

            }

        }

        catch(PDOException $exception){
            die('ERROR: ' . $exception->getMessage());
        }
    }
    public function change_username($username) {
        try{
            $query = "SELECT user_id as id FROM USER WHERE user_username=:username";

            // prepare query for execution
            $stmt = $this->conn->prepare($query);

            // sanitize
            $id=htmlspecialchars(strip_tags($this->id));
            $usernameSan=htmlspecialchars(strip_tags($username));

            // bind the parameters
            $stmt->bindParam(':username', $usernameSan);

            // Execute the query
            $stmt->execute();

            $results=$stmt->fetchAll(PDO::FETCH_ASSOC);
            if(count($results)==0){
                $query="UPDATE USER
                SET  user_username=:username
                WHERE user_id=:id";

                $stmt = $this->conn->prepare($query);
                $stmt->bindParam(':id', $id);
                $stmt->bindParam(':username', $usernameSan);

                if($stmt->execute()){
                    return true;
                }else{
                    return false;
                }

            }else{
                return false;

            }

        }

        catch(PDOException $exception){
            die('ERROR: ' . $exception->getMessage());
        }
    }
    public function change_email($email) {
        try{
            $query = "SELECT user_id as id FROM USER WHERE user_email=:email";

            // prepare query for execution
            $stmt = $this->conn->prepare($query);

            // sanitize
            $id=htmlspecialchars(strip_tags($this->id));
            $emailSan=htmlspecialchars(strip_tags($email));

            // bind the parameters
            $stmt->bindParam(':email', $emailSan);

            // Execute the query
            $stmt->execute();

            $results=$stmt->fetchAll(PDO::FETCH_ASSOC);
            if(count($results)==0){
                $query="UPDATE USER
                SET  user_email=:email
                WHERE user_id=:id";

                $stmt = $this->conn->prepare($query);
                $stmt->bindParam(':id', $id);
                $stmt->bindParam(':email', $emailSan);

                if($stmt->execute()){
                    return true;
                }else{
                    return false;
                }

            }else{
                return false;

            }

        }

        catch(PDOException $exception){
            die('ERROR: ' . $exception->getMessage());
        }
    }
    public function change_details_privacy($change) {
        try{
            $query="UPDATE PRIVACY
                SET  privacy_details=:change
                WHERE user_id=:id";

            // prepare query for execution
            $stmt = $this->conn->prepare($query);

            // sanitize
            $id=htmlspecialchars(strip_tags($this->id));
            $changeSan=htmlspecialchars(strip_tags($change));

            // bind the parameters
            $stmt->bindParam(':id', $id);
            $stmt->bindParam(':change', $changeSan);

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
    public function change_messages_privacy($change) {
        try{
            $query="UPDATE PRIVACY
                SET  privacy_messages=:change
                WHERE user_id=:id";

            // prepare query for execution
            $stmt = $this->conn->prepare($query);

            // sanitize
            $id=htmlspecialchars(strip_tags($this->id));
            $changeSan=htmlspecialchars(strip_tags($change));

            // bind the parameters
            $stmt->bindParam(':id', $id);
            $stmt->bindParam(':change', $changeSan);

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
    public function change_posts_privacy($change) {
        try{
            $query="UPDATE PRIVACY
                SET  privacy_posts=:change
                WHERE user_id=:id";

            // prepare query for execution
            $stmt = $this->conn->prepare($query);

            // sanitize
            $id=htmlspecialchars(strip_tags($this->id));
            $changeSan=htmlspecialchars(strip_tags($change));

            // bind the parameters
            $stmt->bindParam(':id', $id);
            $stmt->bindParam(':change', $changeSan);

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


    public function block($block_id) {
        try{
            $query = "INSERT INTO BLOCK
                SET block_blocker=:id, block_blockee=:block_id";

            // prepare query for execution
            $stmt = $this->conn->prepare($query);

            // sanitize
            $id=htmlspecialchars(strip_tags($this->id));
            $follow_id=htmlspecialchars(strip_tags($block_id));

            // bind the parameters
            $stmt->bindParam(':id', $id);
            $stmt->bindParam(':block_id', $follow_id);

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

    public function unblock($block_id) {
        try{
            $query = "DELETE FROM BLOCK
                WHERE block_blocker=:id AND block_blockee=:block_id";

            // prepare query for execution
            $stmt = $this->conn->prepare($query);

            // sanitize
            $id=htmlspecialchars(strip_tags($this->id));
            $follow_id=htmlspecialchars(strip_tags($block_id));

            // bind the parameters
            $stmt->bindParam(':id', $id);
            $stmt->bindParam(':block_id',$block_id);

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

    public function get_blocked() {

        try{

            $query = "SELECT user_id as id,user_username as username
                        FROM USER
                        INNER JOIN BLOCK ON USER.user_id = BLOCK.block_blockee AND BLOCK.block_blocker=:id
                        ";

            //prepare query for excecution
            $stmt = $this->conn->prepare($query);

            // sanitize
            $id=htmlspecialchars(strip_tags($this->id));

            // bind the parameters
            $stmt->bindParam(':id', $id);

            $stmt->execute();

            $results=$stmt->fetchAll(PDO::FETCH_ASSOC);
            return json_encode($results);
        }

        catch(PDOException $exception){
            die('ERROR: ' . $exception->getMessage());
        }
    }

    public function search_block_users($search) {

        try{


            /*$query = "SELECT user_id as id, user_firstname as firstname, user_lastname as lastname,
                        user_username as username, user_image as image
                        FROM USER
                        WHERE (user_username LIKE CONCAT('%', :search, '%') OR user_firstname LIKE CONCAT('%', :search, '%')
                        OR user_lastname LIKE CONCAT('%', :search, '%'))
                        ORDER BY user_username DESC, user_firstname DESC, user_lastname DESC
                        ";*/

            //prepare query for excecution
            $query="SELECT user_id as id, user_firstname as firstname, user_lastname as lastname,
                        user_username as username, user_image as image
                        FROM USER
	           	 INNER JOIN BLOCK b ON b.block_blockee<>USER.user_id
                        WHERE (user_username LIKE CONCAT('%', :search, '%') OR user_firstname LIKE CONCAT('%', :search, '%')
                        OR user_lastname LIKE CONCAT('%', :search, '%')) AND NOT b.block_blockee=USER.user_id AND NOT USER.user_id=:id
                        ORDER BY user_username DESC, user_firstname DESC, user_lastname DESC
                    ";
            $stmt = $this->conn->prepare($query);

            // sanitize
            $id=htmlspecialchars(strip_tags($this->id));
            $search=htmlspecialchars(strip_tags($search));

            // bind the parameters
            $stmt->bindParam(':id', $id);
            $stmt->bindParam(':search', $search);

            $stmt->execute();

            $results=$stmt->fetchAll(PDO::FETCH_ASSOC);
            return json_encode($results);
            //return $search;
        }

        catch(PDOException $exception){
            die('ERROR: ' . $exception->getMessage());
        }
    }

}
?>
