<?php
require_once('connect.php');
 //header("Content-Type: application/json");
 $sender=$_POST['sender'];
 $receiver=$_POST['receiver'];
 $subject=$_POST['subject'];
 $body=$_POST['text'];
 $timestamp=$_POST['time'];

$res=$con->query("INSERT INTO messages (`sender`,`receiver`,`body`,`read_status`,`sender_delete`,`receiver_delete`) VALUES ('$sender','$receiver','$body',0,0,0)");

mysqli_close($con);