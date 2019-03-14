let cookie = {
    /*
    设置cookie 
    key = value 必填 
    其它参数选填
    */
    set:function(key,value,expires,path,domain,secure){
       var cookieText = encodeURIComponent(key)+'='+encodeURIComponent(value);
       if(expires instanceof Date){
          cookieText += ';expires='+expires;
       }
       if(path){
          cookieText += ';path='+path;
       }
       if(domain){
          cookieText += ';domain='+domain;
       }
       if(secure){
          cookieText +=';srcure';
       }
       document.cookie = cookieText;
    },
    get:function(key){
       var cookieKey = encodeURIComponent(key) + '=';
       var cookieStart = document.cookie.indexOf(cookieKey);
    //    console.log(cookieStart);
       var cookieValue = null;

       if(cookieStart!=-1){
          var cookieEnd = document.cookie.indexOf(';',cookieStart);
          if(cookieEnd==-1){
             cookieEnd = document.cookie.length;
          }
          cookieValue = decodeURIComponent(document.cookie.substring(cookieStart+cookieKey.length,cookieEnd));
       }
       return cookieValue
    },
    remove:function(key,path){  
           document.cookie = key + "=;expires="+new Date(0)+";path="+path
    },
    setCookieDate:function(day){
         if(typeof day == 'number' && day > 0){
             var oDate =  new Date();
             oDate.setDate(oDate.getDate()+day);
         } else {
             throw new Error('day必须是数字,且必须大于0')
         }
         return oDate;
    }
}