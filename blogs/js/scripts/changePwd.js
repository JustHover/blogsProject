$(function () {

    //js初始化
    toastr.options.positionClass = 'toast-center-center';
    //修改密码页
    // var userpasswd = document.getElementById("userpasswd");//当前密码
    // var checkNewPasword = document.getElementById("checkNewPasword");//新密码
    // var ConfirmPassword = document.getElementById("ConfirmPassword");//确认新密码
    // console.log(checkNewPasword);
    // console.log(ConfirmPassword);
    var userpasswd = $("#userpasswd"); //当前密码
    var checkNewPasword = $("#checkNewPasword"); //新密码
    var ConfirmPassword = $("#ConfirmPassword"); //确认新密码
    //验证密码
    function checkPassword() {
        if (userpasswd.val() == "") {
            toastr.warning("当前密码不能为空");
            // errPasswd.innerHTML = "当前密码不能为空";
            // errPasswd.className = "error";
            return false;
        }
    }
    userpasswd.blur(checkPassword);

    function NewPasword() {
        if (checkNewPasword.val() == "") {
            toastr.warning("新密码不能为空");
            // newPasswordErr.innerHTML = "新密码不能为空";
            // newPasswordErr.className = "error";
            return false;
        } else {
            if (/[a-zA-Z]/.test(checkNewPasword.val()) && /[0-9]/.test(checkNewPasword.val()) &&
                /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im.test(checkNewPasword.val())) {
                toastr.info("密码强度高");
                // newPasswordErr.innerHTML = "密码强度高";
            } else if (/[a-zA-Z]/.test(checkNewPasword.val()) && /[0-9]/.test(checkNewPasword.val())) {
                // newPasswordErr.innerHTML = "密码强度中"
                toastr.info("密码强度中");
            } else if (/[a-zA-Z]/.test(checkNewPasword.val()) || /[0-9]/.test(checkNewPasword.val())) {
                // newPasswordErr.innerHTML = "密码强度低"
                toastr.info("密码强度低");
            }
            // }

            // newPasswordErr.className = "success";
            return true;
        }
    }
    checkNewPasword.blur(NewPasword);
    //确认密码 
    function ConfirmNewPassword() {
        if ((checkNewPasword.val()) != (ConfirmPassword.val()) || ConfirmPassword.val() == "") {
            toastr.warning("上下密码不一致");
            // errConPasswd.innerHTML = "上下密码不一致";
            // errConPasswd.className = "error";
            return false;
        } else {
            toastr.info("新密码确认通过");
            // errConPasswd.innerHTML = "通过"
            // errConPasswd.className = "success";
            return true;
        }
    }
    ConfirmPassword.blur(ConfirmNewPassword);
    //返回id
    function getCookie(name) {
        var strCookie = document.cookie;
        var arrCookie = strCookie.split("; ");
        for (var i = 0; i < arrCookie.length; i++) {
          var arr = arrCookie[i].split("=");
          if (arr[0] == name) return arr[1];
        }
        return "";
      }
    var userid = getCookie('userid');
    // 提交
    $("#register").on("submit", clip);

    function clip(e) {
        // checkPassword();
        NewPasword();
        // ConfirmNewPassword()
        e.preventDefault();
        // let els = [];
        // let tagElements = $('input');
        // $('input').each(function (index) {
        //     els.push(tagElements[index].value);
        // })
        // console.log(userpasswd.val())
        $.ajax({
            type: "post",
            url: "api/password.php",
            data: {
                send: 1,
                oldPassword: userpasswd.val(),
                newPassword: checkNewPasword.val(),
                checkPassword: ConfirmPassword.val()
            },
            success: function (msg) {
                var data = $.parseJSON(msg);
                console.log(msg)
                if (data.valid) {
                    toastr.success(data.message);
                    $.cookie("a", "", {expires: -1});
                    $.cookie("b", "", {expires: -1});
                    $.cookie("id", "", {expires: -1});
                    $.cookie("username", "", {expires: -1});
                    setTimeout(function () {
                        location.href = '/blogsProject/blogs/';
                      }, 800);
                } else {
                    toastr.error(data.message);
                }
            },
            error: function (error) {
                toastr.error(data.message);
            }
        })
    }
})