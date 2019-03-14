$(function () {
    //根据数据库渲染页面
    $.ajax({
        url: "http://localhost:3000/ob/get",
        type: "GET",
        success: function (data, textStatus, jqXHR) {
            //重载页面
            console.log(data)
            $('#obShowContent').html('');
            $.each(data, function (i, val) {
                $('#obShowContent').append(`
                <tr>
                    <td><input type="checkbox" class="obSelectbox" dataId="`+ data[i].id + `"></td>
                    <td>`+ data[i].id + `</td>
                    <td>`+ data[i].observer + `</td>
                    <td>`+ data[i].content + `</td>
                    <td>`+ data[i].time + `</td>
                    <td><span class="fabu lanse obBJ" dataXulie="`+ i + `" dataId="` + data[i].id + `" data-toggle="modal" data-target="#myModal_obRevise"> <i class="glyphicon glyphicon-pencil"></i> 编辑</span>
                    <span class="fabu hongse obDL" dataId="`+ data[i].id + `"> <i class="glyphicon glyphicon-trash"></i> 删除</span></td>
                </tr>
                `)
            })
            //编辑按钮
            $('.obBJ').on('click', function () {
                //获取ID
                var id = $(this).attr('dataId');
                // console.log(id);
                var i = $(this).attr('dataXulie')
                //改变模态框数据
                //评论内容
                $('#Modal_ob_content').val(data[i].content);
                //模态框点击事件
                $('#obSure').on("click", function () {
                    //获取数据
                    var data2 = {
                        "id": id,
                        "content": $('#Modal_ob_content').val(),
                    }
                    var params = JSON.stringify(data2);
                    //发起请求
                    $.ajax({
                        url: "http://localhost:3000/ob/post",
                        data: params,
                        type: "POST",
                        success: function (data, textStatus, jqXHR) {
                        }
                    })
                    //重载页面
                    loadInner('#obList');
                    //关闭模态框
                    $('#myModal_obRevise').modal('hide');
                })
            })
            //单个删除按钮功能
            $('.obDL').on('click', function () {
                var data = [$(this).attr('dataId')];
                var params = JSON.stringify(data)
                $.ajax({
                    url: "http://localhost:3000/ob/delete",
                    data: params,
                    type: "POST",
                    success: function (data, textStatus, jqXHR) {

                    }
                })
                //重载页面
                loadInner('#obList');
            })
            //全选复选框选择事件
            $('#obSelectboxAll').on('click', function () {
                if ($('#obSelectboxAll').is(':checked')) {
                    $('.obSelectbox').prop('checked', 'checked')
                } else {
                    $('.obSelectbox').removeAttr('checked')
                }
            })
            //批量删除按钮
            $('#obDeleteAll').on('click', function () {
                var data = [];
                $.each($('.obSelectbox:checked'), function (i, val) {
                    data.push($(val).attr('dataId'));
                })
                //console.log(data);
                var params = JSON.stringify(data)
                $.ajax({
                    url: "http://localhost:3000/ob/delete",
                    data: params,
                    type: "POST",
                    success: function (data, textStatus, jqXHR) {

                    }
                })
                //重载页面
                loadInner('#obList');
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
            $('#obSearch').on('click', function () {
                //创建一个数组用来保存评论id
                var obArr = [];
                var count = 0;
                //根据评论id查询
                if ($('#obSearch_id').val()) {
                    count++;
                    $.each(data, function (i, val) {
                        //console.log(val.id)
                        //console.log($('#obSearch_id').val())
                        if ($('#obSearch_id').val() == val.id) {
                            obArr.push(val.id);
                        }
                    })
                }
                //根据评论者查询
                if ($('#obSearch_observer').val()) {
                    count++;
                    $.each(data, function (i, val) {
                        //console.log(val.id)
                        if ($('#obSearch_observer').val() == val.observer) {
                            obArr.push(val.id)
                        }
                    })
                }
                //根据评论内容查询
                if ($('#obSearch_content').val()) {
                    count++;
                    $.each(data, function (i, val) {
                        //console.log(val.id)
                        if ($('#obSearch_content').val() == val.content) {
                            obArr.push(val.id)
                        }
                    })
                }
                var result = findRepeat(obArr);
                if (obArr.length != 0) {
                    if (count == (result.maxcount)) {
                        $('#obShowContent').html('');
                        //根据id渲染数据
                        $.each(result.arr, function (i, val1) {
                            //console.log(val1);
                            $.each(data, function (j, val2) {
                                if (val1 == val2.id) {
                                    $('#obShowContent').append(`
                                    <tr>
                                    <td><input type="checkbox" class="obSelectbox" dataId="`+ val2.id + `"></td>
                                    <td>`+ val2.id + `</td>
                                    <td>`+ val2.observer + `</td>
                                    <td>`+ val2.content + `</td>
                                    <td>`+ val2.time + `</td>
                                    <td><span class="fabu lanse obBJ" dataXulie="`+ i + `" dataId="` + val2.id + `" data-toggle="modal" data-target="#myModal_obRevise"> <i class="glyphicon glyphicon-pencil"></i> 编辑</span>
                                    <span class="fabu hongse obDL" dataId="`+ val2.id + `"> <i class="glyphicon glyphicon-trash"></i> 删除</span></td>
                                    </tr>
                                        `)
                                    statusFilter(val2.status, i);
                                }
                            })
                        })
                    } else {
                        $('#obShowContent').html('');
                    }
                } else {
                    //重载页面
                    loadInner('#obList');
                }
                // console.log(count);
                // console.log(result.maxcount);
                console.log(result.arr);
                // console.log(obArr);
            })
        }
    })
})