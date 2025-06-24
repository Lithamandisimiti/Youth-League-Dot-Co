<?php
	class Database{
		private $host = "localhost";
		private $db_name = "yl_dev";
		private $username = "avospace";
		private $password = "thenamelesssix";
		/*private $host = "localhost";
		private $db_name = "yl_dev";
		private $username = "root";
		private $password = "";*/

		public function getConnection(){
			$this->conn = null;
			try{
				$this->conn = new PDO("mysql:host=" .$this->host .";dbname=" .$this->db_name, $this->username, $this->password);
			}catch(PDOException $exception){
				echo "Connection error: " .$exception->getMessage();
			}

			return $this->conn;
		}
	}

	header('Access-Control-Allow-Origin: *');
?>