<?php
	// 启用会话
	session_start();
	header("Content-Type: text/html;charset=utf8");
	include_once("conn.php");
	$name = $_SESSION['name'];
	$pwd = $_SESSION['pwd'];
	// 原始密码
	$pw = $_POST['pwd'];
	// var_dump($name,$pwd);
	// 密码
	$pwd1 = trim($_POST['pwd1']);
	// 重复密码
	$pwd2 = trim($_POST['pwd2']);

	if($pwd==""||$pwd1==""||$pwd2==""){
		// 未输入
		echo $arr = 5;
	}else{
		if($pwd==$pw){
		// echo $arr=1;
			if($pwd1==$pwd2){
				// 查询 表名 条件 字段 update user set sex= '0'  where id=2;
				$sql=mysqli_query($conn,"UPDATE user SET pwd = '".$pwd1."' WHERE name = '".$name."' ");
				if($sql){
					// 修改成功
					echo $arr = 1;
					$_SESSION['pwd'] = $pwd1;
				}else{
					// 修改失败
				  	echo $arr = 2;
				}
			}else{
				// 两次密码不相同
				echo $arr = 3;
			}
		}else{
			// 初始密码不正确
			echo $arr=4;
		}
	}
	

	
	
?>