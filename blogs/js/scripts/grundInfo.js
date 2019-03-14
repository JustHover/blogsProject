// var username = cookie.get('username');
function getCookie(name) {
  var strCookie = document.cookie;
  var arrCookie = strCookie.split("; ");
  for (var i = 0; i < arrCookie.length; i++) {
    var arr = arrCookie[i].split("=");
    if (arr[0] == name) return arr[1];
  }
  return "";
}
$(".right").css("top","305px");
var userid = getCookie('id');
$(function () {
  //js初始化
  toastr.options.positionClass = 'toast-center-center';
  // 头像查看
  $(".popover-options a").popover({html : true });
  // $(".btnnew")
  //图片上传
  $('#addImg').on('change', function () {
    var file = this.files[0];
    var formData = new FormData();
    formData.append('file', file);
    $.ajax({
      url: "http://localhost:3000/user/put/img",
      type: "POST",
      data: formData,
      async: false,
      dataType: "text",
      processData: false,
      contentType: false,
      success: function (value) {
        $('#imgText').val(value)
        console.log(value)
        $('#userAddhead').attr('datasrc', value);

      },
    })
  })
  // $('body').append('<a href="edituser.html">欢迎管理员'+username+'回来</a>')

  $.get("api/getuser.php", {
    id: userid
  }, function (t) {
    var json = $.parseJSON(t);
    console.log(json)
    $('#role').val(json.message[0].role)
    $('#username').val(json.message[0].username)
    $('#petName').val(json.message[0].petName)
    // $(":checkbox[value='"+dom+"']").prop("checked",true);
    $("input[name='sex'][value=" + json.message[0].sex + "]").prop("checked", true);
    $('#imgText').val(json.message[0].headimg)
    $("#btnLook").click(function(){
      $('#havelook').html(` <img src=.` + json.message[0].headimg + ` class="myImg">`)
    })
    // $('.fileinput-preview').html(` <img src=.` + json.message[0].headimg + `>`)

    // $(".removeImg").click(function () {
    //   $(".fileinput-preview").children().remove()
    // })
    // $('.fileinput-preview').html(` <img src=.` + json.message[0].headimg + `>`)
    // if (
    //   $('.fileinput-preview').html(` <img src=.` + json.message[0].headimg + `>`)) {
    //   $(".fileImg").css('display', 'none')
    // } else {
    //   $(".fileImg").css('display', 'block')
    //   // $(".fileImg").css('display', 'block')
    //   // $(".fileNew, .removeImg").css('display', 'none')
    // }

    $('#phone').val(json.message[0].phone)
    $('#email').val(json.message[0].email)
    $('#tips').val(json.message[0].tips)
  })
  // $.get('api/getuser.php', {
  //   id: userid
  // }, function (t) {
  //   var json = $.parseJSON(t);
  //   console.log(json)
  //   $('#role').val(json.message[0].role)
  //   $('#username').val(json.message[0].username)
  //   $('#petName').val(json.message[0].petName)
  //   $("input[name='sex']:checked").val(json.message[0].sex)
  //   // $('#Modal_user_headimg"]').val(json.message[0].headimg)
  //   $('#phone').val(json.message[0].phone)
  //   $('#email').val(json.message[0].email)
  //   $('#tips').val(json.message[0].tips)
  // })

})

$('#checkSubmit').on('submit', function (e) {
  if ($("#imgText").val() == "") {
    toastr.error("请重新上传头像");
    return false;
  }
  e.preventDefault();
  // $.post($('#editreg').attr('action'), {
  //   username: $('[name="username"]').val(),
  //   email: $('[name="email"]').val(),
  //   password: $('[name="password"]').val(),
  //   id: $('[name="id"]').val()
  // }, function (t) {
  //   console.log(t)
  // })
  var data = {
    'id': userid,
    'role': $('#role').val(),
    'username': $('#username').val(),
    'petName': $('#petName').val(),
    'phone': $('#phone').val(),
    'email': $('#email').val(),
    'tips': $('#tips').val(),
    'headimg': $('#userAddhead').attr('datasrc'),
    'sex': $('input[type=radio]:checked').val()
  };
  console.log(data)
  var parseNew = JSON.stringify(data);
  //发起请求
  $.ajax({
    url: "http://localhost:3000/mine/post",
    data: parseNew,
    type: "POST",
    dataType: "text",
    success: function (msg) {
      toastr.success("用户信息修改成功");
    },
    error: function () {
      toastr.error("用户信息修改失败");
    }

  })


})