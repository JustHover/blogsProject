//存放消息
var message = {
    succeed: function (data) {
        return {
            state: 200,
            data: data
        }
    },
    false : function(msg,code){
        return {
            code: code||100,
            msg,msg
        }
    }
};
//暴露接口
module.exports = message;