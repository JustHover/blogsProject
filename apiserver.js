//建立依赖
var http = require('http');
var mysql = require('./mysql');
var message = require('./message');
var express = require('express');
var app = express();
var url = require('url');
var router = express.Router()
var querystring = require('querystring');
var fs = require('fs')
let uuid = () => {  //生成uuid方法
    let s = [];
    let hexDigits = "0123456789abcdef";
    for (let i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    let uuid = s.join("");
    return uuid;
};

var onRequest = function (req, res) {
    //解决跨域
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.writeHead(200, { 'content-Type': 'application/json' });
    //获取url
    var urlx = url.parse(req.url).pathname;
    //console.log(req.method);
    //console.log(urlx);
    //接口
    switch (urlx) {
        //文章接口
        //增
        case '/article/put':
            req.on('data', function (data) {
                var data = JSON.parse(data);
                var values = [data.tags, data.tagsId, data.title, data.author, data.status, data.content];
                mysql.query('INSERT INTO article(tags,tagsId,title,author,status,content)values(?,?,?,?,?,?)', values, function (err, r) {
                    //console.log(err)
                })
                res.end();
            })
            break;
        //删
        case '/article/delete':
            req.on('data', function (data) {
                var values = JSON.parse(data).toString();
                console.log(values)
                var sqlDelete = "DELETE FROM article WHERE id in (" + values + ")";
                mysql.query(sqlDelete, function (err, r) {
                    res.end(`{'data':'success'}`)
                    //console.log(err)
                })

            })
            break;
        //改
        case '/article/post':
            req.on('data', function (data) {
                var data = JSON.parse(data);
                console.log(data)
                var values = [data.tags, data.title, data.author, data.status, data.content, data.tagsId, data.id]
                var sqlUpdata = "UPDATE article SET tags=?,title=?,author=?,status=?,content=?,tagsId=? WHERE id =?";
                //console.log(sqlUpdata);
                mysql.query(sqlUpdata, values, function (err, r) {
                    res.end(`{'data':'success'}`)
                    console.log(err);
                })
            })
            break;
        //查
        case '/article/get':
            mysql.query('select * from article', function (err, r) {
                res.end(JSON.stringify(r));
            })
            break;
        //标签接口
        //增
        case '/tags/put':
            req.on('data', function (data) {
                var data = JSON.parse(data);
                var values = [data.tags];
                mysql.query('INSERT INTO tags(tags)values(?)', values, function (err, r) {
                    res.end(`{'data':'success'}`)
                })
            })
            break;
        //删
        case '/tags/delete':
            req.on('data', function (data) {
                var data = JSON.parse(data);
                console.log(data.id)
                var sqlDelete = "DELETE FROM tags WHERE id=" + data.id;
                mysql.query(sqlDelete, function (err, r) {
                    res.end(`{'data':'success'}`)
                })

            })
            break;
        //改
        case '/tags/post':
            req.on('data', function (data) {
                var data = JSON.parse(data);
                var values = [data.tags, data.id]
                var sqlUpdata = "UPDATE tags SET tags=? WHERE id =?";
                console.log(sqlUpdata);
                mysql.query(sqlUpdata, values, function (err, r) {
                    res.end(`{'data':'success'}`)
                    console.log(err);
                })

            })
            break;
        //查
        case '/tags/get':
            mysql.query('select * from tags', function (err, r) {
                res.end(JSON.stringify(r));
            })
            break;
        //评论管理接口
        //增
        case '/ob/put':
            req.on('data', function (data) {
                var data = JSON.parse(data);
                var values = [data.observer, data.content];
                mysql.query('INSERT INTO ob(observer,content)values(?,?)', values, function (err, r) {
                    //console.log(err)
                })
                res.end();
            })
            break;
        //删
        case '/ob/delete':
            req.on('data', function (data) {
                var values = JSON.parse(data).toString();
                //console.log(values)
                var sqlDelete = "DELETE FROM ob WHERE id in (" + values + ")";
                mysql.query(sqlDelete, function (err, r) {
                    res.end(`{'data':'success'}`)
                    //console.log(err)
                })

            })
            break;
        //改
        case '/ob/post':
            req.on('data', function (data) {
                var data = JSON.parse(data);
                var values = [data.content, data.id]
                var sqlUpdata = "UPDATE ob SET content=? WHERE id =?";
                //console.log(sqlUpdata);
                mysql.query(sqlUpdata, values, function (err, r) {
                    res.end(`{'data':'success'}`)
                    //console.log(err);
                })
            })
            break;
        //查
        case '/ob/get':
            mysql.query('select * from ob', function (err, r) {
                res.end(JSON.stringify(r));
                //console.log(r)
            })

            break;
        //用户数据接口
        //增
        case '/user/put/userlist':

            req.on('data', function (data) {
                var data = JSON.parse(data);
                console.log(data)
                var values = [data.username, data.phone, data.email, data.sex, data.headimg, data.ip];
                mysql.query('INSERT INTO user(username, phone, email, sex, headimg,ip)values(?,?,?,?,?,?)', values, function (err, r) {
                    console.log(err)
                })
                res.end();
            })
            break;
        //删
        case '/user/delete':
            req.on('data', function (data) {
                var values = JSON.parse(data).toString();
                console.log(values)
                var sqlDelete = "DELETE FROM user WHERE id in (" + values + ")";
                mysql.query(sqlDelete, function (err, r) {
                    res.end(`{'data':'success'}`)
                    console.log(err)
                })

            })
            break;
        //改
        case '/user/post':
            req.on('data', function (data) {
                var data = JSON.parse(data);
                var values = [data.username, data.phone, data.email, data.sex, data.headimg, data.id]
                var sqlUpdata = "UPDATE user SET username=?,phone=?,email=?,sex=?,headimg=? WHERE id =?";

                mysql.query(sqlUpdata, values, function (err, r) {
                    res.end(`{'data':'success'}`)
                    console.log(err);
                })
            })
            break;
        //图片上传
        case '/user/put/img':
            req.setEncoding('binary');
            let body = '';   // 文件数据
            // 边界字符串
            let boundary = req.headers['content-type'].split('; ')[1].replace('boundary=', '');
            req.on('data', function (data) {
                body += data;
            })
            req.on('end', function () {
                let file = querystring.parse(body, '\r\n', ':');
                let fileInfo = file['Content-Disposition'].split('; ');
                let fileName = '';
                let ext = '';
                for (let value in fileInfo) {
                    if (fileInfo[value].indexOf("filename=") != -1) {
                        fileName = fileInfo[value].substring(10, fileInfo[value].length - 1);

                        if (fileName.indexOf('\\') != -1) {
                            fileName = fileName.substring(fileName.lastIndexOf('\\') + 1);
                        }
                        ext = fileName.substr(fileName.indexOf('.') + 1, fileName.length);
                    }
                }
                let upperBoundary = body.toString().indexOf(file['Content-Type'].substring(1)) + file['Content-Type'].substring(1).length;
                let binaryDataAlmost = body.toString().substring(upperBoundary).replace(/^\s\s*/, '').replace(/\s\s*$/, '');
                // 上传文件重命名
                let uuidFileName = `${uuid()}.${ext}`
                //上传文件 本地存放地址
                let uploadDirFile = `./img/${uuidFileName}`
                //创建文件流
                let writerStream = fs.createWriteStream(uploadDirFile);

                //开始 —— 写入文件到本地
                writerStream.write(binaryDataAlmost.substring(0, binaryDataAlmost.indexOf(`--${boundary}--`)), 'binary');
                //写入完成
                writerStream.end();
                writerStream.on('finish', function () {
                    //console.log("写入完成。");
                });
                res.end(uploadDirFile);
            });
            break;
        //查
        case '/user/get':
            mysql.query('select * from user where roleId = 99', function (err, r) {
                res.end(JSON.stringify(r));
                //console.log(r)
            })
            break;
        //管理员接口
        //增
        case '/admin/put':
            req.on('data', function (data) {
                var data = JSON.parse(data);
                console.log(data)
                var values = [data.username, data.phone, data.email, data.role, data.roleId, data.status];
                mysql.query('INSERT INTO user(username, phone, email, role, roleId,status)values(?,?,?,?,?,?)', values, function (err, r) {
                    console.log(err)
                })
                res.end();
            })
            break;
        //改
        case '/admin/post':
            req.on('data', function (data) {
                var data = JSON.parse(data);
                var values = [data.username, data.phone, data.email, data.role, data.roleId, data.status, data.id]
                console.log(values);
                var sqlUpdata = "UPDATE user SET username=?,phone=?,email=?,role=?,roleId=?,status=? WHERE id =?";

                mysql.query(sqlUpdata, values, function (err, r) {
                    res.end(`{'data':'success'}`)
                    console.log(err);
                })
            })
            break;
        //改密码
        case '/admin/post/pwd':
            req.on('data', function (data) {
                var data = JSON.parse(data);
                var values = [data.pwd, data.id]
                console.log(values);
                var sqlUpdata = "UPDATE user SET password=? WHERE id =?";
                mysql.query(sqlUpdata, values, function (err, r) {
                    res.end(`{'data':'success'}`)
                    console.log(err);
                })
            })
            break;
        //查
        case '/admin/get':
            mysql.query('select * from user where roleId != 99', function (err, r) {
                res.end(JSON.stringify(r));
                console.log(err)
            })
            break;
        //系统设置接口
        //查
        case '/systemset/get':
            mysql.query('select * from systemset', function (err, r) {
                res.end(JSON.stringify(r));
                console.log(err)
            })
            break;
        //改
        //改网站设置
        case '/systemset/post/website':
            req.on('data', function (data) {
                var data = JSON.parse(data);
                var values = [data.websiteName, data.websiteDomain, data.bufferTime, data.maxFileUpload, data.fileType, data.IndexTitle, data.MetaKeyWord, data.MetaCharactor, data.CopyrightInfo]
                console.log(values);
                var sqlUpdata = "UPDATE systemset SET websiteName=?,websiteDomain=?,bufferTime=?,maxFileUpload=?,fileType=?,IndexTitle=?,MetaKeyWord=?,MetaCharactor=?,CopyrightInfo=?";
                mysql.query(sqlUpdata, values, function (err, r) {
                    res.end(`{'data':'success'}`)
                    console.log(err);
                })
            })
            break;


        //改邮件
        case '/systemset/post/email':
            req.on('data', function (data) {
                var data = JSON.parse(data);
                var values = [data.SMTPserver, data.SMTPport, data.SenderMailbox, data.SenderPetName, data.MailboxPW]
                console.log(values);
                var sqlUpdata = "UPDATE systemset SET SMTPserver =?, SMTPport =?, SenderMailbox =?, SenderPetName =?, MailboxPW =?";
                mysql.query(sqlUpdata, values, function (err, r) {
                    res.end(`{'data':'success'}`)
                    console.log(err);
                })
            })
            break;
            //我的
        case '/mine/post':
        req.on('data', function (data) {
            var data = JSON.parse(data);
            console.log(data);
            var values = [data.username, data.phone, data.email, data.sex, data.tips, data.headimg, data.role, data.petName,data.id]
            var sqlUpdata = "UPDATE user SET username=?,phone=?,email=?,sex=?,tips=?,headimg=?,role=?,petName=? WHERE id =?";

            mysql.query(sqlUpdata, values, function (err, r) {
                res.end()
                console.log(err);
            })
        })
        break;
    }
}

//创建服务器
var server = http.createServer(onRequest);
server.listen(3000);