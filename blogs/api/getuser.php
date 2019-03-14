<?php
   include "conn.php";

   $vaild = true;
   $message = [];

   $id=$_GET['id'];
   if(isset($_GET['id']) && is_numeric($_GET['id']) && $_GET['id']!=""){
        $sql="SELECT * FROM user WHERE id=".$_GET['id'];
    }else{
        $sql="SELECT * FROM user";
    }

$result = $conn->query($sql);
if ($result->num_rows > 0) {
   // 输出数据
   while($row = $result->fetch_assoc()) {
       $message[] = $row;
   }
} else {
    $vaild = false;
    $message[]='没有信息';
}


// if(isset($_GET['callback'])){
//     $callback = $_GET['callback'];
//     echo $callback.'('.json_encode(array('vaild' => $vaild,'message' =>$message),JSON_UNESCAPED_UNICODE).')';
// }


echo json_encode(
    array('vaild' => $id,'message' =>$message),JSON_UNESCAPED_UNICODE
);

$conn->close();

?>