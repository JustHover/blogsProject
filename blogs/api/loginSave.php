<?php
    include 'conn.php';
    $valid = true;
    $message = '';

    if(isset($_POST['send']) && $_POST['send']==1){

        if(isset($_POST['username']) && $_POST['username']!=""){
            $username =  htmlentities($_POST['username'], ENT_QUOTES, 'UTF-8');
            $regexp = "/^[\x7f-\xff]+$/";
            if(!preg_match($regexp,$username)){
                $message = "用户名必须全部由中文汉字组成";
                $valid = false;
            }
        }else{
            $valid = false;
            $messgae = '用户名帐号不合法';
        }
        if(isset($_POST['password']) && $_POST['password']!=""){
            $password = $_POST['password'];
            // $password = sha1($_POST['password']);
        }else{
            $valid = false;
            $message = '密码不能为空，请输入';
        }

            if($valid){
                $sql = "SELECT * From user WHERE username = '$username' &&  password='$password'";
                $result = mysqli_query($conn,$sql);
                $row = $result->fetch_assoc();
                if(mysqli_num_rows($result) == 1){
                    $expire = time()+60*60*24*7;
                    // setcookie('username',$row['username'],$expire,'/');
                    setcookie ("username", urlencode($row['username']),$expire,'/');
                    setcookie('id',$row['id'],$expire,'/');
                    $message = '登陆成功';
            }else{
                $valid = false;
                $message = "帐号或密码不正确";
            }
        }else{
            $valid=false;
            $message = $message;
        }
    }else{
        $valid = false;
        $message = '接口调用失败';
    }

    echo json_encode(
        array('valid'=>$valid,'message'=>$message),JSON_UNESCAPED_UNICODE
    );
