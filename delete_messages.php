<?php
require_once('connect.php');

$str="";
$first=true;
$user=$_POST['user'];
$type=$_POST['type'];
foreach ($_POST['id'] as $value) {

	if($first){
		$first=false;
	}
	else{
		$str=$str.',';
	}
	$str=$str.$value;
}

$res=$con->query("UPDATE messages SET `".$type."_delete`=1 WHERE id in ($str) AND `$type`='$user'");
mysqli_close($con);