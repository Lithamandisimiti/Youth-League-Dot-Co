
<?php
class POST{
	private $conn;
	
	//object properties
    public $id;
    public $title;
    public $description;
    public $status;
    public $type;
    public $cover_image;
    public $media_url;
    public $location;
    public $categories;
    public $post_id;
    public $comment;
    public $username;
    public $category_id;
    public $search;
    public $category;

    //public $from_record_num = 0;
    //public $records_per_page = 5; 

	public function __construct($db){
        $this->conn = $db;
    }

    public function create_post(){
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
 
            // prepare query for execution
            $stmt = $this->conn->prepare($query);
 
            // sanitize
            $id=htmlspecialchars(strip_tags($this->id));
            $title=htmlspecialchars(strip_tags($this->title));
            $description=htmlspecialchars(strip_tags($this->description));
            $status=htmlspecialchars(strip_tags($this->status));
            $type=htmlspecialchars(strip_tags($this->type));
            $cover_image=htmlspecialchars(strip_tags($this->cover_image));
            $media_url=htmlspecialchars(strip_tags($this->media_url));
            $location=htmlspecialchars(strip_tags($this->location));
            
            // bind the parameters
            $stmt->bindParam(':id', $id);
            $stmt->bindParam(':title', $title);
            $stmt->bindParam(':description', $description);
            $stmt->bindParam(':status', $status);
            $stmt->bindParam(':type', $type);
            $stmt->bindParam(':cover_image', $cover_image);
            $stmt->bindParam(':media_url', $media_url);
            $stmt->bindParam(':location', $location);
 
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

    public function create_blog_post(){
        try{
            $query = "
            INSERT INTO POST 
            SET user_id=:id, post_title=:title, post_description=:description, post_status=:status, 
            post_type=:type, post_cover_image=:cover_image, post_location=:location;
            ";

             // prepare query for execution
            $stmt = $this->conn->prepare($query);

             // sanitize
            $id=htmlspecialchars(strip_tags($this->id));
            $title=htmlspecialchars(strip_tags($this->title));
            $description=htmlspecialchars(strip_tags($this->description));
            $status=htmlspecialchars(strip_tags($this->status));
            $type=htmlspecialchars(strip_tags($this->type));
            $cover_image=htmlspecialchars(strip_tags($this->cover_image));
            $location=htmlspecialchars(strip_tags($this->location));

             // bind the parameters
            $stmt->bindParam(':id', $id);
            $stmt->bindParam(':title', $title);
            $stmt->bindParam(':description', $description);
            $stmt->bindParam(':status', $status);
            $stmt->bindParam(':type', $type);
            $stmt->bindParam(':cover_image', $cover_image);
            $stmt->bindParam(':location', $location);

            // Execute the query
            if($stmt->execute()){
                return true;
            }else{
                return false;
            }
        }
        catch(PDOException $exception){
            die('ERROR' . $exception->getMessage());
        }
    }

    public function archive_post(){
        try{
            $query = "UPDATE POST
                SET post_archive=true 
                WHERE user_id=:id AND post_id=:post_id";
 
            // prepare query for execution
            $stmt = $this->conn->prepare($query);
 
            // sanitize           
            $id=htmlspecialchars(strip_tags($this->id));
            $post_id=htmlspecialchars(strip_tags($this->post_id));
            
 
            // bind the parameters            
            $stmt->bindParam(':id', $id);
            $stmt->bindParam(':post_id', $post_id);
 
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

    public function get_posts($from_record_num, $records_per_page) {

        try{
	        $query = "SELECT p.post_id as post_id, p.post_title as title, p.post_description as description, p.post_status as status, 
						p.post_type as type, p.post_cover_image as cover_image, m.media_url as media_url, p.post_location as location, p.post_created as date_time, 
	        			u.user_id as user_id, u.user_username as username, u.user_firstname as firstname, u.user_lastname as lastname, 
	        			u.user_image as user_image, COUNT(l.liked_post) as likes,
                        IF(
                            (SELECT COUNT(like_by) FROM LIKES q 
                            WHERE q.liked_post = p.post_id AND like_by=:id) > 0 ,'true','false'
                        ) as liked 
	                    FROM POST p 
	                    LEFT JOIN USER u ON p.user_id=u.user_id 
	                    LEFT JOIN LIKES l ON p.post_id = l.liked_post 
                        LEFT JOIN MEDIA m ON p.post_id = m.post_id 
                                AND m.media_id = (SELECT media_id FROM MEDIA WHERE MEDIA.post_id = p.post_id LIMIT 1)
                        WHERE p.post_archive = false AND p.post_status='post'
                        AND (p.user_id IN(SELECT follow_following FROM FOLLOW WHERE follow_follower=:id)  OR p.user_id=:id)
                        GROUP BY p.post_id, l.liked_post, m.media_id 
	                    ORDER BY post_created DESC 
                        LIMIT :from_record, :records_per_page";

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

    public function get_hot_posts($from_record_num, $records_per_page) {

        try{
            $query = "SELECT p.post_id as post_id, p.post_title as title, p.post_description as description, p.post_status as status, 
                        p.post_type as type, p.post_cover_image as cover_image, m.media_url as media_url, p.post_location as location, p.post_created as date_time, 
                        u.user_id as user_id, u.user_username as username, u.user_firstname as firstname, u.user_lastname as lastname, 
                        u.user_image as user_image, COUNT(l.liked_post) as likes,
                        IF(
                            (SELECT COUNT(like_by) FROM LIKES q 
                            WHERE q.liked_post = p.post_id AND like_by=:id) > 0 ,'true','false'
                        ) as liked 
                        FROM POST p 
                        LEFT JOIN USER u ON p.user_id=u.user_id 
                        LEFT JOIN LIKES l ON p.post_id = l.liked_post 
                        LEFT JOIN MEDIA m ON p.post_id = m.post_id 
                                AND m.media_id = (SELECT media_id FROM MEDIA WHERE MEDIA.post_id = p.post_id LIMIT 1)
                        WHERE p.post_archive = false
                        GROUP BY p.post_id, l.liked_post, m.media_id 
                        ORDER BY likes DESC, post_created DESC 
                        LIMIT :from_record, :records_per_page";

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

    public function get_user_posts($from_record_num, $records_per_page) {

        try{
            $query = "SELECT p.post_id as post_id, p.post_title as title, p.post_description as description, p.post_status as status, 
                        p.post_type as type, p.post_cover_image as cover_image, m.media_url as media_url, p.post_location as location, p.post_created as date_time, 
                        u.user_id as user_id, u.user_username as username, u.user_firstname as firstname, u.user_lastname as lastname, 
                        u.user_image as user_image, COUNT(l.liked_post) as likes,
                        IF(
                            (SELECT COUNT(like_by) FROM LIKES q 
                            WHERE q.liked_post = p.post_id AND like_by=:id) > 0 ,'true','false'
                        ) as liked 
                        FROM POST p 
                        LEFT JOIN USER u ON p.user_id=u.user_id 
                        LEFT JOIN LIKES l ON p.post_id = l.liked_post 
                        LEFT JOIN MEDIA m ON p.post_id = m.post_id 
                                AND m.media_id = (SELECT media_id FROM MEDIA WHERE MEDIA.post_id = p.post_id LIMIT 1)
                        WHERE u.user_username=:username AND p.post_archive = false
                        GROUP BY p.post_id, l.liked_post, m.media_id 
                        ORDER BY post_created DESC 
                        LIMIT :from_record, :records_per_page";

            //prepare query for excecution
            $stmt = $this->conn->prepare($query);

            // sanitize
            $id=htmlspecialchars(strip_tags($this->id));
            $username=htmlspecialchars(strip_tags($this->username));

            // bind the parameters
            $stmt->bindParam(':id', $id);
            $stmt->bindParam(':username', $username);
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

    public function get_user_blogs($from_record_num, $records_per_page) {

        try{
            $query = "SELECT p.post_id as post_id, p.post_title as title, p.post_description as description, p.post_status as status, 
                        p.post_type as type, p.post_cover_image as cover_image, m.media_url as media_url, p.post_location as location, p.post_created as date_time, 
                        u.user_username as username, u.user_firstname as firstname, u.user_lastname as lastname, 
                        u.user_image as user_image, COUNT(l.liked_post) as likes,
                        IF(
                            (SELECT COUNT(like_by) FROM LIKES q 
                            WHERE q.liked_post = p.post_id AND like_by=:id) > 0 ,'true','false'
                        ) as liked 
                        FROM POST p 
                        LEFT JOIN USER u ON p.user_id=u.user_id 
                        LEFT JOIN LIKES l ON p.post_id = l.liked_post 
                        LEFT JOIN MEDIA m ON p.post_id = m.post_id 
                                AND m.media_id = (SELECT media_id FROM MEDIA WHERE MEDIA.post_id = p.post_id LIMIT 1)
                        WHERE u.user_username=:username AND p.post_archive = false AND p.post_status='blog'
                        GROUP BY p.post_id, l.liked_post, m.media_id 
                        ORDER BY post_created DESC 
                        LIMIT :from_record, :records_per_page";

            //prepare query for excecution
            $stmt = $this->conn->prepare($query);

            // sanitize
            $id=htmlspecialchars(strip_tags($this->id));
            $username=htmlspecialchars(strip_tags($this->username));

            // bind the parameters
            $stmt->bindParam(':id', $id);
            $stmt->bindParam(':username', $username);
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

    public function get_category_posts($from_record_num, $records_per_page) {

        try{
            $query = "SELECT p.post_id as post_id, p.post_title as title, p.post_description as description, p.post_status as status, 
                        p.post_type as type, p.post_cover_image as cover_image, m.media_url as media_url, p.post_location as location, p.post_created as date_time, 
                        u.user_id as user_id, u.user_username as username, u.user_firstname as firstname, u.user_lastname as lastname, 
                        u.user_image as user_image, COUNT(l.liked_post) as likes,
                        IF(
                            (SELECT COUNT(like_by) FROM LIKES q 
                            WHERE q.liked_post = p.post_id AND like_by=:id) > 0 ,'true','false'
                        ) as liked 
                        FROM POST p 
                        LEFT JOIN USER u ON p.user_id=u.user_id 
                        LEFT JOIN LIKES l ON p.post_id = l.liked_post 
                        LEFT JOIN MEDIA m ON p.post_id = m.post_id 
                                AND m.media_id = (SELECT media_id FROM MEDIA WHERE MEDIA.post_id = p.post_id LIMIT 1)
                        INNER JOIN POST_CATEGORY pc ON p.post_id = pc.post_id AND pc.category_id=:category
                        WHERE p.post_archive = false
                        GROUP BY p.post_id, l.liked_post, m.media_id 
                        ORDER BY post_created DESC 
                        LIMIT :from_record, :records_per_page";

            //prepare query for excecution
            $stmt = $this->conn->prepare($query);

            // sanitize
            $id=htmlspecialchars(strip_tags($this->id));
            $category=htmlspecialchars(strip_tags($this->category));

            // bind the parameters
            $stmt->bindParam(':id', $id);
            $stmt->bindParam(':category', $category);
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

    public function get_post() {    
        try{
	        $query = "SELECT p.post_id as post_id, p.post_title as title, p.post_description as description, p.post_status as status, 
						p.post_type as type, p.post_cover_image as cover_image, m.media_url as media_url, p.post_location as location, p.post_created as date_time, 
	        			u.user_id as user_id, u.user_username as username, u.user_firstname as firstname, u.user_lastname as lastname, 
	        			u.user_image as user_image, COUNT(l.liked_post) as likes, 
                        IF(
                            (SELECT COUNT(like_by) FROM LIKES q 
                            WHERE q.liked_post = p.post_id AND like_by=:id) > 0 ,'true','false'
                        ) as liked 
	                    FROM POST p 
	                    LEFT JOIN USER u ON p.user_id=u.user_id 
	                    LEFT JOIN LIKES l ON p.post_id = l.liked_post 
                        LEFT JOIN MEDIA m ON p.post_id = m.post_id 
                                AND m.media_id = (SELECT media_id FROM MEDIA WHERE MEDIA.post_id = p.post_id LIMIT 1)
	                    WHERE p.post_id=:post_id AND p.post_archive = false
	                    GROUP BY p.post_id, l.liked_post, m.media_id 
	                    ORDER BY post_created DESC ";

	        //prepare query for excecution
	        $stmt = $this->conn->prepare($query);

	        // sanitize
	        $id=htmlspecialchars(strip_tags($this->id));
            $post_id=htmlspecialchars(strip_tags($this->post_id));

	        // bind the parameters
	        $stmt->bindParam(':id', $id);
            $stmt->bindParam(':post_id', $post_id);

	        $stmt->execute();

	        $results=$stmt->fetchAll(PDO::FETCH_ASSOC);
	        return json_encode($results);            
        }

        catch(PDOException $exception){
            die('ERROR: ' . $exception->getMessage());
        }
    }

    public function like() {
        try{
            $query = "INSERT INTO LIKES 
                SET like_by=:id, liked_post=:post_id";
 
            // prepare query for execution
            $stmt = $this->conn->prepare($query);
 
            // sanitize
            $id=htmlspecialchars(strip_tags($this->id));
            $post_id=htmlspecialchars(strip_tags($this->post_id));
 
            // bind the parameters
            $stmt->bindParam(':id', $id);
            $stmt->bindParam(':post_id', $post_id);
 
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

    public function unlike() {
        try{
            $query = "DELETE FROM LIKES 
                WHERE like_by=:id AND liked_post=:post_id";
 
            // prepare query for execution
            $stmt = $this->conn->prepare($query);
 
            // sanitize
            $id=htmlspecialchars(strip_tags($this->id));
            $post_id=htmlspecialchars(strip_tags($this->post_id));
 
            // bind the parameters
            $stmt->bindParam(':id', $id);
            $stmt->bindParam(':post_id', $post_id);
 
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

    public function comment() {
        try{
            $query = "INSERT INTO COMMENT 
                SET user_id=:id, post_id=:post_id, comment_text=:comment";
 
            // prepare query for execution
            $stmt = $this->conn->prepare($query);
 
            // sanitize
            $id=htmlspecialchars(strip_tags($this->id));
            $post_id=htmlspecialchars(strip_tags($this->post_id));
            $comment=htmlspecialchars(strip_tags($this->comment));
 
            // bind the parameters
            $stmt->bindParam(':id', $id);
            $stmt->bindParam(':post_id', $post_id);
            $stmt->bindParam(':comment', $comment);
 
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

    public function get_comments($from_record_num, $records_per_page) {   
        try{
            $query = "SELECT c.comment_id, c.comment_text as comment, c.comment_date_time as date_time, u.user_username as name, 
            u.user_image as image
            FROM COMMENT c 
            INNER JOIN USER u ON c.user_id = u.user_id
            WHERE c.post_id=:post_id 
            GROUP BY c.comment_id, u.user_username 
            ORDER BY c.comment_date_time DESC 
            LIMIT :from_record, :records_per_page";

            //prepare query for excecution
            $stmt = $this->conn->prepare($query);

            // sanitize
            //$id=htmlspecialchars(strip_tags($this->id));
            $post_id=htmlspecialchars(strip_tags($this->post_id));

            // bind the parameters
            //$stmt->bindParam(':id', $id);
            $stmt->bindParam(':post_id', $post_id);
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

    public function add_post_category(){
        try{
            $query = "INSERT INTO POST_CATEGORY SET post_id=:post_id, category_id=:category_id";
 
            // prepare query for execution
            $stmt = $this->conn->prepare($query);
 
            // sanitize           
            $post_id=htmlspecialchars(strip_tags($this->post_id));
            $category_id=htmlspecialchars(strip_tags($this->category_id));
            
            // bind the parameters            
            $stmt->bindParam(':post_id', $post_id);
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

    public function get_images($from_record_num, $records_per_page) {   
        try{
            $query = "SELECT m.post_id, m.media_url
            FROM MEDIA m
            INNER JOIN POST p on p.post_id = m.post_id AND p.post_type='image'
            WHERE user_id=:id AND p.post_archive = false
            ORDER BY p.post_created DESC
            LIMIT :from_record, :records_per_page";

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

    public function get_videos($from_record_num, $records_per_page) {   
        try{
            $query = "SELECT m.post_id, m.media_url
            FROM MEDIA m
            INNER JOIN POST p on p.post_id = m.post_id AND p.post_type='video'
            WHERE user_id=:id AND p.post_archive = false
            ORDER BY p.post_created DESC
            LIMIT :from_record, :records_per_page";

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

    public function search_posts() {

        try{
            $query = "SELECT p.post_id as post_id, p.post_title as title, p.post_description as description, p.post_status as status, 
                        p.post_type as type, p.post_cover_image as cover_image, m.media_url as media_url, p.post_location as location, p.post_created as date_time, 
                        u.user_username as username, u.user_firstname as firstname, u.user_lastname as lastname, 
                        u.user_image as user_image, COUNT(l.liked_post) as likes,
                        IF(
                            (SELECT COUNT(like_by) FROM LIKES q 
                            WHERE q.liked_post = p.post_id AND like_by=:id) > 0 ,'true','false'
                        ) as liked 
                        FROM POST p 
                        LEFT JOIN USER u ON p.user_id=u.user_id 
                        LEFT JOIN LIKES l ON p.post_id = l.liked_post 
                        LEFT JOIN MEDIA m ON p.post_id = m.post_id 
                                AND m.media_id = (SELECT media_id FROM MEDIA WHERE MEDIA.post_id = p.post_id LIMIT 1)
                        WHERE p.post_archive = false 
                        AND p.post_description LIKE CONCAT('%', :search, '%') OR p.post_title LIKE CONCAT('%', :search, '%')
                        GROUP BY p.post_id, l.liked_post, m.media_id  
                        ORDER BY p.post_description DESC, p.post_title DESC
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

    public function update_post(){
        try{
            $query = "UPDATE POST
                SET  post_description=:description, post_title=:title
                WHERE user_id=:id AND post_id=:post_id";
 
            // prepare query for execution
            $stmt = $this->conn->prepare($query);
 
            // sanitize
            $id=htmlspecialchars(strip_tags($this->id));
            $title=htmlspecialchars(strip_tags($this->title));
            $description=htmlspecialchars(strip_tags($this->description));
            $post_id=htmlspecialchars(strip_tags($this->post_id));
            
            
            // bind the parameters
            $stmt->bindParam(':id', $id);
            $stmt->bindParam(':title', $title);
            $stmt->bindParam(':description', $description);
            $stmt->bindParam(':post_id', $post_id);
 
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

    public function update_blog(){
        try{
            $query = "UPDATE POST
                SET  post_description=:description, post_title=:title
                WHERE user_id=:id AND post_id=:post_id";
 
            // prepare query for execution
            $stmt = $this->conn->prepare($query);
 
            // sanitize
            $id=htmlspecialchars(strip_tags($this->id));
            $description=htmlspecialchars(strip_tags($this->description));
            $post_id=htmlspecialchars(strip_tags($this->post_id));
            
            
            // bind the parameters
            $stmt->bindParam(':id', $id);
            $stmt->bindParam(':description', $description);
            $stmt->bindParam(':post_id', $post_id);
 
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
   
}
?>