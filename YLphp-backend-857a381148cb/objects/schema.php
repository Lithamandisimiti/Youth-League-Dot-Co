<?php
// ini_set('display_errors', 1);
// error_reporting(E_ALL);
class Schema{
	private $conn;

	public function __construct($db){
        $this->conn = $db;
    }

    public function database() {
        try{
            $query = "CREATE DATABASE yl_dev";

            //prepare query for execution
            $stmt = $this->conn->prepare($query);

            //Execute the query
            if($stmt->execute()){
                return true;
            }else{
                return false;
            }
        }

        catch(PDOException $exception){
            die('ERROR' . $exception->getMessage());
            return $query . "<br>" . $exception->getMessage();
        }
    }

    public function user() {
        try{
            $query = "CREATE TABLE USER (
            user_id INT AUTO_INCREMENT PRIMARY KEY,
            user_email VARCHAR(255) UNIQUE,
            user_username VARCHAR(255) UNIQUE,
            user_password VARCHAR(255),
            user_firstname VARCHAR(255),
            user_lastname VARCHAR(255),
            user_gender VARCHAR(255),
            user_dob DATE,
            user_bio TEXT,
            user_location VARCHAR(255),
            user_image TEXT,
            user_work_organization VARCHAR(255),
            user_work_position VARCHAR(255),
            user_work_location VARCHAR(255),
            user_work_description VARCHAR(255),
            user_admin INT,
            user_registered TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            user_account_deactivated INT DEFAULT 0,
            FOREIGN KEY(user_admin) REFERENCES USER (user_id)
            )";

            //prepare query for execution
            $stmt = $this->conn->prepare($query);

            //Execute the query
            if($stmt->execute()){
                return true;
            }else{
                return false;
            }
        }

