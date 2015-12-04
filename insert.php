<?php
	$host = 'localhost';
	$user = 'root';
	$pass = '';
	$dbname = 'Web-Dev-Project';
	try {
		// MySQL with PDO_MYSQL  
		$conn = new PDO("mysql:host=$host;dbname=$dbname", $user, $pass); 

		// if the username is already taken, go back to the register page
		$statement = $conn->prepare("SELECT COUNT(*) AS count FROM `Users` WHERE (username = :username)");
		$statement->bindValue(":username", $_POST['username']);
		$statement->execute();
		$result = $statement->fetchAll();
		foreach ($result as $row) {
			// if the username is already taken
			if ($row['count'] > 0) {
				// close our connection and return to register page
				$conn = null;
				header("Location: register.php");
			} 
		}

		// if the email address is already taken, go back to the register page
		$statement = $conn->prepare("SELECT COUNT(*) AS count FROM `Users` WHERE (emailAddress = :emailAddress)");
		$statement->bindValue(":emailAddress", $_POST['emailAddress']);
		$statement->execute();
		$result = $statement->fetchAll();
		foreach ($result as $row) {
			// if the emailAddress is already taken
			if ($row['count'] > 0) {
				// close our connection and return to register page
				$conn = null;
				header("Location: register.php");
			} 
		}

		// prepare insert statement
		$statement = $conn->prepare("INSERT INTO Users (emailAddress, username, password) values (:emailAddress, :username, :password)");
		$statement->bindValue(":emailAddress", $_POST['emailAddress']);
		$statement->bindValue(":username", $_POST['username']);
		$password = $_POST['password'];
		$salt = mcrypt_create_iv(16, MCRYPT_DEV_URANDOM);
		$hash = crypt($password, $salt);

		$statement->bindValue(":password", $hash);
		$statement->execute();
		$numRowsAffected = $statement->rowCount();
		$insertedPrimaryKey = $conn->lastInsertId();

		// close our connection
		$conn = null; 

		header("Location: index.php");
	} catch(PDOException $e) {  
		echo $e->getMessage();  
	}
?>