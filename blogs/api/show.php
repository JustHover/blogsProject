<?php

        header('Content-type:text/html;charset=utf-8');
        date_default_timezone_set('Asia/Shanghai');
        $conn = new mysqli('localhost','root','','1203');
        mysqli_query($conn,"set character set utf8");
        mysqli_query($conn,"set names utf8");
        if($conn->connect_error){
        die('数据库连接失败'.$conn->connect_error);
        }else{
        //   echo "成功";
        }

        $vaild = true;
        $users = [];
        
         if(isset($_GET['id']) && is_numeric($_GET['id']) && $_GET['id']!=""){
              $sql="SELECT * FROM users WHERE id=".$_GET['id'];
         }else{
              $sql="SELECT * FROM users";
         }
     
       
         $result = mysqli_query($conn, $sql);
         if (mysqli_num_rows($result) > 0) {
             // 输出数据
             while($row = mysqli_fetch_assoc($result)) {
                $users[]=$row;
             }
         } else {
            $users[]='';
         }
          

            echo json_encode(array('vaild' => $vaild,'users' =>$users),JSON_UNESCAPED_UNICODE);

            mysqli_close($conn);