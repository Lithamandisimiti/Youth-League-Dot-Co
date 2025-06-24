<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);
class Project{
    private $conn;

    //object properties
    public $id;
    public $image;
    public $title;
    public $due_date;
    public $project_id;
    public $description;
    public $media_url;
    public $entry_type;

    public function __construct($db){
        $this->conn = $db;
    } 

    public function create_project(){
        try{
            $query = "INSERT INTO PROJECT 
                SET user_id=:id, project_title=:title, project_description=:description, project_image=:image";
 
            // prepare query for execution
            $stmt = $this->conn->prepare($query);
 
            // sanitize           
            $id=htmlspecialchars(strip_tags($this->id));
            $title=htmlspecialchars(strip_tags($this->title));
            $description=htmlspecialchars(strip_tags($this->description));
            $image=htmlspecialchars(strip_tags($this->image));
            
 
            // bind the parameters            
            $stmt->bindParam(':id', $id);
            $stmt->bindParam(':title', $title);
            $stmt->bindParam(':description', $description);
            $stmt->bindParam(':image', $image);
 
            // Execute the query
            if($stmt->execute()){
                $lastid = $this->conn->lastInsertId();
                /*$return = $this->conn->prepare(
                    "SELECT user_id as id, user_username as username FROM USER WHERE user_id='$lastid';"
                );
                $return->execute();
                $results=$return->fetchAll(PDO::FETCH_ASSOC);*/
                return json_encode($lastid);
            }else{
                return 'false';
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

    public function add_project_category($category_id){
        try{
            $query = "INSERT INTO PROJECT_CATEGORY SET project_id=:project_id, category_id=:category_id";
 
            // prepare query for execution
            $stmt = $this->conn->prepare($query);
 
            // sanitize           
            $project_id=htmlspecialchars(strip_tags($this->project_id));
            $category_id=htmlspecialchars(strip_tags($category_id));
            
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

    public function get_user_projects($from_record_num, $records_per_page) {

        try{

            $query = "SELECT project_id, project_description as description, project_title as title, 
                            project_image as image, project_status_complete as project_complete
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

    public function get_project() {

        try{

            $query = "SELECT project_description as description, project_title as title, 
                            project_image as image, project_created as start_date, project_end_date as end_date
                        FROM PROJECT
                        WHERE user_id=:id AND project_id=:project_id
                        ";

            //prepare query for excecution
            $stmt = $this->conn->prepare($query);

            // sanitize
            $id=htmlspecialchars(strip_tags($this->id));
            $project_id=htmlspecialchars(strip_tags($this->project_id));
            
            // bind the parameters            
            $stmt->bindParam(':id', $id);
            $stmt->bindParam(':project_id', $project_id);

            $stmt->execute();

            $results=$stmt->fetchAll(PDO::FETCH_ASSOC);
            return json_encode($results);            
        }

        catch(PDOException $exception){
            die('ERROR: ' . $exception->getMessage());
        }
    }
    
    public function add_project_entry(){

        try{

            $query = "INSERT INTO PROJECT_ENTRY
                SET project_id=:project_id,project_entry_description=:description,
                	project_media_url=:media_url,project_entry_type=:entry_type
                ";

            //prepare query for excecution
            $stmt = $this->conn->prepare($query);

            // sanitize
            $id=htmlspecialchars(strip_tags($this->id));
            $project_id=htmlspecialchars(strip_tags($this->project_id));
            $description=htmlspecialchars(strip_tags($this->description));
            $media_url=htmlspecialchars(strip_tags($this->media_url));
            $entry_type=htmlspecialchars(strip_tags($this->entry_type));

            // bind the parameters
            //$stmt->bindParam(':id', $id);
            $stmt->bindParam(':project_id', $project_id);
            $stmt->bindParam(':description', $description);
            $stmt->bindParam(':media_url', $media_url);
            $stmt->bindParam(':entry_type', $entry_type);
            
 
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
    
    public function get_project_entry(){

        try{

            $query = "SELECT project_entry_id as id,project_entry_description as description,project_media_url as media ,project_entry_date as date,
            		project_entry_type as entry_type
            		FROM PROJECT_ENTRY
            		WHERE project_id=:project_id
                     ";

            //prepare query for excecution
            $stmt = $this->conn->prepare($query);

            // sanitize
            $id=htmlspecialchars(strip_tags($this->id));
            $project_id=htmlspecialchars(strip_tags($this->project_id));

            // bind the parameters
            //$stmt->bindParam(':id', $id);
            $stmt->bindParam(':project_id', $project_id);
 
            // Execute the query
            $stmt->execute();

            $results=$stmt->fetchAll(PDO::FETCH_ASSOC);
            return json_encode($results);                    
        }

        catch(PDOException $exception){
            die('ERROR: ' . $exception->getMessage());
        }
    
    }
    
    public function end_project(){

        try{

            $query = "UPDATE PROJECT
                SET project_status_complete=true,project_end_date=NOW()
                WHERE user_id=:id AND project_id=:project_id";

            //prepare query for excecution
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
    
    public function reopen_project(){

        try{

            $query = "UPDATE PROJECT
                SET project_status_complete=false
                WHERE user_id=:id AND project_id=:project_id";

            //prepare query for excecution
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
    
    public function get_completed_projects($creator_id){

        try{

            /*$query = "SELECT p.project_id as id,p.project_title as title,p.project_description as description,
            		p.project_created as start,p.project_end_date as end, p.project_image as image,
           		p.project_status_complete as project_complete
	            	FROM PROJECT p
	            	INNER JOIN BLOCK b ON b.block_blocker=p.user_id
	                WHERE p.user_id=:creator_id AND p.project_status_complete=true AND p.project_archive=false 
	                	AND block_blocker NOT IN (SELECT block_blocker FROM BLOCK WHERE block_blocker = :creator_id AND block_blockee=:id)
                        ORDER BY p.project_created DESC";*/
                        //LIMIT :from_record, :records_per_page";
            
            $query = "SELECT p.project_id as id,p.project_title as title,p.project_description as description,
            		p.project_created as start,p.project_end_date as end, p.project_image as image,
           		p.project_status_complete as project_complete
	            	FROM PROJECT p
			WHERE p.user_id=:creator_id AND p.project_status_complete=1 AND NOT EXISTS(SELECT block_blocker FROM BLOCK b WHERE
		             b.block_blocker =:creator_id AND b.block_blockee=:id)";
                        //LIMIT :from_record, :records_per_page";

            //prepare query for excecution
            $stmt = $this->conn->prepare($query);

            // sanitize
            $id=htmlspecialchars(strip_tags($this->id));
            $creators_id=htmlspecialchars(strip_tags($creator_id));
            // bind the parameters
            
            $stmt->bindParam(':id', $id);
            $stmt->bindParam(':creator_id', $creators_id);
            
 
            // Execute the query
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