        catch(PDOException $exception){
            die('ERROR' . $exception->getMessage());
            return $query . "<br>" . $exception->getMessage();
        }
    }

    public function skill() {
        try{
            $query = "CREATE TABLE SKILL (
            skill_id INT AUTO_INCREMENT PRIMARY KEY,
            user_admin INT,
            skill_name VARCHAR(255),
            skill_image TEXT,
            FOREIGN KEY(user_admin) REFERENCES USER (user_admin)
            )";

            //prepare query for execution
            $stmt = $this->conn->prepare($query);

            //Execute the query
            if($stmt->execute()){
                return true;
            }else{
                return false;
            }
        }

        catch(PDOException $exception){
            die('ERROR' . $exception->getMessage());
            return $query . "<br>" . $exception->getMessage();
        }
    }

    public function skill_set() {
        try{
            $query = "CREATE TABLE SKILL_SET (
            skill_set_id INT AUTO_INCREMENT PRIMARY KEY,
            skill_id INT,
            skill_set_name VARCHAR(255),
            FOREIGN KEY(skill_id) REFERENCES SKILL (skill_id)
            )";

            //prepare query for execution
            $stmt = $this->conn->prepare($query);

            //Execute the query
            if($stmt->execute()){
                return true;
            }else{
                return false;
            }
        }

        catch(PDOException $exception){
            die('ERROR' . $exception->getMessage());
            return $query . "<br>" . $exception->getMessage();
        }
    }

    public function user_skill() {
        try{
            $query = "CREATE TABLE USER_SKILL (
            user_id INT,
            skill_id INT,
            skill_set_id INT,
            PRIMARY KEY(user_id, skill_id, skill_set_id),
            FOREIGN KEY(user_id) REFERENCES USER (user_id),
            FOREIGN KEY(skill_id) REFERENCES SKILL (skill_id),
            FOREIGN KEY(skill_set_id) REFERENCES SKILL_SET (skill_set_id)
            )";

            //prepare query for execution
            $stmt = $this->conn->prepare($query);

            //Execute the query
            if($stmt->execute()){
                return true;
            }else{
                return false;
            }
        }

        catch(PDOException $exception){
            die('ERROR' . $exception->getMessage());
            return $query . "<br>" . $exception->getMessage();
        }
    }

    public function category() {
        try{
            $query = "CREATE TABLE CATEGORY (
            category_id INT AUTO_INCREMENT PRIMARY KEY,
            user_admin INT,
            category_name VARCHAR(255),
            category_image TEXT,
            category_description TEXT,
            category_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY(user_admin) REFERENCES USER (user_admin)
            )";

            //prepare query for execution
            $stmt = $this->conn->prepare($query);

            //Execute the query
            if($stmt->execute()){
                return true;
            }else{
                return false;
            }
        }

        catch(PDOException $exception){
            die('ERROR' . $exception->getMessage());
            return $query . "<br>" . $exception->getMessage();
        }
    }

    public function user_category() {
        try{
            $query = "CREATE TABLE USER_CATEGORY (
            user_id INT,
            category_id INT,
            PRIMARY KEY(user_id, category_id),
            FOREIGN KEY(user_id) REFERENCES USER (user_id),
            FOREIGN KEY(category_id) REFERENCES CATEGORY (category_id)
            )";

            //prepare query for execution
            $stmt = $this->conn->prepare($query);

            //Execute the query
            if($stmt->execute()){
                return true;
            }else{
                return false;
            }
        }

        catch(PDOException $exception){
            die('ERROR' . $exception->getMessage());
            return $query . "<br>" . $exception->getMessage();
        }
    }

    public function post() {
        try{
            $query = "CREATE TABLE POST (
            post_id INT AUTO_INCREMENT PRIMARY KEY,
            user_id INT,
            post_title VARCHAR(255),
            post_description TEXT,
            post_status VARCHAR(255),
            post_type VARCHAR(255),
            post_cover_image TEXT,
            post_location VARCHAR(255),
            post_archive BOOLEAN DEFAULT false,
            post_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY(user_id) REFERENCES USER (user_id)
            )";

            //prepare query for execution
            $stmt = $this->conn->prepare($query);

            //Execute the query
            if($stmt->execute()){
                return true;
            }else{
                return false;
            }
        }

        catch(PDOException $exception){
            die('ERROR' . $exception->getMessage());
            return $query . "<br>" . $exception->getMessage();
        }
    }

    public function media() {
        try{
            $query = "CREATE TABLE MEDIA (
            media_id INT AUTO_INCREMENT PRIMARY KEY,
            post_id INT,
            media_url TEXT,
            FOREIGN KEY(post_id) REFERENCES POST (post_id)
            )";

            //prepare query for execution
            $stmt = $this->conn->prepare($query);

            //Execute the query
            if($stmt->execute()){
                return true;
            }else{
                return false;
            }
        }

        catch(PDOException $exception){
            die('ERROR' . $exception->getMessage());
            return $query . "<br>" . $exception->getMessage();
        }
    }

    public function post_category() {
        try{
            $query = "CREATE TABLE POST_CATEGORY (
            post_id INT,
            category_id INT,
            PRIMARY KEY(post_id, category_id),
            FOREIGN KEY(post_id) REFERENCES POST (post_id),
            FOREIGN KEY(category_id) REFERENCES CATEGORY (category_id)
            )";

            //prepare query for execution
            $stmt = $this->conn->prepare($query);

            //Execute the query
            if($stmt->execute()){
                return true;
            }else{
                return false;
            }
        }

        catch(PDOException $exception){
            die('ERROR' . $exception->getMessage());
            return $query . "<br>" . $exception->getMessage();
        }
    }

    public function like() {
        try{
            $query = "CREATE TABLE LIKES (
            liked_post INT,
            like_by INT,
            like_date_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY(liked_post, like_by),
            FOREIGN KEY (like_by) REFERENCES USER (user_id),
            FOREIGN KEY (liked_post) REFERENCES POST (post_id)
            )";

            //prepare query for execution
            $stmt = $this->conn->prepare($query);

            //Execute the query
            if($stmt->execute()){
                return true;
            }else{
                return false;
            }
        }

        catch(PDOException $exception){
            die('ERROR' . $exception->getMessage());
            return $query . "<br>" . $exception->getMessage();
        }
    }    

    public function comment() {
        try{
            $query = "CREATE TABLE COMMENT (
            comment_id INT AUTO_INCREMENT PRIMARY KEY,
            user_id INT,
            post_id INT,
            comment_text TEXT,
            comment_date_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY(user_id) REFERENCES USER (user_id),
            FOREIGN KEY (post_id) REFERENCES POST (post_id)
            )";

            //prepare query for execution
            $stmt = $this->conn->prepare($query);

            //Execute the query
            if($stmt->execute()){
                return true;
            }else{
                return false;
            }
        }

        catch(PDOException $exception){
            die('ERROR' . $exception->getMessage());
            return $query . "<br>" . $exception->getMessage();
        }
    } 

    public function event() {
        try{
            $query = "CREATE TABLE EVENT (
            event_id INT AUTO_INCREMENT PRIMARY KEY,
            user_id INT,
            event_image VARCHAR(255),
            event_name VARCHAR(255),
            event_venue VARCHAR(255),
            event_date_time DATETIME,
            event_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            event_archive BOOLEAN DEFAULT false,
            FOREIGN KEY(user_id) REFERENCES USER (user_id)
            )";

            //prepare query for execution
            $stmt = $this->conn->prepare($query);

            //Execute the query
            if($stmt->execute()){
                return true;
            }else{
                return false;
            }
        }

        catch(PDOException $exception){
            die('ERROR' . $exception->getMessage());
            return $query . "<br>" . $exception->getMessage();
        }
    } 

    public function event_category() {
        try{
            $query = "CREATE TABLE EVENT_CATEGORY (
            event_id INT,
            category_id INT,
            PRIMARY KEY(event_id, category_id),
            FOREIGN KEY(event_id) REFERENCES EVENT (event_id),
            FOREIGN KEY(category_id) REFERENCES CATEGORY (category_id)
            )";

            //prepare query for execution
            $stmt = $this->conn->prepare($query);

            //Execute the query
            if($stmt->execute()){
                return true;
            }else{
                return false;
            }
        }

        catch(PDOException $exception){
            die('ERROR' . $exception->getMessage());
            return $query . "<br>" . $exception->getMessage();
        }
    }


    /*attend_id INT AUTO_INCREMENT PRIMARY KEY,*/
    public function attend() {
        try{
            $query = "CREATE TABLE ATTEND (
            user_id INT,
            event_id INT,
            attend_status VARCHAR(255),
            PRIMARY KEY(user_id, event_id),
            FOREIGN KEY(user_id) REFERENCES USER (user_id),
            FOREIGN KEY(event_id) REFERENCES EVENT (event_id)
            )";

            //prepare query for execution
            $stmt = $this->conn->prepare($query);

            //Execute the query
            if($stmt->execute()){
                return true;
            }else{
                return false;
            }
        }

        catch(PDOException $exception){
            die('ERROR' . $exception->getMessage());
            return $query . "<br>" . $exception->getMessage();
        }
    } 

    public function follow() {
        try{
            $query = "CREATE TABLE FOLLOW (
            follow_follower INT,
            follow_following INT,
            follow_date_time DATETIME DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY(follow_follower, follow_following),
            FOREIGN KEY (follow_follower) REFERENCES USER (user_id),
            FOREIGN KEY (follow_following) REFERENCES USER (user_id)
            )";

            //prepare query for execution
            $stmt = $this->conn->prepare($query);

            //Execute the query
            if($stmt->execute()){
                return true;
            }else{
                return false;
            }
        }

        catch(PDOException $exception){
            die('ERROR' . $exception->getMessage());
            return $query . "<br>" . $exception->getMessage();
        }
    }
    public function block() {
        try{
            $query = "CREATE TABLE BLOCK (
            block_blocker INT,
            block_blockee INT,
            block_date_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY(block_blocker, block_blockee),
            FOREIGN KEY (block_blocker) REFERENCES USER (user_id),
            FOREIGN KEY (block_blockee) REFERENCES USER (user_id)
            )";

            //prepare query for execution
            $stmt = $this->conn->prepare($query);

            //Execute the query
            if($stmt->execute()){
                return true;
            }else{
                return false;
            }
        }

        catch(PDOException $exception){
            die('ERROR' . $exception->getMessage());
            return $query . "<br>" . $exception->getMessage();
        }
    } 

    public function interested_work() {
        try{
            $query = "CREATE TABLE INTEREST_WORK (
            interest_follower INT,
            interest_following INT,
            interest_date_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY(interest_follower, interest_following),
            FOREIGN KEY (interest_follower) REFERENCES USER (user_id),
            FOREIGN KEY (interest_following) REFERENCES USER (user_id)
            )";

            //prepare query for execution
            $stmt = $this->conn->prepare($query);

            //Execute the query
            if($stmt->execute()){
                return true;
            }else{
                return false;
            }
        }

        catch(PDOException $exception){
            die('ERROR' . $exception->getMessage());
            return $query . "<br>" . $exception->getMessage();
        }
    }
       

    public function privacy() {
        try{
            $query = "CREATE TABLE PRIVACY (
            user_id INT,
            privacy_details INT DEFAULT 1,
            privacy_posts INT DEFAULT 1,
            privacy_messages INT DEFAULT 1,
            PRIMARY KEY(user_id),
            FOREIGN KEY (user_id) REFERENCES USER (user_id)
            )";

            //prepare query for execution
            $stmt = $this->conn->prepare($query);

            //Execute the query
            if($stmt->execute()){
                return true;
            }else{
                return false;
            }
        }

        catch(PDOException $exception){
            die('ERROR' . $exception->getMessage());
            return $query . "<br>" . $exception->getMessage();
        }
    }

    public function collabo() {
        try{
            $query = "CREATE TABLE COLLABO (
            collabo_id INT AUTO_INCREMENT PRIMARY KEY,
            user_id INT,
            project_id INT,
            collabo_heading TEXT,
            collabo_time_limit DATETIME,
            collabo_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            collabo_archive BOOLEAN DEFAULT false,
            collabo_admin_approve BOOLEAN DEFAULT false,
            FOREIGN KEY(user_id) REFERENCES USER (user_id),
            FOREIGN KEY(project_id) REFERENCES PROJECT (project_id)
            )";

            //prepare query for execution
            $stmt = $this->conn->prepare($query);

            //Execute the query
            if($stmt->execute()){
                return true;
            }else{
                return false;
            }
        }

        catch(PDOException $exception){
            die('ERROR' . $exception->getMessage());
            return $query . "<br>" . $exception->getMessage();
        }
    }

    public function artist() {
        try{
            $query = "CREATE TABLE ARTIST (
            user_id INT,
            collabo_id INT,
            artist_approve BOOLEAN DEFAULT false,
            PRIMARY KEY(user_id, collabo_id),
            FOREIGN KEY (user_id) REFERENCES USER (user_id),
            FOREIGN KEY (collabo_id) REFERENCES COLLABO (collabo_id)
            )";

            //prepare query for execution
            $stmt = $this->conn->prepare($query);

            //Execute the query
            if($stmt->execute()){
                return true;
            }else{
                return false;
            }
        }

        catch(PDOException $exception){
            die('ERROR' . $exception->getMessage());
            return $query . "<br>" . $exception->getMessage();
        }
    }

    public function vote() {
        try{
            $query = "CREATE TABLE VOTE (
            voted_collabo INT,
            vote_by INT,
            vote_rating INT,
            PRIMARY KEY(voted_collabo, vote_by),
            FOREIGN KEY (vote_by) REFERENCES USER (user_id),
            FOREIGN KEY (voted_collabo) REFERENCES COLLABO (collabo_id)
            )";

            //prepare query for execution
            $stmt = $this->conn->prepare($query);

            //Execute the query
            if($stmt->execute()){
                return true;
            }else{
                return false;
            }
        }

        catch(PDOException $exception){
            die('ERROR' . $exception->getMessage());
            return $query . "<br>" . $exception->getMessage();
        }
    }

    public function project() {
        try{
            $query = "CREATE TABLE PROJECT (
            project_id INT AUTO_INCREMENT PRIMARY KEY,
            user_id INT,
            project_image VARCHAR(255),
            project_title VARCHAR(255),
            project_description TEXT,
            project_due_date DATETIME,
            project_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            project_archive BOOLEAN DEFAULT false,
            project_status_complete BOOLEAN DEFAULT false,
            FOREIGN KEY(user_id) REFERENCES USER (user_id)
            )";

            //prepare query for execution
            $stmt = $this->conn->prepare($query);

            //Execute the query
            if($stmt->execute()){
                return true;
            }else{
                return false;
            }
        }

        catch(PDOException $exception){
            die('ERROR' . $exception->getMessage());
            return $query . "<br>" . $exception->getMessage();
        }
    } 

    public function project_category() {
        try{
            $query = "CREATE TABLE PROJECT_CATEGORY (
            project_id INT,
            category_id INT,
            PRIMARY KEY(project_id, category_id),
            FOREIGN KEY(project_id) REFERENCES PROJECT (project_id),
            FOREIGN KEY(category_id) REFERENCES CATEGORY (category_id)
            )";

            //prepare query for execution
            $stmt = $this->conn->prepare($query);

            //Execute the query
            if($stmt->execute()){
                return true;
            }else{
                return false;
            }
        }

        catch(PDOException $exception){
            die('ERROR' . $exception->getMessage());
            return $query . "<br>" . $exception->getMessage();
        }
    }

    public function project_entry() {
        try{
            $query = "CREATE TABLE PROJECT_ENTRY (
            project_entry_id INT AUTO_INCREMENT PRIMARY KEY,
            project_id INT,
            project_media_url TEXT,
            project_entry_type TEXT,
            project_entry_description TEXT,
            project_entry_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY(project_id) REFERENCES PROJECT (project_id)
            )";

            //prepare query for execution
            $stmt = $this->conn->prepare($query);

            //Execute the query
            if($stmt->execute()){
                return true;
            }else{
                return false;
            }
        }

        catch(PDOException $exception){
            die('ERROR' . $exception->getMessage());
            return $query . "<br>" . $exception->getMessage();
        }
    }

    public function notification() {
        try{
            $query = "CREATE TABLE NOTIFICATION (
            notification_id INT AUTO_INCREMENT PRIMARY KEY,
            notification_from INT,
            notification_to INT,
            notification_message TEXT,
            notification_type TEXT,
            notification_href TEXT,
            notification_viewed INT,
            notification_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (notification_from) REFERENCES USER (user_id),
            FOREIGN KEY (notification_to) REFERENCES USER (user_id)
            )";

            //prepare query for execution
            $stmt = $this->conn->prepare($query);

            //Execute the query
            if($stmt->execute()){
                return true;
            }else{
                return false;
            }
        }

        catch(PDOException $exception){
            die('ERROR' . $exception->getMessage());
            return $query . "<br>" . $exception->getMessage();
        }
    } 

    public function chat() {
        try{
            $query = "CREATE TABLE CHAT (
            chat_id INT AUTO_INCREMENT PRIMARY KEY,
            chat_from INT,
            chat_to INT,
            chat_message TEXT,
            chat_viewed INT,
            chat_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (chat_from) REFERENCES USER (user_id),
            FOREIGN KEY (chat_to) REFERENCES USER (user_id)
            )";

            //prepare query for execution
            $stmt = $this->conn->prepare($query);

            //Execute the query
            if($stmt->execute()){
                return true;
            }else{
                return false;
            }
        }

        catch(PDOException $exception){
            die('ERROR' . $exception->getMessage());
            return $query . "<br>" . $exception->getMessage();
        }
    } 


}
?>