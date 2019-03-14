$(function () {
     //图片上传
     $('#userAddhead').on('change', function () {
        var file = this.files[0];
        var formData = new FormData();
        formData.append('file', file);
        $('#Modal_user_headimg').val($('#userAddhead')[0].value)
        $.ajax({
            url: "http://localhost:3000/user/put/img",
            type: "POST",
            data: formData,
            async: false,
            dataType: "text",
            processData: false,
            contentType: false,
            success: function (d, textStatus, jqXHR) {
                console.log(d);
                $('#userAddhead').attr('datasrc', d);

            },
        })
    })
    //按钮点击赋值
    $('.menuSex').on('click', function () {
        $('#sexChecked').html($(this).html());
        $('#sexChecked').attr('value', $(this).attr('dataId'));
    })
    $('.menuSex2').on('click', function () {
        $('#sexChecked2').html($(this).html());
        $('#sexChecked2').attr('value', $(this).attr('dataId'));
    })
    //根据数据库生成页面
    $.ajax({
        url: "http://localhost:3000/user/get",
        type: "GET",
        success: function (data) {
            //重载页面
            $('#userShowContent').html('');
            console.log(data)
            $.each(data, function (i) {
                $('#userShowContent').append(`
                <tr>
                    <td><input type="checkbox" class="userSelectbox" dataId="`+ data[i].id + `"></td>
                    <td>`+ data[i].id + `</td>
                    <td>`+ data[i].username + `</td>
                    <td>`+ ` <img src=.` + data[i].headimg + ` class="touxiang">` + `</td>
                    <td>`+ data[i].phone + `</td>
                    <td>`+ data[i].email + `</td>
                    <td>`+ sexFilter(data[i].sex) + `</td>
                    <td>`+ data[i].ip + `</td>
                    <td>`+ data[i].time + `</td>
                    <td><span class="fabu lanse userlistBJ" dataXulie="`+ i + `" dataId="` + data[i].id + `" data-toggle="modal" data-target="#myModal_userAdd"> <i class="glyphicon glyphicon-pencil"></i> 编辑</span><span class="fabu hongse userDL" dataId="` + data[i].id + `"> <i class="glyphicon glyphicon-trash " ></i> 删除</span></td>
                </tr>
                `)
            })
            //单个删除按钮功能
            $('.userDL').on('click', function () {

                var data = [$(this).attr('dataId')];
                var params = JSON.stringify(data)

                $.ajax({
                    url: "http://localhost:3000/user/delete",
                    data: params,
                    type: "POST",
                    success: function (data, textStatus, jqXHR) {

                    }
                })
                //重载页面
                loadInner('#userList');
            })
            //编辑按钮功能
            $('.userlistBJ').on('click', function () {
                //获取ID
                var id = $(this).attr('dataId');
                // console.log(id);
                var i = $(this).attr('dataXulie')
                //改变模态框数据
                $('#Modal_user_title').html('编辑用户');
                //用户名
                $('#Modal_user_username').val(data[i].username);
                //号码
                $('#Modal_user_phone').val(data[i].phone);
                //邮箱
                $('#Modal_user_email').val(data[i].email)
                //头像
                $('#Modal_user_headimg').val( $('#userAddhead').attr('datasrc'));
                //性别
                $('#sexChecked').html(sexFilter(data[i].sex));
                $('#sexChecked').attr('value', data[i].sex);
                //改变模态框确定按钮事件
                //移除已有事件
                $('#userSure').off();
                //添加点击事件
                $('#userSure').on('click', function () {
                    var data2 = {
                        'id': id,
                        'username': $('#Modal_user_username').val(),
                        'phone': $('#Modal_user_phone').val(),
                        'email': $('#Modal_user_email').val(),
                        'headimg':$('#userAddhead').attr('datasrc'),
                        'sex': $('#sexChecked').attr('value')
                    }
                    var params = JSON.stringify(data2);
                    $.ajax({
                        url: "http://localhost:3000/user/post",
                        data: params,
                        type: "POST",
                        success: function (data, textStatus, jqXHR) {
                        }
                    })
                    //重载页面
                    loadInner('#userList');
                    //关闭模态框
                    $('#myModal_userAdd').modal('hide');
                })
            })
            //全选复选框选择事件
            $('#userSelectboxAll').on('click', function () {
                if ($('#userSelectboxAll').is(':checked')) {
                    $('.userSelectbox').prop('checked', 'checked')
                } else {
                    $('.userSelectbox').removeAttr('checked')
                }
            })

            //批量删除按钮
            $('#userDeleteAll').on('click', function () {
                var data = [];
                $.each($('.userSelectbox:checked'), function (i, val) {
                    data.push($(val).attr('dataId'));
                })
                console.log(data);
                var params = JSON.stringify(data)
                $.ajax({
                    url: "http://localhost:3000/user/delete",
                    data: params,
                    type: "POST",
                    success: function (data, textStatus, jqXHR) {
                    }
                })
                //重载页面
                loadInner('#userList');
            })
            //查询功能实现(讲道理这个是后端搞得)
            //思路，如果有输入就查询，没有就跳过该条件，将所有条件查询结果的id push进同一个数组，取重复的部分
            //寻找重复的方法
            function findRepeat(arr) {
                var hash = {};//利用hash 来记录次数
                var m = 1; //现在的最大次数
                var trueEl = [];//最大的元素，可能出现不止一个最大元素，所以为数组
                for (var i = 0, len = arr.length; i < len; i++) {
                    var el = arr[i];
                    var uniqueEl = typeof (el) + el; // 为了区分 1 和 '1'
                    if (!hash[uniqueEl]) {    //利用对象的hash检验是否元素重复
                        hash[uniqueEl] = 1;
                    } else {
                        hash[uniqueEl]++;
                    }
                    if (hash[uniqueEl] == m) {
                        trueEl.push(el);         //把当前最大次数的元素放到数组里
                    } else if (hash[uniqueEl] > m) {
                        trueEl = [];           //清空数组
                        m = hash[uniqueEl];
                        trueEl.push(el);
                    }
                }
                return result = {
                    'arr': trueEl,
                    'maxcount': m
                }
            }
            //查询按钮点击
            $('#userSearch').on('click', function () {
                //创建一个数组用来保存id
                var userArr = [];
                var count = 0;
                //ID查询
                if ($('#userSearch_id').val()) {
                    count++;
                    $.each(data, function (i, val) {
                        //console.log(val.id)
                        if ($('#userSearch_id').val() == val.id) {
                            userArr.push(val.id);
                        }
                    })
                }
                //user查询
                if ($('#userSearch_username').val()) {
                    count++;
                    $.each(data, function (i, val) {
                        //console.log(val.id)
                        if ($('#userSearch_username').val() == val.username) {
                            userArr.push(val.id);
                        }
                    })
                }
                //邮箱查询
                if ($('#userSearch_email').val()) {
                    count++;
                    $.each(data, function (i, val) {
                        //console.log(val.id)
                        if ($('#userSearch_email').val() == val.email) {
                            userArr.push(val.id);
                        }
                    })
                }
                //sex查询
                if ($('#sexChecked2').attr('value') != -1) {
                    count++;
                    $.each(data, function (i, val) {
                        if ($('#sexChecked2').attr('value') == val.sex) {
                            userArr.push(val.id)
                            //console.log(val.id)
                        }
                    })
                }
                var result = findRepeat(userArr);
                if (userArr.length != 0) {
                    console.log(count);
                    console.log(result.maxcount)
                    if (count == (result.maxcount)) {
                        $('#userShowContent').html('');
                        //根据id渲染数据
                        $.each(result.arr, function (i, val1) {
                            $.each(data, function (j, val2) {
                                if (val1 == val2.id) {
                                    $('#userShowContent').append(`
                                    <tr>
                                    <td><input type="checkbox" class="userSelectbox" dataId="`+ data[j].id + `"></td>
                                    <td>`+ data[j].id + `</td>
                                    <td>`+ data[j].username + `</td>
                                    <td>`+ ` <img src=.` + data[j].headimg + ` class="touxiang">` + `</td>
                                    <td>`+ data[j].phone + `</td>
                                    <td>`+ data[j].email + `</td>
                                    <td>`+ sexFilter(data[j].sex) + `</td>
                                    <td>`+ data[j].ip + `</td>
                                    <td>`+ data[j].time + `</td>
                                    <td><span class="fabu lanse" dataXulie="`+ i + `" dataId="` + data[j].id + `" data-toggle="modal" data-target="#myModal_userAdd"> <i class="glyphicon glyphicon-pencil"></i> 编辑</span><span class="fabu hongse userDL" dataId="` + data[j].id + `"> <i class="glyphicon glyphicon-trash " ></i> 删除</span></td>
                                </tr>
                                        `)
                                    statusFilter(data[j].status, j);
                                }
                            })
                        })
                    } else {
                        $('#userShowContent').html('');
                    }
                } else {
                    //重载页面
                    $('#sexChecked2').attr('value', 0);
                    $('#sexChecked2').html('请选择标签');
                    loadInner('#userList');
                }
            })
        }
    })
})
//添加按钮
$('#userAdd').on('click', function () {
    //改变模态框样式
    $('#Modal_user_title').html('添加用户');
    //重置模态框样式
    //用户名
    $('#Modal_user_username').val('');
    //号码
    $('#Modal_user_phone').val('');
    //邮箱
    $('#Modal_user_email').val('')
    //头像
    $('#Modal_user_headimg').val('');
    //性别
    $('#sexChecked').html('');
    $('#sexChecked').attr('dataId', '');
    //重置模态框确认按钮
    $('#userSure').off();
    //模态框确认按钮点击事件
    $('#userSure').on('click', function () {
        //获取数据
        //判断性别
        var sexS = (function () {
            if ($('#sexChecked').attr('value') == '男') {
                return 0
            } else {
                if ($('#sexChecked').attr('value') == '女') {
                    return 1
                }
            }
        }())
        var ip = returnCitySN["cip"];
        var data = {
            'username': $('#Modal_user_username').val(),
            'phone': $('#Modal_user_phone').val(),
            'email': $('#Modal_user_email').val(),
            'headimg': $('#userAddhead').attr('datasrc'),
            'ip': ip,
            'sex': $('#sexChecked').attr('value')
        };
        var params = JSON.stringify(data);
        console.log(params)
        //发起请求
        $.ajax({
            url: "http://localhost:3000/user/put/userlist",
            data: params,
            type: "POST",
            success: function (data, textStatus, jqXHR) {

            }
        })
        //重载页面
        loadInner('#userList');
        //关闭模态框
        $('#myModal_userAdd').modal('hide');
    })
})