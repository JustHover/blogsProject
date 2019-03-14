<?php
    include 'conn.php';
    $valid = true;
    $message = '';

    $username= $_POST["username"];
    $password = sha1($_POST["password"]);

       
    $sql = "SELECT * FROM user WHERE username = '$username' &&  password='$password'";
    $result = mysqli_query($conn,$sql);
    $row = $result->fetch_assoc();
    if(mysqli_num_rows($result) == 1){
        $expire = time()+60*60*24*7;
        setcookie('userid',$row['id'],$expire,'/');
        setcookie('username',$row['username'],$expire,'/');
        $message = '登陆成功';
    }

    echo json_encode(
        array('valid'=>$valid,'message'=>$message),JSON_UNESCAPED_UNICODE
    );
