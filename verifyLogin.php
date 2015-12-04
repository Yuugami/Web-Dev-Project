<?php
	$host = 'localhost';
	$user = 'root';
	$pass = '';
	$dbname = 'Web-Dev-Project';
	try {
		// MySQL with PDO_MYSQL  
		$conn = new PDO("mysql:host=$host;dbname=$dbname", $user, $pass); 

		// if the username doesn't exist
		$statement = $conn->prepare("SELECT COUNT(*) AS count FROM `Users` WHERE (username = :username)");
		$statement->bindValue(":username", $_POST['username']);
		$statement->execute();
		$result = $statement->fetchAll();
		foreach ($result as $row) {
			// if the username is already taken
			if ($row['count'] == 0) {
				// close our connection and return to register page
				$conn = null;
				header("Location: login.php");
			} 
		}

		// prepare statement
		$statement = $conn->prepare("SELECT * FROM `Users` WHERE username = :username");
		$statement->bindValue(":username", $_POST['username']);
		$statement->execute();
		$result = $statement->fetchAll();

		foreach ($result as $row) {
			if (password_verify ($_POST['password'], $row['password'])) {
				// TODO successful login code here
			}
		}

		// close our connection
		$conn = null; 

		header("Location: index.php");
	} catch(PDOException $e) {  
		echo $e->getMessage();  
	}
?>