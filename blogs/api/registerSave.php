<?php
    include 'conn.php';
    $valid = true;
    $message = '';

    if(isset($_POST['send']) && $_POST['send'] == 1){
        if(isset($_POST['username']) && $_POST['username']!=""){
          
            $username = $_POST['username'];
        }else{
            $valid = false;
            $message = '帐号不能为空，必须输入';
        }
          
        if(isset($_POST['password']) && $_POST['password']!=""){
            $password = sha1($_POST['password']);
        }else{
            $valid = false;
            $message = '密码不能为空';
        }
        if (isset($_POST['checkPassword']) && $_POST['checkPassword']!="") {

            if ($password != sha1($_POST['checkPassword'])) {
                 $message = "初始密码和确认密码不符合";
                 $valid   = false;
            }else{
                $checkPassword = sha1($_POST['checkPassword']);
            }
        }
        if($valid){
            $result = mysqli_query($conn,"SELECT * FROM users WHERE username = '$username'");
            if(mysqli_num_rows($result) == 0){
                $sql = "INSERT INTO users(username,password,checkPassword)VALUES('$username','$password','$checkPassword')";
                if(mysqli_query($conn,$sql)){
                    $message = '注册成功';
                }else{
                    $valid = false;
                    $message = '注册失败'.$sql;
                }
            }else{
                $valid = false;
                $message = '用户名已经存在！请重新选择！';
            }
        }else{
           $valid = false;
           $message = $message;
        }
    }else{
        $valid = false;
        $message = '接口地址来源非法！';
    }
    echo json_encode(
        array('valid'=>$valid,'message'=>$message),JSON_UNESCAPED_UNICODE
    );