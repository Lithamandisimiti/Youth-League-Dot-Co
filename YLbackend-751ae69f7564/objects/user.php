<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);
class User{
	private $conn;

	//object properties
    public $id;
	public $email;
    public $password;
    public $username;
    public $firstname;
    public $lastname;
    public $dob;
    public $email_username; 
    public $follow_id;
    public $bio;
    public $location;
    public $work;
    public $image;
    public $name;
    public $description;
    public $venue;
    public $date_time;
    public $event_id;
    public $status;
    public $title;
    public $due_date;
    public $category_id;
    public $artists;
    public $time_limit;
    public $rating;
    public $skill_id;
    public $skill_set_id;
    public $search;
    public $categories;
    public $website;

	public function __construct($db){
        $this->conn = $db;
    }

     public function follow() {
        try{
            $query = "INSERT INTO FOLLOW 
                SET follow_follower=:id, follow_following=:follow_id";
 
            // prepare query for execution
            $stmt = $this->conn->prepare($query);
 
            // sanitize
            $id=htmlspecialchars(strip_tags($this->id));
            $follow_id=htmlspecialchars(strip_tags($this->follow_id));
 
            // bind the parameters
            $stmt->bindParam(':id', $id);
            $stmt->bindParam(':follow_id', $follow_id);
 
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

    public function unfollow() {
        try{
            $query = "DELETE FROM FOLLOW 
                WHERE follow_follower=:id AND follow_following=:follow_id";
 
            // prepare query for execution
            $stmt = $this->conn->prepare($query);
 
            // sanitize
            $id=htmlspecialchars(strip_tags($this->id));
            $follow_id=htmlspecialchars(strip_tags($this->follow_id));
 
            // bind the parameters
            $stmt->bindParam(':id', $id);
            $stmt->bindParam(':follow_id', $follow_id);
 
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

     public function interest() {
        try{
            $query = "INSERT INTO INTEREST_WORK 
                SET interest_follower=:id, interest_following=:follow_id";
 
            // prepare query for execution
            $stmt = $this->conn->prepare($query);
 
            // sanitize
            $id=htmlspecialchars(strip_tags($this->id));
            $follow_id=htmlspecialchars(strip_tags($this->follow_id));
 
            // bind the parameters
            $stmt->bindParam(':id', $id);
            $stmt->bindParam(':follow_id', $follow_id);
 
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

    public function uninterest() {
        try{
            $query = "DELETE FROM INTEREST_WORK 
                WHERE interest_follower=:id AND interest_following=:follow_id";
 
            // prepare query for execution
            $stmt = $this->conn->prepare($query);
 
            // sanitize
            $id=htmlspecialchars(strip_tags($this->id));
            $follow_id=htmlspecialchars(strip_tags($this->follow_id));
 
            // bind the parameters
            $stmt->bindParam(':id', $id);
            $stmt->bindParam(':follow_id', $follow_id);
 
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

    public function get_user_data() {

        try{

            $query = "SELECT user_id as id, user_email as email, user_username as username, user_firstname as firstname, user_lastname as lastname, user_gender as gender,
                        user_dob as dob, user_bio as bio, user_website as website, user_location as location, user_work_organization as work_organization,
                        user_work_position as work_position, user_work_location as work_location, 
                        user_work_description as work_description, 
                        user_image as image, 
                        IF(
                        (SELECT COUNT(follow_follower) FROM FOLLOW
                        WHERE FOLLOW.follow_following = USER.user_id AND follow_follower=:id) > 0 ,'true','false'
                        ) as following,
                        IF(
                        (SELECT COUNT(interest_follower) FROM INTEREST_WORK
                        WHERE INTEREST_WORK.interest_following = USER.user_id AND interest_follower=:id) > 0 ,'true','false'
                        ) as interested_to_work
                        FROM USER 
                        WHERE user_username=:username
                        ";

            //prepare query for excecution
            $stmt = $this->conn->prepare($query);

            // sanitize
            $id=htmlspecialchars(strip_tags($this->id));
            $username=htmlspecialchars(strip_tags($this->username));

            // bind the parameters
            $stmt->bindParam(':id', $id);
            $stmt->bindParam(':username', $username);

            $stmt->execute();

            $results=$stmt->fetchAll(PDO::FETCH_ASSOC);
            return json_encode($results);            
        }

        catch(PDOException $exception){
            die('ERROR: ' . $exception->getMessage());
        }
    }

    public function get_user_data_editable() {

        try{

            $query = "SELECT user_firstname as firstname, user_lastname as lastname, user_gender as gender, 
                        user_dob as dob, user_bio as bio, user_location as location, user_work as work, user_image as image 
                        FROM USER 
                        WHERE user_id=:id
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

    public function update_user_basic(){
        try{
            $query = "UPDATE USER
                SET  user_firstname=:firstname, user_lastname=:lastname, user_dob=:dob, 
                user_gender=:gender, user_location=:location, user_website=:website
                WHERE user_id=:id";
 
            // prepare query for execution
            $stmt = $this->conn->prepare($query);
 
            // sanitize
            $firstname=htmlspecialchars(strip_tags($this->firstname));
            $lastname=htmlspecialchars(strip_tags($this->lastname));
            $dob=htmlspecialchars(strip_tags($this->dob));
            $gender=htmlspecialchars(strip_tags($this->gender));
            $location=htmlspecialchars(strip_tags($this->location));
            $website=htmlspecialchars(strip_tags($this->website));
            $id=htmlspecialchars(strip_tags($this->id));
            
 
            // bind the parameters
            $stmt->bindParam(':firstname', $firstname);
            $stmt->bindParam(':lastname', $lastname);
            $stmt->bindParam(':dob', $dob);
            $stmt->bindParam(':gender', $gender);
            $stmt->bindParam(':location', $location);
            $stmt->bindParam(':website', $website);
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

    public function update_user_work(){
        try{
            $query = "UPDATE USER
                SET user_work_organization=:work_organization, user_work_position=:work_position, 
                user_work_location=:work_location, user_work_description=:work_description
                WHERE user_id=:id";
 
            // prepare query for execution
            $stmt = $this->conn->prepare($query);
 
            // sanitize
            $work_organization=htmlspecialchars(strip_tags($this->work_organization));
            $work_position=htmlspecialchars(strip_tags($this->work_position));
            $work_location=htmlspecialchars(strip_tags($this->work_location));
            $work_description=htmlspecialchars(strip_tags($this->work_description));
            $id=htmlspecialchars(strip_tags($this->id));
            
 
            // bind the parameters
            $stmt->bindParam(':work_organization', $work_organization);
            $stmt->bindParam(':work_position', $work_position);
            $stmt->bindParam(':work_location', $work_location);
            $stmt->bindParam(':work_description', $work_description);
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

    public function update_user_image(){
        try{
            $query = "UPDATE USER
                SET user_image=:image
                WHERE user_id=:id";
 
            // prepare query for execution
            $stmt = $this->conn->prepare($query);
 
            // sanitize
            $image=htmlspecialchars(strip_tags($this->image));
            $id=htmlspecialchars(strip_tags($this->id));
            
 
            // bind the parameters
            $stmt->bindParam(':image', $image);
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

    public function update_user_bio(){
        try{
            $query = "UPDATE USER
                SET user_bio=:bio
                WHERE user_id=:id";
 
            // prepare query for execution
            $stmt = $this->conn->prepare($query);
 
            // sanitize
            $image=htmlspecialchars(strip_tags($this->image));
            $id=htmlspecialchars(strip_tags($this->id));
            
 
            // bind the parameters
            $stmt->bindParam(':image', $image);
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

    public function create_category(){
        try{
            $query = "INSERT INTO CATEGORY 
                SET user_admin=:id, category_name=:name, category_description=:description, category_image=:image";
 
            // prepare query for execution
            $stmt = $this->conn->prepare($query);
 
            // sanitize           
            $id=htmlspecialchars(strip_tags($this->id));
            $name=htmlspecialchars(strip_tags($this->name));
            $description=htmlspecialchars(strip_tags($this->description));
            $image=htmlspecialchars(strip_tags($this->image));
            
 
            // bind the parameters            
            $stmt->bindParam(':id', $id);
            $stmt->bindParam(':name', $name);
            $stmt->bindParam(':description', $description);
            $stmt->bindParam(':image', $image);
 
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

    public function get_category() {

        try{

            $query = "SELECT category_id, category_name as name, category_description as description, category_image as image
                        FROM CATEGORY 
                        ";

            //prepare query for excecution
            $stmt = $this->conn->prepare($query);

            // sanitize
            //$id=htmlspecialchars(strip_tags($this->id));

            // bind the parameters
            //$stmt->bindParam(':id', $id);

            $stmt->execute();

            $results=$stmt->fetchAll(PDO::FETCH_ASSOC);
            return json_encode($results);            
        }

        catch(PDOException $exception){
            die('ERROR: ' . $exception->getMessage());
        }
    }

    public function get_user_category() {

        try{

            $query = "SELECT category_id, category_name as name, category_description as description, category_image as image
                        FROM CATEGORY
                        INNER JOIN USER_CATEGORY ON CATEGORY.category_id = USER_CATEGORY.category_id 
                        AND USER_CATEGORY.user_id=:id 
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

    public function create_event(){
        try{
            function values($plan_id, $categories){
                $values = array();
                foreach($categories as $value){
                  $_value = "(".$value.",".$plan_id.")";
                  array_push($values,$_value);
                }
                $values_ = implode(",",$values);
                return $values_;
            }

            $query = "
            INSERT INTO POST 
            SET user_id=:id, post_title=:title, post_description=:description, post_status=:status, 
            post_type=:type, post_cover_image=:cover_image, post_location=:location ;
            SELECT LAST_INSERT_ID() INTO @id;
            INSERT INTO MEDIA SET post_id=@id, media_url=:media_url;
            INSERT INTO POST_CATEGORY(category_id,post_id) VALUES" . values("@id",$this->categories).";
            ";

            $query = "
            INSERT INTO EVENT 
            SET user_id=:id, event_name=:name, event_venue=:venue, event_image=:image, event_date_time=:date_time;
            SELECT LAST_INSERT_ID() INTO @id;
            INSERT INTO EVENT_CATEGORY(category_id,post_id) VALUES" . values("@id",$this->categories).";
                ";
 
            // prepare query for execution
            $stmt = $this->conn->prepare($query);
 
            // sanitize           
            $id=htmlspecialchars(strip_tags($this->id));
            $name=htmlspecialchars(strip_tags($this->name));
            $venue=htmlspecialchars(strip_tags($this->venue));
            $image=htmlspecialchars(strip_tags($this->image));
            $date_time=htmlspecialchars(strip_tags($this->date_time));
            
 
            // bind the parameters            
            $stmt->bindParam(':id', $id);
            $stmt->bindParam(':name', $name);
            $stmt->bindParam(':venue', $venue);
            $stmt->bindParam(':image', $image);
            $stmt->bindParam(':date_time', $date_time);
 
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

    public function archive_event(){
        try{
            $query = "UPDATE EVENT
                SET event_archive=true 
                WHERE user_id=:id AND event_id=:event_id";
 
            // prepare query for execution
            $stmt = $this->conn->prepare($query);
 
            // sanitize           
            $id=htmlspecialchars(strip_tags($this->id));
            $event_id=htmlspecialchars(strip_tags($this->event_id));
            
 
            // bind the parameters            
            $stmt->bindParam(':id', $id);
            $stmt->bindParam(':event_id', $event_id);
 
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

    public function attend_event(){
        try{
            $query = "INSERT INTO ATTEND 
                SET user_id=:id, event_id=:event_id, attend_status=:status";
 
            // prepare query for execution
            $stmt = $this->conn->prepare($query);
 
            // sanitize           
            $id=htmlspecialchars(strip_tags($this->id));
            $event_id=htmlspecialchars(strip_tags($this->event_id));
            $status=htmlspecialchars(strip_tags($this->status));            
 
            // bind the parameters            
            $stmt->bindParam(':id', $id);
            $stmt->bindParam(':event_id', $event_id);
            $stmt->bindParam(':status', $status);
 
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

    public function unattend_event(){
        try{
            $query = "DELETE FROM ATTEND 
                WHERE user_id=:id AND event_id=:event_id";

 
            // prepare query for execution
            $stmt = $this->conn->prepare($query);
 
            // sanitize           
            $id=htmlspecialchars(strip_tags($this->id));
            $event_id=htmlspecialchars(strip_tags($this->event_id));          
 
            // bind the parameters            
            $stmt->bindParam(':id', $id);
            $stmt->bindParam(':event_id', $event_id);
 
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

    public function get_events($from_record_num, $records_per_page) {

        try{

            $query = "SELECT event_id as event_id, event_name as name, event_venue as venue, 
                            event_image as image, event_date_time as date_time,
                            (SELECT attend_status FROM ATTEND WHERE user_id=:id AND event_id=EVENT.event_id) as status
                        FROM EVENT 
                        WHERE event_date_time > NOW() AND event_archive = false
                        ORDER BY event_date_time DESC
                        LIMIT :from_record, :records_per_page
                        ";

            //prepare query for excecution
            $stmt = $this->conn->prepare($query);

            // sanitize
            $id=htmlspecialchars(strip_tags($this->id));

            // bind the parameters
            $stmt->bindParam(':id', $id);
            $stmt->bindParam(':from_record', $from_record_num, PDO::PARAM_INT);
            $stmt->bindParam(':records_per_page', $records_per_page, PDO::PARAM_INT);

            $stmt->execute();

            $results=$stmt->fetchAll(PDO::FETCH_ASSOC);
            return json_encode($results);            
        }

        catch(PDOException $exception){
            die('ERROR: ' . $exception->getMessage());
        }
    }

    public function get_users() {

        try{

            $query = "SELECT user_id as id, user_firstname as firstname, user_lastname as lastname, 
                        user_username as username, user_image as image,
                        IF(
                        (SELECT COUNT(follow_follower) FROM FOLLOW
                        WHERE FOLLOW.follow_following = USER.user_id AND follow_follower=:id) > 0 ,'true','false'
                        ) as following 
                        FROM USER 
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

    public function get_following() {

        try{

            $query = "SELECT user_id as id, user_firstname as firstname, user_lastname as lastname, 
                        user_username as username, user_image as image,
                        IF(
                        (SELECT COUNT(follow_follower) FROM FOLLOW
                        WHERE FOLLOW.follow_following = USER.user_id AND follow_follower=:id) > 0 ,'true','false'
                        ) as following 
                        FROM USER
                        INNER JOIN FOLLOW ON USER.user_id = FOLLOW.follow_following AND FOLLOW.follow_follower=:id
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

    public function get_followers() {

        try{

            $query = "SELECT user_id as id, user_firstname as firstname, user_lastname as lastname, 
                        user_username as username, user_image as image,
                        IF(
                        (SELECT COUNT(follow_follower) FROM FOLLOW
                        WHERE FOLLOW.follow_following = USER.user_id AND follow_follower=:id) > 0 ,'true','false'
                        ) as following 
                        FROM USER
                        INNER JOIN FOLLOW ON USER.user_id = FOLLOW.follow_follower AND FOLLOW.follow_following=:id
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

    public function count_followers() {

        try{

            $query = "SELECT COUNT(follow_follower) as followers FROM FOLLOW
                        WHERE follow_following=:id";

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

    public function count_following() {

        try{

            $query = "SELECT COUNT(follow_follower) as following FROM FOLLOW
                        WHERE follow_follower=:id";

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

    public function create_project(){
        try{
            $query = "INSERT INTO PROJECT 
                SET user_id=:id, project_title=:title, project_description=:description, project_image=:image,
                 project_end_date=:due_date";
 
            // prepare query for execution
            $stmt = $this->conn->prepare($query);
 
            // sanitize           
            $id=htmlspecialchars(strip_tags($this->id));
            $title=htmlspecialchars(strip_tags($this->title));
            $description=htmlspecialchars(strip_tags($this->description));
            $image=htmlspecialchars(strip_tags($this->image));
            $due_date=htmlspecialchars(strip_tags($this->due_date));
            
 
            // bind the parameters            
            $stmt->bindParam(':id', $id);
            $stmt->bindParam(':title', $title);
            $stmt->bindParam(':description', $description);
            $stmt->bindParam(':image', $image);
            $stmt->bindParam(':due_date', $due_date);
 
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

    public function archive_project(){
        try{
            $query = "UPDATE PROJECT
                SET project_archive=true 
                WHERE user_id=:id AND project_id=:project_id";
 
            // prepare query for execution
            $stmt = $this->conn->prepare($query);
 
            // sanitize           
            $id=htmlspecialchars(strip_tags($this->id));
            $project_id=htmlspecialchars(strip_tags($this->project_id));
            
 
            // bind the parameters            
            $stmt->bindParam(':id', $id);
            $stmt->bindParam(':project_id', $project_id);
 
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

    public function add_user_category(){
        try{
            $query = "INSERT INTO USER_CATEGORY SET user_id=:id, category_id=:category_id";
 
            // prepare query for execution
            $stmt = $this->conn->prepare($query);
 
            // sanitize           
            $id=htmlspecialchars(strip_tags($this->id));
            $category_id=htmlspecialchars(strip_tags($this->category_id));
            
            // bind the parameters            
            $stmt->bindParam(':id', $id);
            $stmt->bindParam(':category_id', $category_id);
            
 
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

    public function delete_user_category(){
        try{
            $query = "DELETE FROM USER_CATEGORY WHERE user_id=:id AND category_id=:category_id";
 
            // prepare query for execution
            $stmt = $this->conn->prepare($query);
 
            // sanitize           
            $id=htmlspecialchars(strip_tags($this->id));
            $category_id=htmlspecialchars(strip_tags($this->category_id));
            
            // bind the parameters            
            $stmt->bindParam(':id', $id);
            $stmt->bindParam(':category_id', $category_id);
            
 
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

    public function add_event_category(){
        try{
            $query = "INSERT INTO EVENT_CATEGORY SET event_id=:event_id, category_id=:category_id";
 
            // prepare query for execution
            $stmt = $this->conn->prepare($query);
 
            // sanitize           
            $event_id=htmlspecialchars(strip_tags($this->event_id));
            $category_id=htmlspecialchars(strip_tags($this->category_id));
            
            // bind the parameters            
            $stmt->bindParam(':event_id', $event_id);
            $stmt->bindParam(':category_id', $category_id);
            
 
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

    public function add_project_category(){
        try{
            $query = "INSERT INTO PROJECT_CATEGORY SET project_id=:project_id, category_id=:category_id";
 
            // prepare query for execution
            $stmt = $this->conn->prepare($query);
 
            // sanitize           
            $project_id=htmlspecialchars(strip_tags($this->project_id));
            $category_id=htmlspecialchars(strip_tags($this->category_id));
            
            // bind the parameters            
            $stmt->bindParam(':project_id', $project_id);
            $stmt->bindParam(':category_id', $category_id);
            
 
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

    public function create_collabo(){
        try{
            
            function values($plan_id, $categories){
                $values = array();
                foreach($categories as $value){
                  $_value = "(".$value.",".$plan_id.")";
                  array_push($values,$_value);
                }
                $values_ = implode(",",$values);
                return $values_;
            }

            $query = "
            INSERT INTO COLLABO 
            SET user_id=:id, collabo_time_limit=:time_limit;
            SELECT LAST_INSERT_ID() INTO @id;
            INSERT INTO ARTIST(user_id,collabo_id) VALUES" . values("@id",$this->artists).";
            ";
 
            // prepare query for execution
            $stmt = $this->conn->prepare($query);
 
            // sanitize
            $id=htmlspecialchars(strip_tags($this->id));
            $time_limit=htmlspecialchars(strip_tags($this->time_limit));
            
            // bind the parameters
            $stmt->bindParam(':id', $id);
            $stmt->bindParam(':time_limit', $time_limit);
 
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

    public function archive_collabo(){
        try{
            $query = "UPDATE COLLABO
                SET collabo_archive=true 
                WHERE user_id=:id AND collabo_id=:collabo_id";
 
            // prepare query for execution
            $stmt = $this->conn->prepare($query);
 
            // sanitize           
            $id=htmlspecialchars(strip_tags($this->id));
            $collabo_id=htmlspecialchars(strip_tags($this->collabo_id));
            
 
            // bind the parameters            
            $stmt->bindParam(':id', $id);
            $stmt->bindParam(':collabo_id', $collabo_id);
 
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

    public function rate_collabo() {
        try{
            $query = "INSERT INTO VOTE 
                SET vote_by=:id, voted_collabo=:collabo_id, vote_rating=:rating";
 
            // prepare query for execution
            $stmt = $this->conn->prepare($query);
 
            // sanitize
            $id=htmlspecialchars(strip_tags($this->id));
            $collabo_id=htmlspecialchars(strip_tags($this->collabo_id));
            $rating=htmlspecialchars(strip_tags($this->rating));
 
            // bind the parameters
            $stmt->bindParam(':id', $id);
            $stmt->bindParam(':collabo_id', $collabo_id);
            $stmt->bindParam(':rating', $rating);
 
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

    public function get_collabos() {

        try{

            $query = "SELECT u.user_id as id, u.user_firstname as firstname, u.user_lastname as lastname, 
                        u.user_username as username, u.user_image as image, a.collabo_id
                        FROM ARTIST a 
                        INNER JOIN USER u ON a.user_id = u.user_id
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

    public function get_collaborations($start,$end) {

        try{

            $query = "SELECT c.collabo_id,c.project_id,c.collabo_heading, c.user_id as creator_id
            		FROM COLLABO c 
            		WHERE c.collabo_admin_approve=1
            		LIMIT :start, :end
                        ";

            //prepare query for excecution
            $stmt = $this->conn->prepare($query);

            // sanitize
            //$id=htmlspecialchars(strip_tags($this->id));
            /*$startSan=htmlspecialchars(strip_tags($start));
            $endSan=htmlspecialchars(strip_tags($end));*/

            // bind the parameters
            //$stmt->bindParam(':id', $id);
            $stmt->bindParam(':start', $start, PDO::PARAM_INT);
            $stmt->bindParam(':end', $end, PDO::PARAM_INT);

            $stmt->execute();
            
            

            $results=$stmt->fetchAll(PDO::FETCH_ASSOC);
            
            
            return json_encode($results);            
        }

        catch(PDOException $exception){
            die('ERROR: ' . $exception->getMessage());
        }
    }

    public function get_all_collaborations($start,$end) {

        try{

            $query = "SELECT c.collabo_id,c.project_id,c.collabo_heading, c.user_id as creator_id
            		FROM COLLABO c 
            		LIMIT :start,:end
                        ";

            //prepare query for excecution
            $stmt = $this->conn->prepare($query);

            // sanitize
            //$id=htmlspecialchars(strip_tags($this->id));

            // bind the parameters
            //$stmt->bindParam(':id', $id);
            $stmt->bindParam(':start', $start, PDO::PARAM_INT);
            $stmt->bindParam(':end', $end, PDO::PARAM_INT);

            $stmt->execute();

            $results=$stmt->fetchAll(PDO::FETCH_ASSOC);
            return json_encode($results);            
        }

        catch(PDOException $exception){
            die('ERROR: ' . $exception->getMessage());
        }
    } 

    public function get_collaborations_list($collabid) {

        try{

            $query = "SELECT a.user_id as artist_id, u.user_username as username
            		FROM ARTIST a 
            		LEFT JOIN USER u ON a.user_id=u.user_id
            		WHERE a.collabo_id=:id
                        ";

            //prepare query for excecution
            $stmt = $this->conn->prepare($query);

            // sanitize
            $id=htmlspecialchars(strip_tags($collabid));

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


    public function create_skill(){
        try{
            $query = "INSERT INTO SKILL 
                SET user_admin=:id, skill_name=:name, skill_image=:image";
 
            // prepare query for execution
            $stmt = $this->conn->prepare($query);
 
            // sanitize           
            $id=htmlspecialchars(strip_tags($this->id));
            $name=htmlspecialchars(strip_tags($this->name));
            $image=htmlspecialchars(strip_tags($this->image));
            
 
            // bind the parameters            
            $stmt->bindParam(':id', $id);
            $stmt->bindParam(':name', $name);
            $stmt->bindParam(':image', $image);
 
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

    public function create_skill_set(){
        try{
            $query = "INSERT INTO SKILL_SET 
                SET skill_id=:skill_id, skill_set_name=:name";
 
            // prepare query for execution
            $stmt = $this->conn->prepare($query);
 
            // sanitize           
            $skill_id=htmlspecialchars(strip_tags($this->skill_id));
            $name=htmlspecialchars(strip_tags($this->name));
            
 
            // bind the parameters            
            $stmt->bindParam(':skill_id', $skill_id);
            $stmt->bindParam(':name', $name);
 
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

    public function create_user_skill(){
        try{
            $query = "INSERT INTO USER_SKILL 
                SET user_id=:id, skill_id=:skill_id, skill_set_id=:skill_set_id";
 
            // prepare query for execution
            $stmt = $this->conn->prepare($query);
 
            // sanitize 
            $id=htmlspecialchars(strip_tags($this->id));          
            $skill_id=htmlspecialchars(strip_tags($this->skill_id));
            $skill_set_id=htmlspecialchars(strip_tags($this->skill_set_id));
            
 
            // bind the parameters    
            $stmt->bindParam(':id', $id);        
            $stmt->bindParam(':skill_id', $skill_id);
            $stmt->bindParam(':skill_set_id', $skill_set_id);
 
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

    public function delete_user_skill(){
        try{
            $query = "DELETE FROM USER_SKILL 
                WHERE user_id=:id AND skill_id=:skill_id AND skill_set_id=:skill_set_id";
 
            // prepare query for execution
            $stmt = $this->conn->prepare($query);
 
            // sanitize 
            $id=htmlspecialchars(strip_tags($this->id));          
            $skill_id=htmlspecialchars(strip_tags($this->skill_id));
            $skill_set_id=htmlspecialchars(strip_tags($this->skill_set_id));
            
 
            // bind the parameters    
            $stmt->bindParam(':id', $id);        
            $stmt->bindParam(':skill_id', $skill_id);
            $stmt->bindParam(':skill_set_id', $skill_set_id);
 
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

    public function get_skills() {

        try{

            $query = "SELECT ss.skill_id, ss.skill_set_id, s.skill_name, s.skill_image, ss.skill_set_name
                        FROM SKILL_SET ss
                        INNER JOIN SKILL s ON ss.skill_id = s.skill_id
                        ";

            //prepare query for excecution
            $stmt = $this->conn->prepare($query);

            // sanitize
            //$id=htmlspecialchars(strip_tags($this->id));

            // bind the parameters
            //$stmt->bindParam(':id', $id);

            $stmt->execute();

            $results=$stmt->fetchAll(PDO::FETCH_ASSOC);
            return json_encode($results);            
        }

        catch(PDOException $exception){
            die('ERROR: ' . $exception->getMessage());
        }
    } 

    public function get_user_skills() {

        try{

            $query = "SELECT us.skill_id, us.skill_set_id, s.skill_name, s.skill_image, ss.skill_set_name
                        FROM USER_SKILL us
                        INNER JOIN SKILL s ON us.skill_id = s.skill_id
                        INNER JOIN SKILL_SET ss ON us.skill_set_id = ss.skill_set_id
                        WHERE user_id=:id
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
    
    public function search_users() {

        try{

            $query = "SELECT user_id as id, user_firstname as firstname, user_lastname as lastname, 
                        user_username as username, user_image as image,
                        IF(
                        (SELECT COUNT(follow_follower) FROM FOLLOW
                        WHERE FOLLOW.follow_following = USER.user_id AND follow_follower=:id) > 0 ,'true','false'
                        ) as following 
                        FROM USER 
                        WHERE user_username LIKE CONCAT('%', :search, '%') OR user_firstname LIKE CONCAT('%', :search, '%') 
                        OR user_lastname LIKE CONCAT('%', :search, '%') 
                        ORDER BY user_username DESC, user_firstname DESC, user_lastname DESC
                        ";

            //prepare query for excecution
            $stmt = $this->conn->prepare($query);

            // sanitize
            $id=htmlspecialchars(strip_tags($this->id));
            $search=htmlspecialchars(strip_tags($this->search));

            // bind the parameters
            $stmt->bindParam(':id', $id);
            $stmt->bindParam(':search', $search);

            $stmt->execute();

            $results=$stmt->fetchAll(PDO::FETCH_ASSOC);
            return json_encode($results);            
        }

        catch(PDOException $exception){
            die('ERROR: ' . $exception->getMessage());
        }
    }

    public function get_user_projects($from_record_num, $records_per_page) {

        try{

            $query = "SELECT project_id, project_description as description, project_title as title, 
                            project_image as image, project_end_date as end_date
                        FROM PROJECT
                        WHERE user_id=:id AND project_archive=0
                        ORDER BY project_created DESC
                        LIMIT :from_record, :records_per_page
                        ";

            //prepare query for excecution
            $stmt = $this->conn->prepare($query);

            // sanitize
            $id=htmlspecialchars(strip_tags($this->id));

            // bind the parameters
            $stmt->bindParam(':id', $id);
            $stmt->bindParam(':from_record', $from_record_num, PDO::PARAM_INT);
            $stmt->bindParam(':records_per_page', $records_per_page, PDO::PARAM_INT);

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