<?php
require_once('connect.php');
 header("Content-Type: application/json");
 $id=$_GET['id'];
 $first=true;
 $res=$con->query("SELECT * FROM messages WHERE `receiver`='$id' and `receiver_delete`=0");
if($res->num_rows){
	echo '{"result":[';
	while($row=$res->fetch_assoc()){
	 	
	 	if($first){
	 		$first=false;
	 	}
	 	else{
	 		echo ',';
	 	}
	 	echo json_encode($row);
	}
	echo ']}';
}
else{
	echo '[]';
}
mysqli_close($con);