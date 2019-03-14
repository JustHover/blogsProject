
//发起AJAX请求渲染页面
$.ajax({
    url: "http://localhost:3000/tags/get",
    type: "GET",
    success: function (data, textStatus, jqXHR) {
        //重载页面
        $.each(data, function (i, val) {
            $('#classifyShowContent').append(`
                <tr>
                    <td>`+ (i + 1) + `</td>
                    <td>`+ data[i].id + `</td>
                    <td>`+ data[i].tags + `</td>
                    <td><span class="fabu lanse classifyBJ" dataID="`+ data[i].id + `" dataTags="` + data[i].tags + ` " data-toggle="modal" data-target="#myModal_classifyAdd"> <i class="glyphicon glyphicon-pencil" ></i> 编辑</span>
                    <span class="fabu hongse classifyDL" dataID="`+ data[i].id + `"> <i class="glyphicon glyphicon-trash"></i> 删除</span></td>
                </tr>
                `)
        })
        //删除按钮点击
        $(".classifyDL").on('click', function () {

            var data = {
                'id': $(this).attr('dataId')
            }
            var params = JSON.stringify(data)
            $.ajax({
                url: "http://localhost:3000/tags/delete",
                data: params,
                type: "POST",
                success: function (data, textStatus, jqXHR) {
                    loadInner('#classify');
                }
            })
            //重载页面
            loadInner('#classify');
        })
        //编辑按钮点击
        $(".classifyBJ").on('click', function () {
            //获取ID
            var id = $(this).attr('dataId');
            console.log(id);
            //改变模态框数据
            $('#classifyInput').val($(this).attr('dataTags'));
            //改变模态框确定按钮事件
            //移除已有事件
            $('#classifySure').off();
            $('#classifySure').on('click', function () {
                //获取数据
                var data = {
                    'id': id,
                    'tags': $('#classifyInput').val()
                }
                var params = JSON.stringify(data);
                //发起AJAX请求
                if ($('#classifyInput').val() != "") {
                    $.ajax({
                        url: "http://localhost:3000/tags/post",
                        data: params,
                        type: "POST",
                        success: function (data, textStatus, jqXHR) {
                            //重载页面
                            loadInner('#classify');
                        }
                    })
                    //重载页面
                    loadInner('#classify');
                    //关闭模态框
                    $('#myModal_classifyAdd').modal('hide');
                } else {
                    console.log('不可为空值')
                }
            })
        })
    }
})
//添加按钮点击
$("[name|='classifyAdd']").on('click', function () {
    //改变模态框确定按钮事件
    //移除已有事件
    $('#classifySure').off();
    //绑定添加事件
    $('#classifySure').on('click', function () {
        //发起AJAX请求
        if ($('#classifyInput').val() != "") {
            var data = {
                'tags': $('#classifyInput').val()
            }
            var params = JSON.stringify(data)
            $.ajax({
                url: "http://localhost:3000/tags/put",
                data: params,
                type: "POST",
                success: function (data, textStatus, jqXHR) {
                    //重载页面
                    loadInner('#classify');
                }
            })
            //重载页面
            loadInner('#classify');
            //关闭模态框
            $('#myModal_classifyAdd').modal('hide');
        } else {
            console.log('不可为空值')
        }
    })
})
