$(".pas").keyup(function () {
  if ($(".pas").val() != "") {
    $(this)
      .next()
      .css({
        opacity: 1
      });
  } else {
    $(this)
      .next()
      .css({
        opacity: 0
      });
  }
});
var flag = true;
$(".eye").click(function () {
  if (flag == true) {
    $(this)
      .prev()
      .attr("type", "text");
    $(this).css({
      "background-image": "url(images/eye_hide.png)"
    });
    return (flag = false);
  } else {
    $(this)
      .prev()
      .attr("type", "password");
    $(this).css({
      "background-image": "url(images/eye_show.png)"
    });
    return (flag = true);
  }
});

// 记住密码功能 JS结合JQuery 操作 Cookie 实现记住密码和用户名！

var username = document.getElementById("username");
var password = document.getElementById("password");
var date = new Date();
var expiresDays = 1000; //过期时间。
date.setTime(date.getTime() + expiresDays * 24 * 3600 * 1000);

//加密方法。没有过滤首尾空格，即没有trim.
//加密可以加密N次，对应解密N次就可以获取明文
function encodeBase64(mingwen, times) {
  var code = "";
  var num = 5;
  if (typeof times == "undefined" || times == null || times == "") {
    num = 5;
  } else {
    var vt = times + "";
    num = parseInt(vt);
  }
  if (typeof mingwen == "undefined" || mingwen == null || mingwen == "") {} else {
    $.base64.utf8encode = true;
    code = mingwen;
    for (var i = 0; i < num; i++) {
      code = $.base64.btoa(code);
    }
  }
  return code;
}
//解密方法。没有过滤首尾空格，即没有trim
//加密可以加密N次，对应解密N次就可以获取明文
//num为次数
function decodeBase64(mi, times) {
  var mingwen = "";
  var num = 5;
  if (typeof times == "undefined" || times == null || times == "") {
    num = 5;
  } else {
    var vt = times + "";
    num = parseInt(vt);
  }
  if (typeof mi == "undefined" || mi == null || mi == "") {} else {
    $.base64.utf8encode = true;
    mingwen = mi;
    for (var i = 0; i < num; i++) {
      mingwen = $.base64.atob(mingwen);
    }
  }
  return mingwen;
}
$(function () {
  $("#rememberMe").click(function () {
    if ($("#rememberMe").get(0).checked) {
      document.cookie =
        "a=" + encodeBase64(username.value) + "; expires=" + date.toGMTString();
      document.cookie =
        "b=" + encodeBase64(password.value) + "; expires=" + date.toGMTString();
    }
  });
  //遇到问题，base编码解码问题、取消checked返回乱码问题和未选checked直接返回到input值的问题
  var user = getCookie("a");
  var pass = getCookie("b");
  var userId =getCookie("userId");
  if (username.value == "") {
    username.value = decodeBase64(user);
  } else {
    $.cookie("a", "", {
      expires: -1
    });
    $.cookie("b", "", {
      expires: -1
    });
  }
  if (password.value == "") {
    password.value = decodeBase64(pass);
  }
  if (!$("#rememberMe").get(0).checked) {
    username.value == "";
    password.value == "";
    $.cookie("a", "", {
      expires: -1
    });
    $.cookie("b", "", {
      expires: -1
    });
  }
});

function getCookie(name) {
  var strCookie = document.cookie;
  var arrCookie = strCookie.split("; ");
  for (var i = 0; i < arrCookie.length; i++) {
    var arr = arrCookie[i].split("=");
    if (arr[0] == name) return arr[1];
  }
  return "";
}
//账号密码框
$("#login").on("submit", FormLoginSave);

//js初始化
toastr.options.positionClass = 'toast-bottom-right';

function FormLoginSave(e) {
  e.preventDefault();
  let success = $("#success");
  let els = [];
  let tagElements = $("input");
  $("input").each(function (index) {
    els.push(tagElements[index].value);
  });

  $.ajax({
    type: "post",
    url: "api/loginSave.php",
    data: {
      send: 1,
      username: els[0],
      password: els[1],
    },
    success: function (msg) {
      let data = JSON.parse(msg);
      if (data.valid) {
        if ($("#rememberMe").get(0).checked) {
          document.cookie =
            "a=" +
            encodeBase64(username.value) +
            "; expires=" +
            date.toGMTString();
          document.cookie =
            "b=" +
            encodeBase64(password.value) +
            "; expires=" +
            date.toGMTString();
        } else {
          $.cookie("a", "", {
            expires: -1
          });
          $.cookie("b", "", {
            expires: -1
          });
          $.cookie("id", "", {
            expires: -1
          });
          $.cookie("username", "", {
            expires: -1
          });
        }
        toastr.success(data.message);
        setTimeout(function () {
          location.href = "system.html";
        }, 800);
        // success.html(data.message);
      } else {
        toastr.error(data.message);
        // toastr.warning(data.message);
      }
    }
  });
}