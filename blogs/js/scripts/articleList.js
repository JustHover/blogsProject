$(function () {
    //根据数据库生成文章标签
    $.ajax({
        url: "http://localhost:3000/tags/get",
        type: "GET",
        success: function (msg) {
            var data;
            if (typeof msg === 'string') {
                data = $.parseJSON(msg);
            } else if (typeof msg === 'object') {
                data = msg;
            }
            $('#Modal_article_tagContent').html();
            $(data).each(function (i) {
                $('#tagContent').append(`
                <a class="menuTag" role="menuitem" tabindex="-1" dataId=` + data[i].id + `>` + data[i].tags + `</a>
                `)
            })
            //按钮点击赋值
            $('.menuTag').on('click', function () {
                $('#tagChecked').html($(this).html());
                $('#tagChecked').attr('value', $(this).attr('dataId'));
            })
            //渲染模态框tag标签
            $('#Modal_article_tagContent').html('')
            $.each(data, function (i, val) {
                $('#Modal_article_tagContent').append(`
                <a class="Modal_article_menuTag" role="menuitem" tabindex="-1" dataId=` + data[i].id + `>` + data[i].tags + `</a>
                `)
            })
            //按钮点击赋值
            $('.Modal_article_menuTag').on('click', function () {
                $('#Modal_article_tagChecked').html($(this).html());
                $('#Modal_article_tagChecked').attr('value', $(this).attr('dataId'));
            })
        }
    })
    //根据数据库渲染页面
    $.ajax({
        url: "http://localhost:3000/article/get",
        type: "GET",
        success: function (msg) {
            console.log("成功")
            var data;
            if (typeof msg === 'string') {
                data = $.parseJSON(msg);
            } else if (typeof msg === 'object') {
                data = msg;
            }
            $(data).each(function (i) {
                $('#articleShowContent').append(`
                <tr>
                    <td><input type="checkbox" class="articleSelectbox" dataId="` + data[i].id + `"></td>
                    <td>` + data[i].id + `</td>
                    <td>` + data[i].tags + `</td>
                    <td>` + data[i].title + `</td>
                    <td>` + data[i].author + `</td>
                    <td>` + data[i].time + `</td>
                    <td><span class="fabu articleFabu">` + statusFilter(data[i].status) + `</span></td>
                    <td><span class="fabu lanse articleBJ" dataXulie="` + i + `" dataId="` + data[i].id + `" data-toggle="modal" data-target="#myModal_articleAdd"> <i class="glyphicon glyphicon-pencil"></i> 编辑</span>
                    <span class="fabu hongse articleDL" dataId="` + data[i].id + `"> <i class="glyphicon glyphicon-trash"></i> 删除</span></td>
                </tr>
                `)
                statusFilter(data[i].status, i);
            })
            //编辑按钮功能
            $('.articleBJ').on('click', function () {
                //获取ID
                var id = $(this).attr('dataId');
                // console.log(id);
                var i = $(this).attr('dataXulie')
                //改变模态框数据
                $('#Modal_article_title').html('添加文章');
                //文章标题框
                $('#Modal_article_tit').val(data[i].title);
                //发布人
                $('#Modal_article_author').val(data[i].author);
                //文章内容
                $('#Modal_article_content').val(data[i].content);
                //标签内容
                $('#Modal_article_tagChecked').html(data[i].tags);
                $('#Modal_article_tagChecked').attr('value', data[i].tagsId);
                //是否发布
                if (data[i].status == 'true') {
                    $('#articleFabu').attr('checked', 'checked')
                }
                //改变模态框确定按钮事件
                //移除已有事件
                $('#articleSure').off();
                //模态框确认按钮点击事件
                $('#articleSure').on('click', function () {
                    //获取数据
                    var ischeck = $('#articleFabu').is(':checked');
                    ischeck = ischeck.toString();
                    var data2 = {
                        'id': id,
                        'title': $('#Modal_article_tit').val(),
                        'author': $('#Modal_article_author').val(),
                        'content': $('#Modal_article_content').val(),
                        'tagsId': $('#Modal_article_tagChecked').attr('value'),
                        'tags': $('#Modal_article_tagChecked').html(),
                        'status': ischeck
                    };
                    var params = JSON.stringify(data2);
                    console.log(params);
                    //发起请求
                    $.ajax({
                        url: "http://localhost:3000/article/post",
                        data: params,
                        type: "POST",
                        success: function (data, textStatus, jqXHR) {}
                    })
                    //重载页面
                    loadInner('#articleList');
                    //关闭模态框
                    $('#myModal_articleAdd').modal('hide');
                })
            })
            //单个删除按钮功能
            $('.articleDL').on('click', function () {
                var data = [$(this).attr('dataId')];
                var params = JSON.stringify(data)
                $.ajax({
                    url: "http://localhost:3000/article/delete",
                    data: params,
                    type: "POST",
                    success: function (data, textStatus, jqXHR) {

                    }
                })
                //重载页面
                loadInner('#articleList');
            })
            //全选复选框选择事件
            $('#articleSelectboxAll').on('click', function () {
                if ($('#articleSelectboxAll').is(':checked')) {
                    $('.articleSelectbox').prop('checked', 'checked')
                } else {
                    $('.articleSelectbox').removeAttr('checked')
                }
            })
            //批量删除按钮
            $('#articleDeleteAll').on('click', function () {
                var data = [];
                $.each($('.articleSelectbox:checked'), function (i, val) {
                    data.push($(val).attr('dataId'));
                })
                console.log(data);
                var params = JSON.stringify(data)
                $.ajax({
                    url: "http://localhost:3000/article/delete",
                    data: params,
                    type: "POST",
                    success: function (data, textStatus, jqXHR) {

                    }
                })
                //重载页面
                loadInner('#articleList');
            })
            //查询功能实现(讲道理这个是后端搞得)
            //思路，如果有输入就查询，没有就跳过该条件，将所有条件查询结果的id push进同一个数组，取重复的部分,判断最大重复的个数与已有文字输入的框的个数是否一致，是则输出
            //寻找重复的方法
            function findRepeat(arr) {
                var hash = {}; //利用hash 来记录次数
                var m = 1; //现在的最大次数
                var trueEl = []; //最大的元素，可能出现不止一个最大元素，所以为数组
                for (var i = 0, len = arr.length; i < len; i++) {
                    var el = arr[i];
                    var uniqueEl = typeof (el) + el; // 为了区分 1 和 '1'
                    if (!hash[uniqueEl]) { //利用对象的hash检验是否元素重复
                        hash[uniqueEl] = 1;
                    } else {
                        hash[uniqueEl]++;
                    }
                    if (hash[uniqueEl] == m) {
                        trueEl.push(el); //把当前最大次数的元素放到数组里
                    } else if (hash[uniqueEl] > m) {
                        trueEl = []; //清空数组
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
            $('#articleSearch').on('click', function () {
                //创建一个数组用来保存文章id
                var articleArr = [];
                var count = 0;
                //根据文章id查询
                if ($('#articleSearch_id').val()) {
                    count++;
                    $.each(data, function (i, val) {
                        //console.log(val.id)
                        if ($('#articleSearch_id').val() == val.id) {
                            articleArr.push(val.id);

                        }
                    })
                }
                //根据作者名字查询
                if ($('#articleSearch_author').val()) {
                    count++;
                    $.each(data, function (i, val) {
                        //console.log(val.id)
                        if ($('#articleSearch_author').val() == val.author) {
                            articleArr.push(val.id)
                        }
                    })
                }
                //根据文章标题查询
                if ($('#articleSearch_title').val()) {
                    count++;
                    $.each(data, function (i, val) {
                        //console.log(val.id)
                        if ($('#articleSearch_title').val() == val.title) {
                            articleArr.push(val.id)
                        }
                    })
                }
                //根据文章标签查询
                if ($('#tagChecked').attr('value') != '') {
                    console.log($('#tagChecked').attr('value'))
                    count++;
                    $.each(data, function (i, val) {
                        if ($('#tagChecked').attr('value') == val.tagsId) {
                            articleArr.push(val.id)
                            console.log(val.id)
                        }
                    })
                }
                var result = findRepeat(articleArr);
                if (articleArr.length != 0) {
                    if (count == (result.maxcount)) {
                        $('#articleShowContent').html('');
                        //根据id渲染数据
                        $.each(result.arr, function (i, val1) {
                            //console.log(val1);
                            $.each(data, function (j, val2) {
                                if (val1 == val2.id) {
                                    $('#articleShowContent').append(`
                                        <tr>
                                            <td><input type="checkbox" class="articleSelectbox" dataId="` + val2.id + `"></td>
                                            <td>` + val2.id + `</td>
                                            <td>` + val2.tags + `</td>
                                            <td>` + val2.title + `</td>
                                            <td>` + val2.author + `</td>
                                            <td>` + val2.time + `</td>
                                            <td><span class="fabu articleFabu">` + statusFilter(val2.status) + `</span></td>
                                            <td><span class="fabu lanse articleBJ" dataXulie="` + i + `" dataId="` + val2.id + `" data-toggle="modal" data-target="#myModal_articleAdd"> <i class="glyphicon glyphicon-pencil"></i> 编辑</span>
                                            <span class="fabu hongse articleDL" dataId="` + val2.id + `"> <i class="glyphicon glyphicon-trash"></i> 删除</span></td>
                                        </tr>
                                        `)
                                    statusFilter(data[i].status, i);
                                }
                            })
                        })
                    } else {
                        $('#articleShowContent').html('');
                    }
                } else {
                    //重载页面
                    loadInner('#articleList');
                }
                // console.log(count);
                // console.log(result.maxcount);
                // console.log(result.arr);
                // console.log(articleArr);
            })
        }
    })
    //添加按钮
    $('#articleAdd').on('click', function () {
        //改变模态框样式
        $('#Modal_article_title').html('添加文章');
        //重置模态框确认按钮
        $('#articleSure').off();
        //模态框确认按钮点击事件
        $('#articleSure').on('click', function () {
            //获取数据
            var ischeck = $('#articleFabu').is(':checked');
            ischeck = ischeck.toString();
            var data = {
                'title': $('#Modal_article_tit').val(),
                'author': $('#Modal_article_author').val(),
                'content': $('#Modal_article_content').val(),
                'tagsId': $('#Modal_article_tagChecked').attr('value'),
                'tags': $('#Modal_article_tagChecked').html(),
                'status': ischeck
            };
            var params = JSON.stringify(data);
            console.log(params);
            //发起请求
            $.ajax({
                url: "http://localhost:3000/article/put",
                data: params,
                type: "POST",
                success: function (data, textStatus, jqXHR) {}
            })
            //重载页面
            loadInner('#articleList');
            //关闭模态框
            $('#myModal_articleAdd').modal('hide');
        })
    })
})