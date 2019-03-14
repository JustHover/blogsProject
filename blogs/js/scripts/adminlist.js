
//角色筛选按钮点击赋值
$('.menuRole').on('click', function () {
    $('#roleChecked').html($(this).html());
    $('#roleChecked').attr('value', $(this).attr('dataId'));
})
//模态框角色筛选按钮点击赋值
$('.modal_role_menuRole').on('click', function () {
    $('#modal_role_roleChecked').html($(this).html());
    $('#modal_role_roleChecked').attr('value', $(this).attr('dataId'));
})
//根据数据库渲染页面
$.ajax({
    url: "http://localhost:3000/admin/get",
    type: "GET",
    success: function (data, textStatus, jqXHR) {
        //重载页面
        $('#adminShowContent').html('');
        $.each(data, function (i, val) {
            console.log(data[i].status)
            $('#adminShowContent').append(`
                <tr>
                    <td><input type="checkbox" class="adminSelectbox" dataId="`+ data[i].id + `"></td>
                    <td>`+ data[i].id + `</td>
                    <td>`+ data[i].username + `</td>
                    <td>`+ data[i].phone + `</td>
                    <td>`+ data[i].email + `</td>
                    <td>`+ data[i].role + `</td>
                    <td>`+ data[i].time + `</td>
                    <td><span class="fabu adminFabu">`+ statusFilter(data[i].status, i) + `</span></td>
                    <td><span class="fabu lanse adminBJ" dataXulie="`+ i + `" dataId="` + data[i].id + `" data-toggle="modal" data-target="#myModal_adminlistAdd"> <i class="glyphicon glyphicon-pencil"></i> 编辑</span>
                    <span class="fabu hongse adminDL" dataId="`+ data[i].id + `"> <i class="glyphicon glyphicon-trash"></i> 删除</span></td>
                </tr>
                `)
            statusFilter(data[i].status, i);

        })
        //添加按钮
        $('#adminAdd').on('click', function () {
            //改变模态框样式
            $('#Modal_admin_title').html('添加管理员');
            $('#Modal_admin_username').val('');
            $('#Modal_admin_phone').val('');
            $('#Modal_admin_email').val('');
            $('#modal_role_roleChecked').attr('value', '');
            $('#modal_role_roleChecked').html('');
            //重置模态框确认按钮
            $('#adminSure').off();
            //模态框确认按钮点击事件
            $('#adminSure').on('click', function () {
                //获取数据
                var ischeck = $('#adminFabu').is(':checked');
                ischeck = ischeck.toString();
                var data = {
                    'username': $('#Modal_admin_username').val(),
                    'phone': $('#Modal_admin_phone').val(),
                    'email': $('#Modal_admin_email').val(),
                    'roleId': $('#modal_role_roleChecked').attr('value'),
                    'role': $('#modal_role_roleChecked').html(),
                    'status': ischeck
                };
                var params = JSON.stringify(data);
                console.log(params);
                //发起请求
                $.ajax({
                    url: "http://localhost:3000/admin/put",
                    data: params,
                    type: "POST",
                    success: function (data, textStatus, jqXHR) {
                    }
                })
                loadInner('#adminlist');
                //关闭模态框
                $('#myModal_adminlistAdd').modal('hide');

            })
        })
        //编辑按钮
        $('.adminBJ').on('click', function () {
            //获取ID
            var id = $(this).attr('dataId');
            // console.log(id);
            var i = $(this).attr('dataXulie')
            //改变模态框样式
            $('#Modal_admin_title').html('编辑管理员');
            $('#Modal_admin_username').val(data[i].username);
            $('#Modal_admin_phone').val(data[i].phone);
            $('#Modal_admin_email').val(data[i].email);
            $('#modal_role_roleChecked').attr('value', data[i].roleId);
            $('#modal_role_roleChecked').html(data[i].role);
            //重置模态框确认按钮
            $('#adminSure').off();
            //模态框确认按钮点击事件
            $('#adminSure').on('click', function () {
                //获取数据
                var ischeck = $('#adminFabu').is(':checked');
                ischeck = ischeck.toString();
                var data2 = {
                    'id': id,
                    'username': $('#Modal_admin_username').val(),
                    'phone': $('#Modal_admin_phone').val(),
                    'email': $('#Modal_admin_email').val(),
                    'roleId': $('#modal_role_roleChecked').attr('value'),
                    'role': $('#modal_role_roleChecked').html(),
                    'status': ischeck
                };
                var params = JSON.stringify(data2);
                console.log(params);
                //发起请求
                $.ajax({
                    url: "http://localhost:3000/admin/post",
                    data: params,
                    type: "POST",
                    success: function (data, textStatus, jqXHR) {
                    }
                })
                loadInner('#adminlist');
                //关闭模态框
                $('#myModal_adminlistAdd').modal('hide');
            })
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
        $('#adminSearch').on('click', function () {
            //创建一个数组用来保存id
            var adminArr = [];
            var count = 0;
            //登录名查询
            if ($('#adminSearch_username').val()) {
                console.log($('#adminSearch_username').val())
                count++;
                $.each(data, function (i, val) {
                    if ($('#adminSearch_username').val() == val.username) {
                        adminArr.push(val.id);
                    }
                })
            }
            //电话查询
            if ($('#adminSearch_phone').val()) {
                count++;
                $.each(data, function (i, val) {
                    if ($('#adminSearch_phone').val() == val.phone) {
                        adminArr.push(val.id);
                    }
                })
            }
            //邮箱查询
            if ($('#adminSearch_email').val()) {
                count++;
                $.each(data, function (i, val) {
                    if ($('#adminSearch_email').val() == val.email) {
                        adminArr.push(val.id);
                    }
                })
            }
            //角色筛选查询
            if ($('#roleChecked').attr('value') != -1) {
                console.log($('#roleChecked').attr('value'))
                count++;
                $.each(data, function (i, val) {
                    if ($('#roleChecked').attr('value') == val.roleId) {
                        adminArr.push(val.id)
                        console.log(val.id)
                    }
                })
            }
            var result = findRepeat(adminArr);
            if (adminArr.length != 0) {
                console.log(count);
                console.log(result.maxcount)
                if (count == (result.maxcount)) {
                    $('#adminShowContent').html('');
                    //根据id渲染数据
                    $.each(result.arr, function (i, val1) {
                        $.each(data, function (j, val2) {
                            if (val1 == val2.id) {
                                $('#adminShowContent').append(`
                                <tr>
                                    <td><input type="checkbox" class="adminSelectbox" dataId="`+ data[j].id + `"></td>
                                    <td>`+ data[j].id + `</td>
                                    <td>`+ data[j].username + `</td>
                                    <td>`+ data[j].phone + `</td>
                                    <td>`+ data[j].email + `</td>
                                    <td>`+ data[j].role + `</td>
                                    <td>`+ data[j].time + `</td>
                                    <td><span class="fabu adminFabu">`+ statusFilter(data[j].status, i) + `</span></td>
                                    <td><span class="fabu lanse adminBJ" dataXulie="`+ i + `" dataId="` + data[j].id + `" data-toggle="modal" data-target="#myModal_adminlistAdd"> <i class="glyphicon glyphicon-pencil"></i> 编辑</span>
                                    <span class="fabu hongse adminDL" dataId="`+ data[j].id + `"> <i class="glyphicon glyphicon-trash"></i> 删除</span></td>
                                </tr>
                                        `)
                                statusFilter(data[j].status, j);
                            }
                        })
                    })
                } else {
                    $('#adminShowContent').html('');
                }
            } else {
                //重载页面
                $('#roleChecked').attr('value', -1);
                $('#roleChecked').html('请选择标签');
                $('#adminShowContent').html('');
            }
        })
        //重置按钮
        $('.search_reset').on('click',function(){
            loadInner('#adminlist')
        })
        
        //删除按钮
        //单个删除按钮功能
        $('.adminDL').on('click', function () {
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
            loadInner('#adminList');
        })
        //全选复选框选择事件
        $('#adminSelectboxAll').on('click', function () {
            if ($('#adminSelectboxAll').is(':checked')) {
                $('.adminSelectbox').prop('checked', 'checked')
            } else {
                $('.adminSelectbox').removeAttr('checked')
            }
        })
        //批量删除按钮
        $('#adminDeleteAll').on('click', function () {
            var data = [];
            $.each($('.adminSelectbox:checked'), function (i, val) {
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
            loadInner('#adminList');
        })
    }
})
