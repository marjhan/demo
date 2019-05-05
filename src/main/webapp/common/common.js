/**
 * Created by xuebj07252 on 2015/2/13.
 */
define(["jquery","jquery.cookie","avalon","jquery.blockUI"],function ($){
    var appkey = '';
    var app_key = function(){
        $.ajax({
            type:"get",
            url:"../common/appkey.json?random=" + Math.random(),
            dataType:"json",
            async : false,
            data : {},
            timeout:5000,
            success : function(result) {
            },
            error:function (XMLHttpRequest, textStatus, errorThrown){
                var result = eval('(' + XMLHttpRequest.responseText + ')');
                appkey = result["appkey"];
            }
        });
        return  appkey;
    }
    var defaults ={
        img_url:"/",
        page_type:"open",
        cms_url:"http://10.139.103.50",
        alertNode :$('<div class="con-pop"><div class="inner"><div class="title">提示<a class="close-btn"></a></div> <div class="details"><p></p></div></div></div>'),
        confirmNode:$('<div class="popUp-layer" style="display:block; "><span class="close" title="关闭" id="popClose">关闭</span><div class="popUp-layer-wrap"><div class="popUp-layer-content popUp-layer-contentticket"><p id="popContent"></p><div class="sub-btn"><a class="ui-btn btn-blue btn-radius" id="btn1"></a><a class="ui-btn btn-white btn-radius" id="btn2"></a></div></div></div></div>'),
        confirmNode_shop:$('<div class="popUp-layer" style="display:block;"><span class="close" title="关闭" id="popClose">关闭</span><div class="popUp-layer-wrap"><div class="popUp-layer-content"><p id="popContent"></p><div class="sub-btn"><a class="ui-btn btn-white btn-radius" id="btn1"></a><a class="ui-btn btn-red btn-radius" id="btn2"></a></div></div></div></div>'),
        baseUrl:/*"/test/"*/"/skyjoy/",/*/front/itn/website/*/
        /*邮箱地址配置*/
        hash:{
            'vip.qq.com':'http://mail.qq.com',
            'qq.com': 'http://mail.qq.com',
            'gmail.com': 'http://mail.google.com',
            'sina.com': 'http://mail.sina.com.cn',
            '163.com': 'http://mail.163.com',
            '126.com': 'http://mail.126.com',
            'yeah.net': 'http://www.yeah.net/',
            'sohu.com': 'http://mail.sohu.com/',
            'tom.com': 'http://mail.tom.com/',
            'sogou.com': 'http://mail.sogou.com/',
            '139.com': 'http://mail.10086.cn/',
            'hotmail.com': 'http://www.hotmail.com',
            'live.com': 'http://login.live.com/',
            'live.cn': 'http://login.live.cn/',
            'live.com.cn': 'http://login.live.com.cn',
            '189.com': 'http://webmail16.189.cn/webmail/',
            'yahoo.com.cn': 'http://mail.cn.yahoo.com/',
            'yahoo.cn': 'http://mail.cn.yahoo.com/',
            'eyou.com': 'http://www.eyou.com/',
            '21cn.com': 'http://mail.21cn.com/',
            '188.com': 'http://www.188.com/',
            'foxmail.com': 'http://www.foxmail.com',
            'hundsun.com':"http://mail.hundsun.com/"
        },
        array:[
            'hundsun.com',
            'qq.com',
            'sina.com',
            '163.com',
            'sohu.com',
            'gmail.com',
            'hotmail.com',
            'yahoo.cn',
            'foxmail.com'            
        ]
    };
    return {
        key:"",
        /*获取操作系统*/
        detectOS:function(){
            var sUserAgent = navigator.userAgent;
            var isWin = (navigator.platform == "Win32") || (navigator.platform == "Windows");
            var isMac = (navigator.platform == "Mac68K") || (navigator.platform == "MacPPC") || (navigator.platform == "Macintosh") || (navigator.platform == "MacIntel");
            if (isMac) return "Mac";
            var isUnix = (navigator.platform == "X11") && !isWin && !isMac;
            if (isUnix) return "Unix";
            var isLinux = (String(navigator.platform).indexOf("Linux") > -1);
            if (isLinux) return "Linux";
            if (isWin) {
                var isWin2K = sUserAgent.indexOf("Windows NT 5.0") > -1 || sUserAgent.indexOf("Windows 2000") > -1;
                if (isWin2K) return "Win2000";
                var isWinXP = sUserAgent.indexOf("Windows NT 5.1") > -1 || sUserAgent.indexOf("Windows XP") > -1;
                if (isWinXP) return "WinXP";
                var isWin2003 = sUserAgent.indexOf("Windows NT 5.2") > -1 || sUserAgent.indexOf("Windows 2003") > -1;
                if (isWin2003) return "Win2003";
                var isWinVista= sUserAgent.indexOf("Windows NT 6.0") > -1 || sUserAgent.indexOf("Windows Vista") > -1;
                if (isWinVista) return "WinVista";
                var isWin7 = sUserAgent.indexOf("Windows NT 6.1") > -1 || sUserAgent.indexOf("Windows 7") > -1;
                if (isWin7) return "Win7";
            }
            return "other";
        },
        //设备检测  移动端返回true，pc端返回false
        detectmob:function () {  
            if( navigator.userAgent.match(/Android/i)  
            || navigator.userAgent.match(/webOS/i)  
            || navigator.userAgent.match(/iPhone/i)  
            || navigator.userAgent.match(/iPad/i)  
            || navigator.userAgent.match(/iPod/i)  
            || navigator.userAgent.match(/BlackBerry/i)  
            || navigator.userAgent.match(/Windows Phone/i)  
            ){  
                return true;  
            }  
            else {  
                return false;  
            }  
        },  
        getImageUrl:function(){
            return defaults.img_url;
        },
        getImageUrlApi:function(){
            return defaults.img_url_api;
        },
        getPage_type:function(){
            return defaults.page_type;
        },
        /*屏幕分辨率*/
        getScreen:function(){
            return "高："+window.screen.height+"px;宽："+window.screen.width+"px";
        },
        getBrowser: function(){
            return getBrowserInfo().toString();
        },
        obj2string:function (o){
            var r=[];
            if(typeof o=="string"){
                return "\""+o.replace(/([\'\"\\])/g,"\\$1").replace(/(\n)/g,"\\n").replace(/(\r)/g,"\\r").replace(/(\t)/g,"\\t")+"\"";
            }
            if(typeof o=="object"){
                if(!o.sort){
                    for(var i in o){
                        r.push(i+":"+this.obj2string(o[i]));
                    }
                    if(!!document.all&&!/^\n?function\s*toString\(\)\s*\{\n?\s*\[native code\]\n?\s*\}\n?\s*$/.test(o.toString)){
                        r.push("toString:"+o.toString.toString());
                    }
                    r="{"+r.join()+"}";
                }else{
                    for(var i=0;i<o.length;i++){
                        r.push(obj2string(o[i]))
                    }
                    r="["+r.join()+"]";
                }
                return r;
            }
            return o.toString();
        },
        isLogin:function(){
            var nikeName="";
            _ajax({
                url:"user/islogin.json",
                async:false,
                callback:function (r){
                	if(r!=false){
                		if(r.realName){
							nikeName=$.trim(r.realName);          
                        }else{
                        	nikeName=$.trim(r.realName);
                        }
                	}
                	
                }
            });
            return nikeName;
        },
        options:defaults,
        /**
         * 统一抽象的ajax方法
         * dataType： 只能为json格式数据，如果返回的不是json格式，认为是异常信息
         * @param options(Json Object) {
         *          url :请求地址
         *          type：请求类型，如post、get
         *          async：同步还是异常 默认true 表示异步
         *          callback：成功之后回调方法
         *          failure：出现异常时候回调方法
         *      }
         * @returns
         */
        ajax:function (options){
            _ajax(options);
        },
        /**
         * 展示普通弹出框
         * @param options(Json Object){
         *      message:弹出层内容 jQuery对象或字符串
         *      fixed：是否固定最小高度和宽度，默认true 表示需要固定
         *          以下参数只在 fixed 为true时有效
         *          width:最小宽度 单位：像素
         *          height：最小高度 单位：像素
         *      }
         * @returns
         */
        alert:function (options){
            _showAlert(options);
        },
        /**
         * 获取rsa密码
         * @param callback
         */
        getRSA:function (){
            if(RSAUtils){
                var that = this;
                that.ajax({
                    url:"user/getModulusExponent.json",
                    type:"GET",
                    callback:function (result){
                        that.key = RSAUtils.getKeyPair(result.exponent, '', result.modulus);
                    }
                })
            }
        },
        /**
         * 加密字符串
         * @param str
         * @returns {*}
         */
        encoding:function (str){
            if(RSAUtils && this.key != ""){
                return RSAUtils.encryptedString(this.key,str);
            }else{
                return str;
            }
        },
        /*获取链接地址上的参数*/
        getUrlParam :function(name)
        {
            var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r!=null) return r[2]; return "";
        },

        /*获取链接地址上的参数*/
        getUrlParam2 :function(name)
        {
            var result= "";
            //var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
            var url = window.location.hash;
            if(url.indexOf("?") > -1){
                var r = url.substr(url.indexOf("?")+1+name.length+1);
                 result =r;
            }
            return result;
        },
        /*获取cms地址*/
        getCms:function(){
          return defaults.cms_url;
        },
      
        /*验证中提示成功信息*/
        showSuccess:function(el){
            $(el).parent("div").append('<div class="sl-error"><span class="ui-icon ui-icon-right"></span></div>');
        },
        /*验证中提示错误信息*/
        showError:function(el, data,msg){
            $(el).parent("div").find(".sl-error-remote").remove();
            $(el).parent("div").find(".sl-error").remove();
            var next = $(el).parent("div").find(".sl-error").length;
            if(msg){
                $(el).parent("div").append('<div class="sl-error"><span class="ui-icon ui-icon-error"></span><p>'+msg+'</p>');
                $(el).addClass("error");
            }else if(data){
                if(!next>0){
                    $(el).parent("div").append('<div class="sl-error"><span class="ui-icon ui-icon-error"></span><p>'+data.getMessage()+'</p>');
                }
            }
        },


        alignCenter: function(id){
            var isIE=window.XMLHttpRequest?false:true;
            var aIsIE={};
            /*var isIE=window.XMLHttpRequest?false:true;
            var aIsIE={};
            aIsIE.top=document.documentElement.scrollTop;
            aIsIE.left=document.documentElement.scrollLeft;
            var width=document.documentElement.clientWidth;
            var height=document.documentElement.clientHeight;
            var oDiv=document.getElementById(id);
            oDiv.style.top=aIsIE.top+(height-oDiv.offsetHeight)/2+'px';
            oDiv.style.left=aIsIE.left+(width-oDiv.offsetWidth)/2+'px';*/
            if(isIE){
                aIsIE.top=document.documentElement.scrollTop;
                aIsIE.left=document.documentElement.scrollLeft;
                var width=document.documentElement.clientWidth;
                var height=document.documentElement.clientHeight;
                var oDiv=document.getElementById(id);
                oDiv.style.top=aIsIE.top+(height-oDiv.offsetHeight)/2+'px';
                oDiv.style.left=aIsIE.left+(width-oDiv.offsetWidth)/2+'px';
            }else{
                var oDiv=document.getElementById(id);
                var top = ($(window).height() - $(oDiv).height())/2;
                var left = ($(window).width() - $(oDiv).width())/2;
                var scrollTop = $(document).scrollTop();
                var scrollLeft = $(document).scrollLeft();
                oDiv.style.top=top + scrollTop+'px';
                oDiv.style.left=left + scrollLeft+'px';
            }
        },
        /*验证中移除错误信息*/
        removeError:function(el){
            $(el).parent("div").find(".sl-error").remove();
            $(el).removeClass('error');
        },
        /**
         * 确认框
         * @param options(json object){
         *   message:弹出层内容 jQuery对象或字符串
         *   btn:[{
         *        tip:按钮名称,
         *        event:function (){} 按钮点击事件
         *   }，{
         *      tip: 按钮名称
         *      event: function (){} 按钮点击事件
         *   }]
         * }
         */
        confirmNode_shop:function(options){
            var that = this;
            var btn = options.btn;
            var message = options.message;
            var m = defaults.confirmNode_shop;
            m.find("#popClose").unbind("click").click(function (){
                that.closeAlert();
            });
            m.find("#popContent").html(message);
            m.find("#btn1").html(btn[0].tip).unbind("click").click(function (){
                btn[0].event();
                that.closeAlert();
            });
            m.find("#btn2").html(btn[1].tip).unbind("click").click(function (){
                btn[1].event();
                that.closeAlert();
            });
            _showAlert({
                message:m,
                onOverlay:false,css:{
                    border:"0px",
                    backgroundColor:"none",
                    textAlign:"center"
                }
            });
        },
        confirm :function (options){
            var that = this;
            var btn = options.btn;
            var message = options.message;
            var m = defaults.confirmNode;
            m.find("#popClose").unbind("click").click(function (){
                that.closeAlert();
            });
            m.find("#popContent").html(message);
            m.find("#btn1").html(btn[0].tip).unbind("click").click(function (){
                btn[0].event();
                that.closeAlert();
            });
            m.find("#btn2").html(btn[1].tip).unbind("click").click(function (){
                btn[1].event();
                that.closeAlert();
            });
            _showAlert({
                message:m,
                onOverlay:false,css:{
                border:"0px",
                    backgroundColor:"none",
                    textAlign:"center"
                }
            });
        },
        /*提示框  关闭 操作添加*/
        confirm_c :function (options){
            var that = this;
            var btn = options.btn;
            var message = options.message;
            var m = defaults.confirmNode;
            m.find("#popClose").unbind("click").click(function (){
                that.closeAlert(options.onUnblock);
            });
            m.find("#popContent").html(message);
            m.find("#btn1").html(btn[0].tip).unbind("click").click(function (){
                btn[0].event();
                that.closeAlert();
            });
            m.find("#btn2").html(btn[1].tip).unbind("click").click(function (){
                btn[1].event();
                that.closeAlert();
            });
            _showAlert({
                message:m,
                onOverlay:false,css:{
                    border:"0px",
                    backgroundColor:"none",
                    textAlign:"center"
                }
            });
        },
        /**
         * 展示数据加载进度条
         * @returns
         */
        loading:function (){
        _showAlert({message:$('<div class="loading"><img src="/image/loading.gif"/></div>'),onOverlay:false,css:{
            border:"0px",
            backgroundColor:"none",
            textAlign:"center"
        }});
        },
        /**
         * 展示Iframe型对话框
         * @param url
         * @param options(Json Object) {
             *          width:初始宽度 单位：像素
             *          height：初始高度 单位：像素
             *          top：弹出框距离页面顶部的距离，单位：百分比
             *      }
         * @returns
         */
        alertIframe:function (options){
            //默认宽度及高度
            var _popWidth = options.width || 640;
            var _popHeight =options.height || 100;
            //默认显示距离页面顶端高度百分百
            var _popTop = options.top || 20;
            //计算 宽度
            var _widowWidth = $(window).width();
            var _left = (_widowWidth - _popWidth) / 2 ;
            _show.apply(this,[{
                message:'加载中...',
                css:{
                    left : _left + 'px',
                    width : _popWidth + 'px',
                    height:_popHeight + 'px',
                    top : _popTop + '%'
                },
                onBlock:function (){
                    var $popWidow = $(this);
                    var iframe = _createIframe($popWidow);
                    iframe.src=options.url;
                    $popWidow.html(iframe);
                    if(options.onBlock){
                        options.onBlock($popWidow);
                    }
                }
            }]);
        },
        /**
         * 关闭弹出层
         * @param onUnblock(Function) 关闭弹出层之后回调方法
         * @returns
         */
        closeAlert:function(onUnblock){
            _close(onUnblock);
        },
        /**
         *
         * @param sValue
         * @returns {number} 0-1 弱 2 中 3 强
         */
        checkStrong:function (sValue){
            sValue = sValue.replace(/\s+/, "");
            var modes = 0;
            if (sValue.length < 6) return modes;
            if (/\d/.test(sValue)) modes++; //数字
            if (/[a-z]/.test(sValue)) modes++; //小写
            if (/[A-Z]/.test(sValue)) modes++; //大写
            if (/\W/.test(sValue)) modes++; //特殊字符
            return modes> 3?3:modes;
        },
        getHash:function(value){           
            return defaults.hash;
        },
        getArray:function(value){           
            return defaults.array;
        },
        checkEmail:function(value){
            var url = value.split('@')[1];            
            return defaults.hash[url];
        },
        /*对券商组合显示的处理 如 券商1，券商2等2家*/
        subName:function(str){
            if(str.length>9){
                var str2 = str.substring(0,9);
                return str2;
            }
            return str;
        },
        showX:function(str){
            var str1 = str.substring(0,3);
            var str2 = str.substring(str.length-4,str.length);
            return str1+"******"+str2;
        },
        /*把字符串转换成小数，如果是00.000，*/
        getPrice:function(singlePrice,time){
            var total = (parseFloat(singlePrice) * time).toString();
            if(total.indexOf(".")==-1){
                total += ".00"
            }
            return total;
        },
        totalPrice:function(total){
            var res = _toThousands(total);
            if(res.toString().indexOf(".")==-1){
                res += ".00"
            }
            return res;
        },
        /*totalPrice_c:function(total){
            var res = _toThousands(total);
            if(res.toString().indexOf(".")==-1){
                res += ".00"
            }
            return res;
        },*/
        toThousands:function(num) {
            var num = (num || 0).toString(),
                result = '';
            if(num.indexOf(".")!=-1){
                var num_t = num.split(".")[0];/*整数*/
                var num_l = num.split(".")[1];/*小数点后的值*/
                if(num_l.length<1||num_l.length == 1){
                    num_l +=0;
                }
            }else{
                var num_t = num;
                var num_l = "00";
            }
            while (num_t.length > 3) {
                result = ',' + num_t.slice(-3) + result;
                num_t = num_t.slice(0, num_t.length - 3);
            }
            if (num_t) { result = num_t + result; }
            return result+"."+num_l;
        },
        initTop:function(){
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
        },
        getUserId:function(){
            var userId = "";
            _ajax({
                url:"user/islogin.json",
                async:false,
                callback:function (r){
                    if(r.user_id){
                        userId=r.user_id;                        
                    }else{
                        userId="";
                    }
                    if(userId==""||userId == null){
                        if(window.location.href.indexOf("login")==-1){
                            $.cookie("_u_", window.location, { path: '/skyjoy', expires: 10 });
                        }else{
                            $.cookie("_u_", "", { path: '/skyjoy', expires: -1 });
                        }
                        window.location.href="/html/login_api/login.html";
                    }
                }
            });
            return userId;
        },
        alertNodePop:function(errinfo){
            defaults.alertNode.find("p").text(errinfo);
            _showAlert({message:defaults.alertNode});
        },
        /*提示信息弹窗*/
        tips:function(message,time){
            time=time==undefined?1000:time;
            $.blockUI({
                message: '<div class="con-pop" style="z-index:99999"><div class="inner"><div class="details"><p style="text-align: center">'+message+'</p></div></div></div>',
                timeout:  time,
                overlayCSS : {
                    opacity : 0.15,
                    cursor:"default"
                },
                css : {
                    left:'43%',
                    position : 'fixed',
                    border:"0px",
                    backgroundColor:"none",
                    cursor:"auto",
                    textAlign:"left"
                }
            });
        },
        check_imgcode:function(el,value){
            var flag = true;
            var ok = /^[a-z0-9]{4}$/i.test(value);
            $(el).parent().find(".sl-error").remove();
            if(!isEmpty(value)){
                $(el).parent().append('<div class="sl-error"><span class="ui-icon ui-icon-error"></span>请输入验证码</div>');
                flag=false;
            }else if(ok){
                _ajax({
                    url:"imageCode/validateImageCode.json",
                    data:{imageCode:value},
                    async:false,
                    callback:function (result){
                        if(result){
                            $(el).parent().find(".sl-error").remove();
                            flag=true;
                        }else{
                            $(el).parent().append('<div class="sl-error"><span class="ui-icon ui-icon-error"></span><p>验证码错误</p></div>');
                            $(el).parent().parent().find(".verifyImg").attr("src","/cloud/open/imageCode/getImageCode.json?time="+new Date().getTime());
                            flag=false;
                        }
                    }
                });
            }else{
                $(el).parent().append('<div class="sl-error"><span class="ui-icon ui-icon-error"></span><p>验证码格式不正确，请重新输入</p></div>');
                flag=false;
            }
            return flag;
        },
        /* *
         * 此函数用于两数相减。解决js相减出现不精确的bug
         * arg1是第一个数，arg2是第二个数
         * 用arg1 - arg2
         * toFixed()方法在0~20之间，之外会报错
         * */
        accSub:function(arg1, arg2) { 
		    var r1, r2, m, n; 
		    try { r1 = arg1.toString().split(".")[1].length } catch (e) { r1 = 0 } 
		    try { r2 = arg2.toString().split(".")[1].length } catch (e) { r2 = 0 } 
		    m = Math.pow(10, Math.max(r1, r2)); 
		    n = (r1 >= r2) ? r1 : r2; 
		    return ((arg1 * m - arg2 * m) / m).toFixed(n); 
		},
		/*判断是否为空 空false 非空true*/
	    isEmpty:function(value,data){
	        if(!value||value==null||value==""){
	            return false;
	        }
	        return true;
	    }
    }
    /*判断是否为空 空false 非空true*/
    function isEmpty(value,data){
        if(!value||value==null||value==""){
            return false;
        }
        return true;
    }
    function getBrowserInfo(){
        var agent = navigator.userAgent.toLowerCase() ;

        var regStr_ie = /(msie|trident) [\d.]+;/gi ;
        var regStr_ff = /firefox\/[\d.]+/gi
        var regStr_chrome = /chrome\/[\d.]+/gi ;
        var regStr_saf = /safari\/[\d.]+/gi ;
        //IE
        if(agent.indexOf("msie") > 0 )
        {
            return agent.match(regStr_ie) ;
        }

        //firefox
        if(agent.indexOf("firefox") > 0)
        {
            return agent.match(regStr_ff) ;
        }

        //Chrome
        if(agent.indexOf("chrome") > 0)
        {
            return agent.match(regStr_chrome) ;
        }

        //Safari
        if(agent.indexOf("safari") > 0 && agent.indexOf("chrome") < 0)
        {
            return agent.match(regStr_saf) ;
        }
        return "unknown";

    }
    function _toThousands(num) {
        var num = (num || 0).toString(), result = '';
        while (num.length > 3) {
            result = ',' + num.slice(-3) + result;
            num = num.slice(0, num.length - 3);
        }
        if (num) { result = num + result; }
        return result;
    }
    function _ajax(options){
        $.ajax({
            // url:options.url + "?random=" + Math.random(),
            type:/*"get"*/options.type || "post",
            url:defaults.baseUrl  + options.url + "?random=" + Math.random(),
            dataType:"json",
            async : (options.async != undefined) ? options.async : true,
            data : options.data || {},
            timeout:300000,
            success : function(result) {
                if(result.error_code || result.error_code == ""){
                    if(options.failure){
                        options.failure(result)
                    }else{
                        _callException(result);
                    }
                }else{
                    _callSuccess(options.callback,result);
                }
            },
            error:function (XMLHttpRequest, textStatus, errorThrown){
                if(XMLHttpRequest.readyState == 4 && (XMLHttpRequest.status == "200" || textStatus == "OK")){
                    _callError(options.failure,XMLHttpRequest.responseText);
                }else{
                     defaults.alertNode.find("p").text("调用数据失败，请稍后再试。");
                    _showAlert({message:defaults.alertNode});
                }
            }
        });
    }

    /*=============内部方法================*/
    /**
     * 调用成功之后 处理方法
     * @param callback(Function) 成功之后的回调方法
     * @param result 请求返回的结果集
     */
    function _callSuccess(callback,result){
        if(callback){
            callback(result.data);
        }
    }

    /**
     * 异常信息返回时调用，显示错误信息
     * @param result(JSON obj)
     */
    function _callException(result){
        defaults.alertNode.find("p").text(result.error_info);
        if(result.error_no == "291"){
            $.cookie("_u_", window.location, { path: '/skyjoy', expires: 10 });
            $.cookie("_a_","",{path: '/skyjoy',expires:-1});
            $.cookie("_n_","",{path: '/skyjoy',expires:-1});
            $.cookie("_t_","",{path: '/skyjoy',expires:-1});
            window.location.href="/login/login.html";
        }else{
            _showAlert({message:defaults.alertNode});
        }
    }

    /**
     * 出现异常时调用异常信息
     * @param failure(Function) 失败时回调方法
     * @param errorMessage(String) 异常信息
     *
     */
    function _callError(failure,errorMessage){
        if(failure){
            failure(errorMessage);
        }else{
            defaults.alertNode.find("p").html(errorMessage);
            _showAlert({message:defaults.alertNode});
        }
    }

    /**
     * 弹出框内部方法
     * @param options
     * @private
     */
    function _showAlert(options){
        var $m = options.message;
        var opts = $.extend({},options,{message:$m});
        if($.type($m) === "object"){//对象
            var css = _position(options);
            opts.css = opts.css || {};
            $.extend(opts.css,css);
        }
        _show(opts);
    }
    /**
     * 定位弹出层位置
     * @param options(Json Object) 同 showAlert 参数说明
     * @returns Json Object {
     *      left : 左边距离 单位：像素,
     *      width : 宽度 单位：像素,
     *      height: 高度 单位：像素,
     *      top : 距离顶部距离 单位：百分比,
     * }
     */
    function _position(options){
        var $m = options.message;
        //是否固定最小宽度及高度
        var fixed = options.fixed || true;
        //元素宽度
        var _popWidth = $m.width();
        //元素高度
        var _popHeight = $m.height();
        if(fixed){//处理固定情况的高度及宽度
            var _minWidth = options.width || 280;
            var _minHeight = options.height || 140;
            _popWidth = _popWidth < _minWidth ? _minWidth:_popWidth;
            _popHeight = _popHeight < _minHeight ? _minHeight:_popHeight;
        }
        //计算 高度和宽度
        var _widowWidth = $(window).width();
        //Loading为要显示的div
        var _popLeft = (_widowWidth - _popWidth) / 2 ;
        var _windowHeight = $(window).height();
        var _top = (_windowHeight - _popHeight) / 2;
        //最小距离顶部30px;
        _top = _top < 0 ? 30 : _top;
        var _popTop = Math.floor(_top/_windowHeight * 100);
        _popTop = _popTop <  0 ? 1:_popTop;
        return {
            "left" : _popLeft + 'px',
            "width" : _popWidth + 'px',
            "height":_popHeight + 'px',
            "top" : _popTop + '%',
            "z-index":9999999
        };
    }
    /**
     * 真正显示弹出层的方法
     * @params options{
     *      message:内容
     *      onBlock:function 显示alert之后调用的函数
     *      style:初始样式
     * }
     * @returns
     */
    function _show (options){
        var params = {
            message: options.message,
            overlayCSS : {
                opacity : 0.15,
                cursor:"default",                
                zIndex:9999998
            },
            css : $.extend({
                position : 'fixed',
                border:"0px",
                backgroundColor:"none",
                cursor:"auto",
                textAlign:"left",
            },options.css || {}),

            onBlock:options.onBlock || function(){}
        };
        if(options.onOverlay == undefined || options.onOverlay == true ){
            $.extend(params,{
                onOverlayClick:function (){
                    _close(options.onUnblock);
                }
            });
        }
        $.blockUI(params);
        options.message.find(".close-btn").click(function (){
            _close(options.onUnblock);
        });
    }
    /**
     * 关闭弹出层
     * @param onUnblock{function} 关闭弹出框之后调用的方法
     */
    function _close (onUnblock){
        $.unblockUI({
            fadeOut:700,
            onUnblock:onUnblock || function(){}
        });
    }
    
    /**
     * 创建一个iframe，用于展示弹出层内容
     * @param $popWidow(jQuery Object) 弹出框对象
     */
    function _createIframe($popWidow){
        var iframe = document.createElement("iframe");
        iframe.setAttribute("frameborder", "0", 0);
        iframe.width="100%";
        iframe.scrolling="no";
        iframe.height="100%";
        if (iframe.attachEvent){
            iframe.attachEvent("onload", function (){_adaptiveHeight($popWidow,iframe);});
        } else {
            iframe.onload = function (){_adaptiveHeight($popWidow,iframe);};
        }
        return iframe;
    }

    /**
     * 弹出层根据iframe 自适应高度
     * @param $popWidow(jQuery Object) 弹出框对象
     * @param iframe(DOM Object) iframe 对象
     */
    function _adaptiveHeight($popWidow,iframe){
        $popWidow.css("height",_getIframeBodyHeight(iframe));
    }
    /**
     * 获取iframe的高度，兼容IE firefox chrome
     * @param iframe(DOM Object) iframe 对象
     */
    function _getIframeBodyHeight(iframe){
        if(iframe.document){
            return $(iframe.document.body).height();
        }else if(iframe.contentDocument){
            return $(iframe.contentDocument.body).height();
        }

    }
});


