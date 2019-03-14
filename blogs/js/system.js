var user = decodeURI(getCookie("username"));
$(".nameTop").html('<a href="edituser.html">' + user + '</a>' + ' <span class="caret"></span>')

function getCookie(sName) {
    var aCookie = document.cookie.split('; ');
    for (var i = 0; i < aCookie.length; i++) {
        var aCrumb = aCookie[i].split('=');
        if (sName == aCrumb[0])
            return decodeURI(aCrumb[1]);
    }
    return '';
}
$(function () {

    //js初始化
    toastr.options.positionClass = 'toast-center-center';
    // nav收缩展开
    $('.nav-item>a').on('click', function () {
        if (!$('.nav').hasClass('nav-mini')) {
            if ($(this).next().css('display') == "none") {
                //一级未展开
                $('.nav-item').children('ul').slideUp(300);
                $(this).next('ul').slideDown(300);
                $(this).children('i').eq(1).removeClass("nav-more").addClass('nav-more2')
                // $(this).parent('li').addClass('nav-show').siblings('li').removeClass('nav-show');
            } else {
                //收缩已展开
                $(this).next('ul').slideUp(300);
                $(this).children('i').eq(1).removeClass("nav-more2").addClass('nav-more')
                // $('.nav-item.nav-show').removeClass('nav-show');
            }
        }
    });
    $(".li-item>a").on('click', function () {
        if ($(this).next().css('display') == "none") {
            //二级未展开
            $('.li-item').children('ul').slideUp(300);
            $(this).next('ul').slideDown(300);
            $(this).children('i').eq(0).removeClass("nav-more").addClass('nav-more2');

        } else {
            $(this).next('ul').slideUp(300);
            // $(".li-item.nav-show").removeClass('nav-show');
            $(this).children('i').eq(0).removeClass("nav-more2").addClass('nav-more');
        }
    })
    //nav-mini切换
    $('#mini').on('click', function () {
        if (!$('.nav').hasClass('nav-mini')) {
            $('.nav-item.nav-show').removeClass('nav-show');
            $('.nav-item').children('ul').removeAttr('style');
            $('.nav').addClass('nav-mini');
            $("#topName").css("display", "none");
        } else {
            ;
            $('.nav').removeClass('nav-mini');
            setTimeout(function () {
                $("#topName").show();
            }, 200);
        }
    });

});
//加载函数
function loadInner(sId) {
    var sId = window.location.hash;
    var path, pathJS;
    switch (sId) {
        case '#articleList':
            path = 'htmls/articleList.html';
            pathJS = 'js/scripts/articleList.js';
            $('#titleTop').html(`
                <span class="zhuye"> 主页 </span>
                <span> / </span>
                <span> 内容系统 </span>
                <span> / </span>
                <span> 文章列表 </span>
            `);
            break;
        case '#classify':
            path = 'htmls/classifyManage.html';
            pathJS = 'js/scripts/classifyManage.js';
            $('#titleTop').html(`
            <span class="zhuye"> 主页 </span>
            <span> / </span>
            <span> 内容系统 </span>
            <span> / </span>
            <span>  分类管理 </span>
        `);
            break;
        case '#comment':
            path = 'htmls/comment.html';
            pathJS = 'js/scripts/comment.js';
            $('#titleTop').html(`
                    <span class="zhuye"> 主页 </span>
                    <span> / </span>
                    <span> 内容系统 </span>
                    <span> / </span>
                    <span> 评论管理 </span>
                `);
            break;
        case '#userlist':
            path = 'htmls/userlist.html';
            pathJS = 'js/scripts/userlist.js';
            $('#titleTop').html(`
                    <span class="zhuye"> 主页 </span>
                    <span> / </span>
                    <span> 用户 </span>
                    <span> / </span>
                    <span> 网站用户 </span>
                `);
            break;
        case '#adminlist':
            path = 'htmls/adminlist.html';
            pathJS = 'js/scripts/adminlist.js';
            $('#titleTop').html(`
                    <span class="zhuye"> 主页 </span>
                    <span> / </span>
                    <span> 用户 </span>
                    <span> / </span>
                    <span>  后台管理员 </span>
                `);
            break;
        case '#siteSettings':
            path = 'htmls/siteSettings.html';
            pathJS = 'js/scripts/siteSettings.js';
            $('#titleTop').html(`
                <span class="zhuye"> 主页 </span>
                <span> / </span>
                <span> 设置 </span>
                <span> / </span>
                <span> 网站设置 </span>
            `);
            break;
        case '#grundInfo':
            path = 'htmls/grundInfo.html';
            pathJS = 'js/scripts/grundInfo.js';
            $('#titleTop').html(`
                    <span class="zhuye"> 主页 </span>
                    <span> / </span>
                    <span> 设置 </span>
                    <span> / </span>
                    <span> 我的资料 </span>
                `);
            break;
        case '#changePwd':
            path = 'htmls/changePwd.html';
            pathJS = 'js/scripts/changePwd.js';
            $('#titleTop').html(`
                <span class="zhuye"> 主页 </span>
                <span> / </span>
                <span> 设置 </span>
                <span> / </span>
                <span> 修改密码 </span>
            `);
            break;
    };
    //加载对应内容
    $('#main').load(path, function () {
        $('#JSwenjian').html(`<script src="` + pathJS + `"></script>`);
    });
};
//页面切换设置
$('.jumpMenu').on('click', 'li', function () {
    //获取ID的值
    var sId = $(this).attr('id');
    //设置锚点
    window.location.hash = sId;
    loadInner(sId);
});

//分页器
var lis = document.getElementsByClassName('tab');
for (var i = 0; i < lis.length; i++) {
    lis[i].onclick = function () {
        var that = this;
        for (var i = 0; i < lis.length; i++) {
            lis[i].classList.remove('active')
            this.classList.add('active')
        }
    }
}

function statusFilter(status, i) {
    switch (status) {
        case 'true':
            return '已发布';
            break;
        case 'false':
            $('.articleFabu').eq(i).css('background-color', 'rgb(255,0,0)');
            $('.adminFabu').eq(i).css('background-color', 'rgb(255,0,0)');
            return '未发布';
            break;
    }
}

function sexFilter(sex) {
    switch (sex) {
        case '0':
            return '男';
            break;
        case '1':
            return '女';
            break;
    }
}
//退出
$("#tuichu").click(function () {
    toastr.info("欢迎" + user + "下次登录!");
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
    setTimeout(function () {
        location.href = '/blogsProject/blogs/';
    }, 1200);
})