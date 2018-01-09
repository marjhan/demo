/*
 * @cnName 验证框架
 * @enName validation
 * @introduce
 *  <p>基于avalon ms-duplex2.0的强大验证框架，大家可以直接在avalon.duplexHooks添加验证规则，
 *  也可以在配置对象上的validationHooks中添加验证规则。</p>
 *  <p>验证规则如下定义:</p>
 *  ```javascript
 *   alpha_numeric: { //这是名字，不能存在-，因为它是这样使用的ms-duplex-int-alpha_numeric="prop"
 message: '必须为字母或数字',  //这是错误提示，可以使用{{expr}}插值表达式，但这插值功能比较弱，
 //里面只能是某个单词，两边不能有空格
 get: function(value, data, next) {//这里的传参是固定的，next为回调
 next(/^[a-z0-9]+$/i.test(value))//这里是规则
 //如果message有{{expr}}插值表达式，需要用data.data.expr = aaa设置参数，
 //aaa可以通过data.element.getAttribute()得到
 return value //原样返回value
 }
 },
 *  ```
 *  <p>在validationHooks中自定验证规则，每个都必须写<b style="color:red">message</b>
 *  (<span style="color:lightgreen">message不能为空字符串</span>)与<b style="color:red">get</b>方法。</p>
 *  <p>验证规则不惧怕任何形式的异步，只要你决定进行验证时，执行next方法就行。next 需要传入布尔。</p>
 *  ```javascript
 *      async: {
 message : "异步验证" , 
 get : function( value , data, next ){
 setTimeout(function(){
 next(true)
 },3000)
 return value
 }
 },
 *  ```
 * <p> 另一个例子:</p>
 *  ```javascript
 beijing: {
 message : "当前位置必须是在{{city}}" , 
 get : function( value ,data, next ){
     $.ajax({
     url : "http://ws.qunar.com/ips.jcp" ,
     dataType : "jsonp" ,
     jsonpCallback : "callback" ,
     success : function( data, textStatus, jqXHR  ){
     data.data.city = "北京"
     next( data.city == value )
     }
     })
     return value
     }
     }
 *  ```
 *  <p>注意，本组件是基于<code>avalon1.3.7</code>开发，如果是很旧的版本，可以使用avalon.validation.old.js，它一直兼容到avalon1.2.0。</p>
 *  <p>注意，本组件只能绑定在<code>form元素</code>上, &lt;form ms-widget="validation"&gt;&lt;/&gt</p>
 *  <p>验证框架提供了各式各样的回调，满足你最挑剔的需求：</p>
 *  ```javascript
 *  onSuccess, onError, onComplete, onValidateAll, onReset, onResetAll
 *  ```
 * <p>其中，前面四个是一个系列，它们都有1个参数，是一个对象数组，里面一些<code>验证规则对象</code>（如果成功，数组为空）； onReset是在元素获取焦点做重置工作的，如清理类名，
 * 清空value值，onResetAll是用于重置整个表单，它会在组件执行它辖下的所有元素的onReset回调后再执行。</p>
 * <p><b>验证规则对象</b>的结构如下：</p>
 * ```javascript
 * {
 *   element: element, //添加了ms-duplex绑定的元素节点，它应该位于form[ms-widget="validation"]这个元素下
 *   data: {city: "北京"}，
 *   message: '当前位置必须是在{{city}}',
 *   validateRule: "beijing",
 *   getMessage: function(){}//用户调用到方法即可以拿到完整的错误消息——“当前位置必须是在北京”
 * }
 * ```
 * <p>如果用户指定了<code>norequired</code>验证规则，如果input为空, 那么就会跳过之后的所有验证</p>
 */

define(["avalon","common/common","mmPromise"], function(avalon,common) {
    if (!avalon.duplexHooks) {
        throw new Error("你的版本少于avalon1.3.7，不支持ms-duplex2.0，请使用avalon.validation.old.js")
    }
//==========================avalon.validation的专有逻辑========================
    function idCard(val) {
        if ((/^\d{15}$/).test(val)) {
            return true;
        } else if ((/^\d{17}[0-9xX]$/).test(val)) {
            var vs = "1,0,x,9,8,7,6,5,4,3,2".split(","),
                    ps = "7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2".split(","),
                    ss = val.toLowerCase().split(""),
                    r = 0;
            for (var i = 0; i < 17; i++) {
                r += ps[i] * ss[i];
            }
            return (vs[r % 11] == ss[17]);
        }
    }

    function isCorrectDate(value) {
        if (rdate.test(value)) {
            var date = parseInt(RegExp.$1, 10);
            var month = parseInt(RegExp.$2, 10);
            var year = parseInt(RegExp.$3, 10);
            var xdata = new Date(year, month - 1, date, 12, 0, 0, 0);
            if ((xdata.getUTCFullYear() === year) && (xdata.getUTCMonth() === month - 1) && (xdata.getUTCDate() === date)) {
                return true
            }
        }
        return false
    }
    /*判断是否为空 空false 非空true*/
    function isEmpty(value,data){
        if(!value||value==null||value==""){
            return false;
        }
        return true;
    }
    function active(value){
        var url="";
        $.ajax({
            url:"/cloud/open/user/getCheckCode.json",
            type:"post",
            async:false,
            data:{
                authmsg_busi_type:3,
                email: value,
                page_type:common.getPage_type()
            },
            success:function(r){
                url = common.checkEmail(value);
            },
            error:function(){
                $(".sl-error").remove();
                $(".ui-title").before('<div class="sl-error"><span class="ui-icon ui-icon-error"></span>网络异常！</div>');
            }
        })

        return url;
    }
    
   

    var rdate = /^\d{4}\-\d{1,2}\-\d{1,2}$/
    //  var remail = /^[a-zA-Z0-9.!#$%&amp;'*+\-\/=?\^_`{|}~\-]+@[a-zA-Z0-9\-]+(?:\.[a-zA-Z0-9\-]+)*$/
    //var remail = /^([A-Z0-9]+[_|\_|\.]?)*[A-Z0-9]+@([A-Z0-9]+[_|\_|\.]?)*[A-Z0-9]+\.[A-Z]{2,3}$/i
    //var remail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/
    var remail = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/
    var ripv4 = /^(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)$/i
    var ripv6 = /^((([0-9A-Fa-f]{1,4}:){7}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}:[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){5}:([0-9A-Fa-f]{1,4}:)?[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){4}:([0-9A-Fa-f]{1,4}:){0,2}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){3}:([0-9A-Fa-f]{1,4}:){0,3}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){2}:([0-9A-Fa-f]{1,4}:){0,4}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|(([0-9A-Fa-f]{1,4}:){0,5}:((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|(::([0-9A-Fa-f]{1,4}:){0,5}((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|([0-9A-Fa-f]{1,4}::([0-9A-Fa-f]{1,4}:){0,5}[0-9A-Fa-f]{1,4})|(::([0-9A-Fa-f]{1,4}:){0,6}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){1,7}:))$/i
    var a = "";
    //规则取自淘宝注册登录模块
    var phoneOne = {
       /* c1: /^(1[3|5|8][0-9]\d{8})$/,
        c2:/^(14[5|7]\d{8})$/,
        c3 :/^(17[6-8]\d{8})$/,
        c4 :/^(170[0|9|5]\d{7})$/,*/
        c1:/^(1[3|4|5|8|7]\d{9})$/,
    //中国移动
        cm: /^(?:0?1)((?:3[56789]|5[0124789]|8[278])\d|34[0-8]|47\d)\d{7}$/,
        //中国联通
        cu: /^(?:0?1)(?:3[012]|4[5]|5[356]|8[356]\d|349)\d{7}$/,
        //中国电信
        ce: /^(?:0?1)(?:33|53|8[079])\d{8}$/,
        //中国大陆
        cn: /^(?:0?1)[3458]\d{9}$/
                //中国香港
                //   hk: /^(?:0?[1569])(?:\d{7}|\d{8}|\d{12})$/,
                //澳门
                // macao: /^6\d{7}$/,
                //台湾
                //  tw: /^(?:0?[679])(?:\d{7}|\d{8}|\d{10})$//*,
                //韩国
                //  kr:/^(?:0?[17])(?:\d{9}|\d{8})$/,
                //日本
                // jp:/^(?:0?[789])(?:\d{9}|\d{8})$/*/
    }
    /*
     * http://login.sdo.com/sdo/PRes/4in1_2/js/login.js
     * function isPhone(val){
     var gvPhoneRegExpress=new Array();
     gvPhoneRegExpress.push(/^14[57]\d{8}$/);
     gvPhoneRegExpress.push(/^15[012356789]\d{8}$/);
     gvPhoneRegExpress.push(/^13[0-9]\d{8}$/);
     gvPhoneRegExpress.push(/^18[012456789]\d{8}$/);
     var lvCellphoneIsOk=false;
     for (var i=0;i<gvPhoneRegExpress.length;i++){
     if(gvPhoneRegExpress[i].test(val)){
     lvCellphoneIsOk=true;
     break;
     }
     }
     return lvCellphoneIsOk;
     }
     其他手机号码正则
     /^(13\d\d|15[012356789]\d|18[012356789]\d|14[57]\d|17(0[059]|[78]\d))\d{7}$/
     /^(?:(?:13|18|15)[0-9]{9}|(?:147|170|176|177|178|199|196)[0-9]{8})$/;

     */

    avalon.mix(avalon.duplexHooks, {
        trim: {
           // message:'不能含空格',
            get: function(value, data) {
//                if (data.element.type !== "password") {
                return value = String(value || "").trim()
                        //return data.element.value=value.replace(/\s+/, "");
            }
        },
        required: {
            message: '必须填写',
            get: function(value, data, next) {
                next(value !== "")
                return value
            }
        },
        norequired: {
            message: '可以不写！',
            get: function(value, data, next) {
                next(true)
                data.norequired = value === ""
                return value
            }
        },
        "int": {
            message: "必须是整数！",
            get: function(value, data, next) {
                next(/^\-?\d+$/.test(value))
                return value
            }
        },
        phone: {
            message: "请输入有效的手机号码",
            get: function(value, data, next) {
                var ok = false
                for (var i in phoneOne) {
                    if (phoneOne[i].test(value)) {
                        ok = true;
                        break
                    }
                }
                next(ok)
                return  value
            }
        },
        /*固定电话*/
        tel:{
            message:'{{tip}}',
            get:function(value, data, next){
                var ok = /^(0[0-9]{2,3})?(\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/.test(value)
                if(!isEmpty(value)){
                    data.data.tip = "请输入固定电话";
                    next(false);
                    return value;
                }
                if(!ok){
                    data.data.tip = "固定电话号码格式不正确，请重新输入";
                    next(ok);
                    return value;
                }else{
                    next(ok);
                    return value;
                }
            }
        },
        telPhone:{
        	message:'{{tip}}',
            get:function(value, data, next){
                var ok =/(^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$)|(^((\(\d{3}\))|(\d{3}\-))?(1[358]\d{9})$)/.test(value)
                if(!ok){
                    data.data.tip = "格式不正确，请重新输入";
                    next(ok);
                    return value;
                }else{
                    next(ok);
                    return value;
                }
            }
        },
        phone_email:{
            message:'请输入有效的手机号码或邮箱地址',
            get:function(value, data, next){
                var ok = false
                for (var i in phoneOne) {
                    if (phoneOne[i].test(value)) {
                        ok = true;
                        break
                    }
                }
                if(ok){
                    next(ok);
                }else{
                    next(remail.test(value));
                }
                return  value;
            }
        },
        phone_email_unique :{
            message:'{{tip}}',
            get:function(value, data, next){
                var ok = false
                for (var i in phoneOne) {
                    if (phoneOne[i].test(value)) {
                        ok = true;
                        break
                    }
                }
                if(!ok){
                    ok = remail.test(value);
                }
                if(ok){
                    var params = {};
                    if(value.indexOf("@") > -1){//邮箱
                        params.email = value;
                    }else{//手机
                        params.mobile_tel = value;
                    }
                    common.ajax({
                        url:"user/isRegAct.json",
                        data:params,
                        async:false,
                        failure:function (r){//已被注册
                            if(r.error_code == "5103023" || r.error_code == "5103022"){
                                next(ok);
                            }else if(r.error_code == "290"){
                                var url = active(value);
                                a = url;
                                if(url == null || url =='' || url=="undefined"){
                                	url="";
                                	a = url;
                                }
                                data.data.tip = '该邮箱未激活，<a target="_blank" class="openUrl">点击激活</a>';
                                next(false);
                            }else if(r.error_code=="5103020"){
                                data.data.tip = "请输入有效的手机号码或邮箱地址";
                                next(false);
                            }else{
                                data.data.tip = '网络异常';
                                next(false);
                            }
                        },
                        callback:function (r){
                            data.data.tip = '该账号未注册，<a href="/registration/regist.html">点击注册</a>';   
                            next(false);
                        }
                    });
                }else{
                    data.data.tip= '请输入有效的手机号码或邮箱地址';
                    next(false);
                }
                return  value;
            }
        },
        phone_email_unique_r :{
            message:'{{tip}}',
            get:function(value, data, next){
                var ok = false;
                for (var i in phoneOne) {
                    if (phoneOne[i].test(value)) {
                        ok = true;
                        break
                    }
                }
                //2017-09-20
                /*if(!ok){
                    ok = remail.test(value);
                }*/
                if(ok){
                    var params = {};
                    if(value.indexOf("@") > -1){//邮箱
                        params.email = value;
                    }else{//手机
                        params.mobile_tel = value;
                    }
                    common.ajax({
                        url:"user/isRegAct.json",
                        data:params,
                        async:false,
                        failure:function (r){//已被注册
                            if(r.error_code == "5103023" || r.error_code == "5103022"){
                                data.data.tip = '<p class="errorTips">'+r.error_info+' <a href="/login/login.html">点此处直接登录</a></p><p>如忘记密码，<a href="/forget/retrievepwd.html">点此处找回</a></p>';
                                next(false);
                            }else if(r.error_code == "290"){
                                var url = active(value);
                                if(url == null || url =='' || url=="undefined"){
                                	url="";
                                }
                                data.data.tip = '该邮箱未激活，<a target="_blank" onclick="openUrl(this,&apos;'+url+'&apos;)">点击激活</a>';
                                next(false);
                            }else if(r.error_code=="5103020"){
                            	data.data.tip = "请输入有效的手机号码";
                                //data.data.tip = "请输入有效的手机号码或邮箱地址";
                                next(false);
                            }else{
                                data.data.tip = '网络异常';
                                next(false);
                            }
                        },
                        callback:function (r){
                            next(ok);
                        }
                    });
                }else{
                    data.data.tip= '请输入有效的手机号码';
                    next(false);
                }
                return  value;
            }
        },
        check_code : {
            message: "{{tip}}",
            get: function (value, data, next) {
                var ok = /^[a-z0-9]+$/i.test(value)
                if(ok){
                    common.ajax({
                        url:"checkCode.json",
                        data:{check_code:value},
                        async:false,
                        callback:function (){
                            next(true);
                        },
                        failure:function (){
                            data.data.tip = "验证码错误";
                            next(false);
                        }
                    });
                }else{
                    data.data.tip = "验证码格式不正确，请重新输入";
                    next(ok);
                }
                return value;
            }
        },
        /*手机验证码，没有后台交互的*/
        checkcode:{
            message: "{{tip}}",
            get: function (value, data, next) {
                var ok = /^[a-z0-9]{4}|[a-z0-9]{6}$/i.test(value)
                if(!isEmpty(value)){
                    data.data.tip = "请输入验证码";
                    next(false);
                    return value;
                }
                if(!ok){
                    data.data.tip = "验证码格式不正确，请重新输入";
                    next(ok);
                    return value;
                }else{
                    next(ok);
                    return value;
                }
            }
        },
        /*图片验证码*/
        check_imgcode : {
            message: "{{tip}}",
            get: function (value, data, next) {
                var ok = /^[a-z0-9]{4}$/i.test(value)
                if(!isEmpty(value)){
                    data.data.tip = "请输入验证码";
                    next(false);
                    return value;
                }
                if(ok){
                    common.ajax({
                        url:"common/imageCode/validateImageCode.json",
                        data:{imageCode:value},
                        async:false,
                        callback:function (result){
                            if(result){
                                next(true);
                                return value;
                            }else{
                                data.data.tip = "验证码错误";
                                $(data.element).parent().parent().find(".verifyImg").attr("src","/cloud/open/imageCode/getImageCode.json?time="+new Date().getTime());
                                next(false);
                                return value;
                            }
                        }
                    });
                }else{
                    data.data.tip = "验证码格式不正确，请重新输入";
                    next(false);
                    return value;
                }
            }
        },
        /*公司简介
        *
        * */
        company_introduce:{
            message:"{{tip}}",
            get:function(value, data, next){
                var value = $.trim(value);
                if(isEmpty(value, data)){
                    if(value.length>512){
                        data.data.tip="请输入512字以内的公司简介";
                        next(false);
                        return value;
                    }
                    else{
                        next(true);
                        return value;
                    }
                }else{
                    data.data.tip="请输入公司简介";
                    next(false);
                    return value;
                }
            }
        },
        /*
         * 公司全称
         * 中英文4-30个字符，支持空格、点.、逗号,括号、横杠- （长度 4-30）
         * */
        compname:{
            message:"{{tip}}",
            get:function(value, data, next){
                var value = $.trim(value);
                if(isEmpty(value, data)){
                    if(value.length>30||value.length<4){
                        data.data.tip="请输入4-30个字";
                        next(false);
                        return value;
                    }
                    else if(/^(?![_\,\.\-\n\s*\r])(?![_\,]$)[a-zA-Z0-9_\u4e00-\u9fa5\.\s\,\-\(\)\（\）]+$/i.test(value)){
                        next(true);
                        return value;
                    }else{
                        data.data.tip="企业名称格式不正确，请重新输入";
                        next(false);
                        return value;
                    }
                }else{
                    data.data.tip="请输入企业名称";
                    next(false);
                    return value;
                }
            }
        },
        /*
         * 银行名称         
         * 中文4-20的支持括号、横杠-
         * */
        bankname:{
            message:"{{tip}}",
            get:function(value, data, next){
                if(isEmpty(value, data)){
                    if(/^([\u4e00-\u9fff\(\)\）\（\-]{4,20})$/i.test(value)){
                        next(true);
                        return value;
                    }else{
                        data.data.tip="开户银行名称格式不正确，请重新输入";
                        next(false);
                        return value;
                    }
                }else{
                    data.data.tip="请输入开户银行";
                    next(false);
                    return value;
                }
            }
        },
        /*固定电话 手机号码*/
        tel_phone:{
            message:"{{tip}}",
            get:function(value, data, next){
                var ok = false;
                for (var i in phoneOne) {
                    if (phoneOne[i].test(value)) {
                        ok = true;
                        break
                    }
                }
                if(!ok){
                    if((/^(0[0-9]{2,3})?(\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/).test(value)){
                        next(true)
                    }else{
                        data.data.tip = "联系电话格式不正确，请重新输入";
                        next(false);
                    }
                }else{
                    next(ok);
                }
                return value;
            }
        },
        tel_phone_n:{
            message:"{{tip}}",
            get:function(value, data, next){
                if(value!=""){
                    var ok = false;
                    for (var i in phoneOne) {
                        if (phoneOne[i].test(value)) {
                            ok = true;
                            break
                        }
                    }
                    if(!ok){
                        if((/^(0[0-9]{2,3})?(\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/).test(value)){
                            next(true)
                        }else{
                            data.data.tip = "联系电话格式不正确，请重新输入";
                            next(false);
                        }
                    }else{
                        next(ok);
                    }
                    return value;
                }else{
                    next(true);
                    return value;
                }
            }
        },
        /*固定电话 不是必填*/
        tel_phone_k:{
            message:"{{tip}}",
            get:function(value, data, next){
                if(value==""||(/^(0[0-9]{2,3})?(\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/).test(value)){
//                    removeError($("#phone"));
                    next(true);
                    return value;
                }else{
                    data.data.tip="固定电话格式不正确，请重新输入";
                    next(false);
                    return value;
                }
            }
        },
        product_name:{
            message:"{{tip}}",
            get:function(value, data, next){
                var value = $.trim(value);
                if(value!=""){
                    if(value.length>35){
                        data.data.tip = "请输入35字以内的产品名称";
                        next(false);
                        return value;
                    }else{
                        next(true);
                        return value;
                    }
                }else{
                    data.data.tip = "请输入产品名称";
                    next(false);
                    return value;
                }
            }
        },
        /*昵称，不是必填*/
        nick_name:{
            message:"{{tip}}",
            get:function(value, data, next){
                var value = $.trim(value);              
                if(value!=""){
                    if(value.length>20){
                        data.data.tip = "请输入20字以内的昵称";
                        next(false);
                        return value;
                    }else{
                        common.ajax({
                            url : "user/userinfo/nickName.json" ,
                            dataType : "json" ,
                            type:"post",
                            data:{
                                user_id:common.getUserId,
                                nick_name:value
                            },
                            async:false,
                            callback : function(r){
                                if(r==0){
                                    next(true);
                                }else{
                                    data.data.tip = "昵称已被占用";
                                    next(false);
                                }
                                return value;
                            }
                        })
                    }
                }else{
                    next(true);
                    return value;
                }
            }
        },
        /*不是必填（基本资料--公司名称）*/
        compnamek:{
            message:"{{tip}}",
            get:function(value, data, next){
                var value = $.trim(value);
                if(!isEmpty(value, data)){
                    next(true);
                    return value;                   
                }else if(value.length>30||value.length<4){
                    data.data.tip="请输入4~30个字";
                    next(false);
                    return value;
                }else if(/^(?![_\,\.\-\n\s*\r])(?![_\,]$)[a-zA-Z0-9_\u4e00-\u9fa5\.\s\,\-\(\)\（\）]+$/i.test(value)){
                    next(true);
                    return value;
                }else{
                    data.data.tip="企业名称格式不正确，请重新输入";
                    next(false);
                    return value;
                }
            }
        },
        /*登录账号改版*/
        account_required:{
            message:"{{tip}}",
            get:function(value, data, next){
                if(isEmpty(value, data)){
                    next(true);
                    return value;
                }else{
                    data.data.tip="请输入用户名";
                    next(false);
                    return value;
                }
            }
        },
        /*真实姓名
         *汉字2-5个，或者英文的（支持空格）"-" 满足少数民族姓名的需求 TODO（英文名字的字符长度限制）
         * */
        realname:{
            message:"{{tip}}",
            get:function(value, data, next){
                if(isEmpty(value, data)){
                    if(/^([\u4e00-\u9fa5\-]{2,5}|([a-zA-Z]+\s?)+)$/.test(value)){
                        next(true);
                        return value;
                    }else{
                        data.data.tip="真实姓名格式不正确，请重新输入";
                        next(false);
                        return value;
                    }
                }else{
                    data.data.tip="请输入真实姓名";
                    next(false);
                    return value;
                }
            }
        },
        /*应用名称 必填*/
        appname:{
            message:"{{tip}}",
            get:function(value, data, next){
                value=$.trim(value);
                if(isEmpty(value, data)){
                    next(true);
                    return value;
                }else{
                    data.data.tip="请输入应用名称";
                    next(false);
                    return value;
                }
            }
        },
        /*应用简介*/
        apparea:{
            message:"{{tip}}",
            get:function(value, data, next){
                value=$.trim(value);
                if(isEmpty(value, data)){
                    next(true);
                    return value;
                }else{
                    data.data.tip="请输入应用简介";
                    next(false);
                    return value;
                }
            }
        },
        /*应用简介-修改*/
        appareaChange:{
            message:"{{tip}}",
            get:function(value, data, next){
                value=$.trim(value);
                if(isEmpty(value, data)){
                    next(true);
                    return value;
                }else{
                    data.data.tip="请输入应用简介";
                    next(false);
                    return value;
                }
            }
        },
        /*联系人 必填*/
        linkman:{
            message:"{{tip}}",
            get:function(value, data, next){
                value=$.trim(value);
                if(isEmpty(value, data)){
                    next(true);
                    return value;
                }else{
                    data.data.tip="请输入联系人";
                    next(false);
                    return value;
                }
            }
        },
        /*联系手机 必填 格式校验*/
        telPhone:{
            message:"{{tip}}",
            get:function(value, data, next){
                if(isEmpty(value=$.trim(value), data)){
                    next(true);
                    return value;
                }else{
                    data.data.tip="请输入联系人";
                    next(false);
                    return value;
                }
            }
        },
        /*不是必填（基本资料--真实姓名）*/
        realnamek:{
            message:"{{tip}}",
            get:function(value, data, next){
                    if(/^([\u4e00-\u9fa5\-]{2,5}|([a-zA-Z]+\s?)+)$/.test(value)||!isEmpty(value, data)){
                        next(true);
                        return value;
                    }else{
                        data.data.tip="真实姓名格式不正确，请重新输入";
                        next(false);
                        return value;
                    }
            }
        },
        /*
         * 身份证号码的验证支持15位、18位。
         * */
        isidcardno:{
            message: "{{tip}}",
            get: function(num, data, next) {
                num = num.toUpperCase();
                if(isEmpty(num, data)){
                    //身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X。
                    if (!(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(num)))
                    {
                        data.data.tip="请输入15或18位身份证号码";
                        next(false);
                        return num;
                    }
                    //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
                    //下面分别分析出生日期和校验位
                    var len, re;
                    len = num.length;
                    if (len == 15)
                    {
                        re = new RegExp(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/);
                        var arrSplit = num.match(re);
                        //检查生日日期是否正确
                        var dtmBirth = new Date('19' + arrSplit[2] + '/' + arrSplit[3] + '/' + arrSplit[4]);
                        var bGoodDay;
                        bGoodDay = (dtmBirth.getYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) && (dtmBirth.getDate() == Number(arrSplit[4]));
                        if (!bGoodDay)
                        {
                            data.data.tip="身份证中出生日期不正确，请重新输入";
                            next(false);
                            return num;
                        }
                        else
                        {
                            //将15位身份证转成18位
                            //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
                            var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
                            var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
                            var nTemp = 0, i;
                            num = num.substr(0, 6) + '19' + num.substr(6, num.length - 6);
                            for(i = 0; i < 17; i ++)
                            {
                                nTemp += num.substr(i, 1) * arrInt[i];
                            }
                            num += arrCh[nTemp % 11];
                            next(true);
                            return num;
                        }
                    }
                    if (len == 18)
                    {
                        re = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/);
                        var arrSplit = num.match(re);
                        //检查生日日期是否正确
                        var dtmBirth = new Date(arrSplit[2] + "/" + arrSplit[3] + "/" + arrSplit[4]);

                        var bGoodDay;
                        bGoodDay = (dtmBirth.getFullYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) && (dtmBirth.getDate() == Number(arrSplit[4]));
                        if (!bGoodDay)
                        {
                            data.data.tip="身份证中出生日期不正确，请重新输入";
                            next(false);
                            return num;
                        }
                        else
                        {
                            //检验18位身份证的校验码是否正确。
                            //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
                            var valnum;
                            var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
                            var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
                            var nTemp = 0, i;
                            for(i = 0; i < 17; i ++)
                            {
                                nTemp += num.substr(i, 1) * arrInt[i];
                            }
                            valnum = arrCh[nTemp % 11];
                            if (valnum != num.substr(17, 1))
                            {
                                data.data.tip="身份证号码不正确，请检查后重新输入";
                                next(false);
                                return num;
                            }
                            next(true);
                            return num;
                        }
                    }
                    data.data.tip="身份证号码格式不正确，请重新输入";
                    next(false);
                    return num;
                }else{
                    data.data.tip="请输入身份证号码";
                    next(false);
                    return num;
                }
            }
        },
        /*
         *营业执照注册号
         * 15位数字（old）
         * 15--30位数字+字母（2015.12.15修改）
         * */
        regid:{
            message: "{{tip}}",
            get: function(value, data, next) {
                if(isEmpty(value, data)){
                    data.data.tip="营业执照注册号格式不正确，请重新输入";
                    next(/^[0-9a-zA-Z]{15,30}$/i.test(value))
                    return  value
                }else{
                    data.data.tip="请输入营业执照注册号";
                    next(false);
                    return value;
                }
            }
        },
        /*
         *公司简称
         * 必填
         * */
        companysimple:{
            message: "{{tip}}",
            get: function(value, data, next) {
                var value = $.trim(value);
                var len = 0;
                for (var i = 0; i < value.length; i++) {
                    if (value[i].match(/[^\x00-\xff]/ig) != null) //全角
                        len += 2;
                    else
                        len += 1;
                }

                if(len == 0){
                    data.data.tip="请输入企业简称";
                    next(false);
                    return value;
                }else{
                    var pattern =/^[\u4e00-\u9fa5a-z]+$/gi;
                    if(!pattern.test(value[0])){
                        data.data.tip="首字符只能是汉字或字母";
                        next(false);
                        return value;
                    }else
                    {
                         if(len > 14){
                            data.data.tip="请输入14字以内的公司简称";
                            next(false);
                            return value;
                        }else{
                            next(true);
                            return value;
                        }
                    }
                }
            }
        },
        /*原始密码的验证*/
        old_pwd:{
            message: "{{tip}}",
            get: function(value, data, next) {
                if(value.length==0){
                    data.data.tip="请输入密码";
                    next(false);
                    return value;
                }
                if(value.length<6 || value.length>16){
                    data.data.tip="请输入长度为6~16位字符";
                    next(false);
                    return value;
                }
                if(!/^[\@A-Z0-9\!\#\$\%\^\&\*\.\~\-\=\+\-\?\\]{6,16}$/i.test(value)){
                    data.data.tip="密码支持数字、大小写字母以及特殊符号";
                    next(false);
                    return value;
                }

                var en_old_pwd = common.encoding(value)
                common.ajax({
                    url:"user/userinfo/validatePwd.json",
                    data:
                    {
                        "user_id":common.getUserId(),
                        "old_pwd":en_old_pwd
                    },
                    async:false,
                    callback:function (){
                        next(true);
                        return value;
                    },
                    failure:function (){
                        data.data.tip = "原始密码输入错误";
                        next(false);
                        return value;
                    }
                });
                next(true);
                return value;
            }
        },
        /*邮箱的验证，有没有被绑定过。*/
        email_unique:{
            message: "{{tip}}",
            get: function(value, data, next) {
                var ok = false
                ok = remail.test(value);
                if(ok){
                    common.ajax({
                        url:"user/isRegAct.json",
                        data:{email:value},
                        async:false,
                        failure:function (r){//已被注册
                            if(r.error_code == "5103023" || r.error_code == "5103022" || r.error_code == "290"){
                                data.data.tip = '邮箱已被占用';
                                next(false);
                            }else if(r.error_code=="5103020"){
                                data.data.tip = "请输入有效的手机号码或邮箱地址";
                                next(false);
                            }else{
                                data.data.tip = '网络异常';
                                next(false);
                            }
                        },
                        callback:function (r){
                            next(true);
                        }
                    });
                    /*common.ajax({
                        url:"user/userinfo/bound.json",
                        data:{
                            email:value
                        },
                        async:false,
                        failure:function (){//已被注册
                            data.data.tip = '网络异常!';
                            next(false);
                        },
                        callback:function (result){
                            if(result!=0){
                                data.data.tip = '该邮箱已被绑定！';
                                next(false);
                            }else if(result==0){
                                next(true)
                            }
                        }
                    });*/
                }else{
                    data.data.tip= '不是有效的邮箱，请重新输入';
                    next(false);
                }
                return  value;
            }
        },
        /*手机的验证，有没有被绑定过。*/
        phone_unique:{
            message: "{{tip}}",
            get: function(value, data, next) {
                var ok = false
                for (var i in phoneOne) {
                    if (phoneOne[i].test(value)) {
                        ok = true;
                        break
                    }
                }
                if(ok){
                    common.ajax({
                        url:"user/isRegAct.json",
                        data:{mobile_tel:value},
                        async:false,
                        failure:function (r){//已被注册
                            if(r.error_code == "5103023" || r.error_code == "5103022" || r.error_code == "290"){
                                data.data.tip = '该手机已被绑定';
                                next(false);
                            }else if(r.error_code=="5103020"){
                                data.data.tip = "请输入有效的手机号码或邮箱地址";
                                next(false);
                            }else{
                                data.data.tip = '网络异常';
                                next(false);
                            }
                        },
                        callback:function (r){
                            next(true);
                        }
                    });
                    /*common.ajax({
                        url:"user/userinfo/bound.json",
                        data:{
                            mobile_tel:value
                        },
                        async:false,
                        failure:function (){//已被注册
                            data.data.tip = '网络异常!';
                            next(false);
                        },
                        callback:function (result){
                            if(result!=0){
                                data.data.tip = '该手机已被绑定！';
                                next(false);
                            }else if(result==0){
                                next(true)
                            }
                        }
                    });*/
                }else{
                    data.data.tip= '不是有效的手机号码，请重新输入';
                    next(false);
                }
                return  value;
            }
        },
        /*todo 详细地址的验证 */
        address:{
            message: "{{tip}}",
            get: function(value, data, next) {
                var value = $.trim(value);
                if(isEmpty(value, data)){
                    if(value.length<4 || value.length>40){
                        data.data.tip="请输入4~40个字";
                        next(false);
                    }
                    else{
                        next(true);
                        return value;
                    }
                }else{
                    data.data.tip="请输入详细地址";
                    next(false);
                    return value;
                }
            }
        },
      /*  邮寄地址收件人*/
        mail_addressee:{
            message: "{{tip}}",
            get: function(value, data, next) {
                if(isEmpty(value, data)){
                    if(/^([\u4e00-\u9fa5\-]{2,5}|([a-zA-Z]+\s?)+)$/.test(value)){
                        next(true);
                        return value;
                    }else{
                        data.data.tip="收件人格式不正确，请重新输入";
                        next(false);
                        return value;
                    }
                }
                else{
                    data.data.tip="请输入收件人";
                    next(false);
                    return value;
                }
            }
        },
        /*纳税人识别号 15 18 20 位数字 */
        taxpayer_id:{
            message: "{{tip}}",
            get: function(value, data, next) {
                if(isEmpty(value, data)){
                    if(!/^[0-9]{15}|[0-9]{18}|[0-9]{20}$/.test(value)){
                        data.data.tip="纳税人识别号格式不正确，请重新输入";
                        next(false);
                        return value;
                    }
                    next(true);
                    return value;
                }else{
                    data.data.tip="请输入纳税人识别号";
                    next(false);
                    return value;
                }
            }
        },
        /*银行账户  15 17 18 19 20 21*/
        bank_number:{
            message: "{{tip}}",
            get: function(value, data, next) {
                if(isEmpty(value, data)){
                    if(!/^[0-9]{15,21}?$/.test(value)){
                        data.data.tip="银行账号格式不正确，请重新输入";
                        next(false);
                        return value;
                    }
                    next(true);
                    return value;
                }else{
                    data.data.tip="请输入银行账号";
                    next(false);
                    return value;
                }
            }
        },
        /*
         * 图片类型的验证 jpg|jpeg|bmp|JPG
         * */
        imgtype:{
            message: "{{tip}}",
            get: function(value, data, next) {
                if(isEmpty(value, data)){
                    if(!/\.(jpg|jpeg|bmp|JPG)$/.test(value))
                    {
                        data.data.tip = "jj";
                        return false;
                    }
                }else{
                    data.data.tip="必须填写！";
                    next(false);
                    return value;
                }
            }
        },
        decimal: {
            message: '必须是小数！',
            get: function(value, data, next) {
                next(/^\-?\d*\.?\d+$/.test(value))
                return value
            }
        },
        alpha: {
            message: '必须是字母！',
            get: function(value, data, next) {
                next(/^[a-z]+$/i.test(value))
                return value
            }
        },
        alpha_numeric: {
            message: '请输入字母或数字',
            get: function(value, data, next) {
                next(/^[a-z0-9]+$/i.test(value))
                return value
            }
        },
        alpha_dash: {
            message: '必须为字母或数字及下划线等特殊字符！',
            validate: function(value, data, next) {
                next(/^[a-z0-9_\-]+$/i.test(value))
                return value
            }
        },
        chs: {
            message: '必须是中文字符！',
            get: function(value, data, next) {
                next(/^[\u4e00-\u9fa5]+$/.test(value))
                return value
            }
        },
        chs_numeric: {
            message: '必须是中文字符或数字及下划线等特殊字符！',
            get: function(value, data, next) {
                next(/^[\\u4E00-\\u9FFF0-9_\-]+$/i.test(value))
                return value
            }
        },
        qq: {
            message: "腾讯QQ号从10000开始！",
            get: function(value, data, next) {
                next(/^[1-9]\d{4,10}$/.test(value))
                return value
            }
        },
        id: {
            message: "身份证格式错误！",
            get: function(value, data, next) {
                next(idCard(value))
                return value
            }
        },
        ipv4: {
            message: "ip地址不正确！",
            get: function(value, data, next) {
                next(ripv4.test(value))
                return value
            }
        },
        ipv6: {
            message: "ip地址不正确！",
            get: function(value, data, next) {
                next(ripv6.test(value))
                return value
            }
        },
        email: {
            message: "不是有效的邮箱，请重新输入",
            get: function(value, data, next) {
                value=$.trim(value);
                next(remail.test(value))
                return value
            }
        },
        email_k: {
            message: "不是有效的邮箱，请重新输入",
            get: function(value, data, next) {
                if(value){
                    next(remail.test(value))
                    return value
                }else{
                    next(true);
                    return value
                }

            }
        },
        not_required_url:{
            message: "不是有效的网址，请重新输入",
            get: function(value, data, next) {
                var strRegex = "^((https|http|ftp|rtsp|mms)?://)"

                    + "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" //ftp的user@

                    + "(([0-9]{1,3}\.){3}[0-9]{1,3}" // IP形式的URL- 199.194.52.184

                    + "|" // 允许IP和DOMAIN（域名）

                    + "([0-9a-z_!~*'()-]+\.)*" // 域名- www.

                    + "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\." // 二级域名

                    + "[a-z]{2,6})" // first level domain- .com or .museum

                    + "(:[0-9]{1,4})?" // 端口- :80

                    + "((/?)|" // a slash isn't required if there is no file name

                    + "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$";
                var re=new RegExp(strRegex,"i");
                if(value.length!=0){
                    next(re.test(value))
//                next(/^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/.test(value))
                    return value
                }else{
                    next(true);
                    return value;
                }
            }
        },
        url: {
            message: "不是有效的网址，请重新输入",
            get: function(value, data, next) {
                var strRegex = "^((https|http|ftp|rtsp|mms)?://)"

                    + "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" //ftp的user@

                    + "(([0-9]{1,3}\.){3}[0-9]{1,3}" // IP形式的URL- 199.194.52.184

                    + "|" // 允许IP和DOMAIN（域名）

                    + "([0-9a-z_!~*'()-]+\.)*" // 域名- www.

                    + "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\." // 二级域名

                    + "[a-z]{2,6})" // first level domain- .com or .museum

                    + "(:[0-9]{1,4})?" // 端口- :80

                    + "((/?)|" // a slash isn't required if there is no file name

                    + "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$";
                var re=new RegExp(strRegex,"i");
                next(re.test(value))
//                next(/^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/.test(value))
                return value
            }
        },
        repeat: {
            message: "两次密码输入不一致，请重新输入",
            get: function(value, data, next) {
                var id = data.element.getAttribute("data-duplex-repeat") || ""
                var other = avalon(document.getElementById(id)).val() || ""
                next(value === other)
                return value
            }
        },
        date: {
            message: '必须符合日期格式 YYYY-MM-DD！',
            get: function(value, data, next) {
                next(isCorrectDate(value))
                return value
            }
        },
        passport: {
            message: '护照格式错误或过长！',
            get: function(value, data, next) {
                next(/^[a-zA-Z0-9]{4,20}$/i.test(value))
                return value
            }
        },
       /* password:{
            message:'长度为6~16字符',
            get:function(value,data,next){validatePwd
                next(/^[\@A-Za-z0-9\!\#\$\%\^\&\*\.\~\-\=\+\-\?]{6,16}$/i.test(value))
                return value
            }
        },*/
        /*新密码不能与旧密码一样（id=old_password）*/
        password_n:{
            message:"{{tip}}",
            get:function(value, data, next){
                if(value.indexOf(" ")!=-1){
                    data.data.tip="密码不允许有空格";
                    next(false);
                    return value;
                }
                if(value.length==0){
                    data.data.tip="请输入密码";
                    next(false);
                    return value;
                }
                if(value.length<6 || value.length>14){
                    data.data.tip="请输入长度为6~14位的字符";
                    next(false);
                    return value;
                }
                if(!/^[\@A-Za-z0-9\!\#\$\%\^\&\*\.\~\,\-\=\+\-\?\\][-,.?:;'"!`]|[(-{2})|(/.{3})|/(/)|/[/]|{}]{6,16}$/i.test(value)){
                    data.data.tip="密码支持数字、大小写字母以及特殊符号";
                    next(false);
                    return value;
                }
                
                sValue = value.replace(/\s+/, "");
                var modes = 0;
                if (sValue.length < 6) return modes;
                if (/\d/.test(sValue)) modes++; //数字
                if (/[a-z]/.test(sValue)) modes++; //小写
                if (/[A-Z]/.test(sValue)) modes++; //大写
                if (/\W/.test(sValue)) modes++; //特殊字符
                
                if(modes<2){
                    data.data.tip="密码过于简单，请尝试数字、字母、特殊符号组合";
                    next(false);
                    return value;
                    
                }
                
                var other = avalon(document.getElementById("old_password")).val() || ""
                if(value === other){
                    data.data.tip="新密码不能与旧密码一致，请重新输入";
                    next(false);
                    return value;
                }
                next(true);
                return value;
            }
        },
        password:{
            message:"{{tip}}",
            get:function(value, data, next){
                if(value.indexOf(" ")!=-1){
                    data.data.tip="密码不允许有空格";
                    next(false);
                    return value;
                }
                if(value.length==0){
                    data.data.tip="请输入密码";
                    next(false);
                    return value;
                }
                if(value.length<6 || value.length>14){
                    data.data.tip="请输入长度为6~14位字符";
                    next(false);
                    return value;
                }
                if(!/^[\@A-Za-z0-9\!\#\$\%\^\&\*\.\~\,\-\=\+\-\?\\][-,.?:;'"!`]|[(-{2})|(/.{3})|/(/)|/[/]|{}]{6,16}$/i.test(value)){
                    data.data.tip="密码支持数字、大小写字母以及特殊符号";
                    next(false);
                    return value;
                }
                next(true);
                return value;
            }
        },
        
        password_s:{
            message:"{{tip}}",
            get:function(value, data, next){
                /*if(value.indexOf(" ")!=-1){
                    data.data.tip="密码不允许有空格";
                    next(false);
                    return value;
                }*/
            	value = $.trim(value);
                if(value.length==0){
                    data.data.tip="请输入密码";
                    next(false);
                    return value;
                }
                if(value.length<6 || value.length>14){
                    data.data.tip="请输入长度为6~14位字符";
                    next(false);
                    return value;
                }
                if(!/^[\@A-Za-z0-9\!\#\$\%\^\&\*\.\~\,\-\=\+\-\?\\][-,.?:;'"!`]|[(-{2})|(/.{3})|/(/)|/[/]|{}]{6,16}$/i.test(value)){
                    data.data.tip="密码支持数字、大小写字母以及特殊符号";
                    next(false);
                    return value;
                }
                
                sValue = value.replace(/\s+/, "");
                var modes = 0;
                if (sValue.length < 6) return modes;
                if (/\d/.test(sValue)) modes++; //数字
                if (/[a-z]/.test(sValue)) modes++; //小写
                if (/[A-Z]/.test(sValue)) modes++; //大写
                if (/\W/.test(sValue)) modes++; //特殊字符
                
                if(modes<2){
                    data.data.tip="密码过于简单，请尝试数字、字母、特殊符号组合";
                    next(false);
                    return value;
                    
                }
                //return modes> 3?3:modes;
                
                
                next(true);
                return value;
            }
        },
        minlength: {
            message: '最少输入{{min}}个字！',
            get: function(value, data, next) {
                var elem = data.element
                var a = parseInt(elem.getAttribute("minlength"), 10)
                if (!isFinite(a)) {
                    a = parseInt(elem.getAttribute("data-duplex-minlength"), 10)
                }
                var num = data.data.min = a
                next(value.length >= num)
                return value
            }
        },
        maxlength: {
            message: '最多输入{{max}}个字！',
            get: function(value, data, next) {
                var elem = data.element
                var a = parseInt(elem.getAttribute("maxlength"), 10)
                if (!isFinite(a)) {
                    a = parseInt(elem.getAttribute("data-duplex-maxlength"), 10)
                }
                var num = data.data.max = a
                next(value.length <= num)
                return value
            }
        },
        gt: {
            message: '必须大于{{max}}！',
            get: function(value, data, next) {
                var elem = data.element
                var a = parseInt(elem.getAttribute("max"), 10)
                if (!isFinite(a)) {
                    a = parseInt(elem.getAttribute("data-duplex-gt"), 10)
                }
                var num = data.data.max = a
                next(parseFloat(value) > num)
                return value
            }
        },
        lt: {
            message: '必须小于{{min}}！',
            get: function(value, data, next) {
                var elem = data.element
                var a = parseInt(elem.getAttribute("min"), 10)
                if (!isFinite(a)) {
                    a = parseInt(elem.getAttribute("data-duplex-lt"), 10)
                }
                var num = data.data.min = a
                next(parseFloat(value) < num)
                return value
            }
        },
        //contain
        eq: {
            message: '必须等于{{eq}}！',
            get: function(value, data, next) {
                var elem = data.element
                var a = parseInt(elem.getAttribute("data-duplex-eq"), 10)
                var num = data.data.eq = a
                next(parseFloat(value) == num)
                return value
            }
        },
        contains: {
            message: "必须包含{{array}}中的一个！",
            get: function(val, data, next) {
                var vmValue = [].concat(val).map(String)
                var domValue = (data.element.getAttribute("data-duplex-contains") || "").split(",")
                data.data.array = domValue
                var has = false
                for (var i = 0, n = vmValue.length; i < n; i++) {
                    var v = vmValue[i]
                    if (domValue.indexOf(v) >= 0) {
                        has = true
                        break
                    }
                }
                next(has)
                return val
            }
        },
        contain: {
            message: "必须包含{{array}}！",
            get: function(val, data, next) {
                var vmValue = [].concat(val).map(String)
                var domValue = (data.element.getAttribute("data-duplex-contain") || "").split(",")
                data.data.array = domValue.join('与')
                if (!vmValue.length) {
                    var has = false
                } else {
                    has = true
                    for (var i = 0, n = domValue.length; i < n; i++) {
                        var v = domValue[i]
                        if (vmValue.indexOf(v) === -1) {
                            has = false
                            break
                        }
                    }
                }
                next(has)
                return val
            }
        },
        pattern: {
            message: '必须匹配/{{pattern}}/这样的格式！',
            get: function(value, data, next) {
                var elem = data.element
                var h5pattern = elem.getAttribute("pattern")
                var mspattern = elem.getAttribute("data-duplex-pattern")
                var pattern = data.data.pattern = h5pattern || mspattern
                var re = new RegExp('^(?:' + pattern + ')$')
                next(re.test(value))
                return value
            }
        }
    })
//<input type="number" max=x min=y step=z/> <input type="range" max=x min=y step=z/>
//
    function fixEvent(event) {
        if (event.target) {
            return event
        }
        var ret = {}
        for (var i in event) {
            ret[i] = event[i]
        }
        var target = ret.target = event.srcElement
        if (event.type.indexOf("key") === 0) {
            ret.which = event.charCode != null ? event.charCode : event.keyCode
        } else if (/mouse|click/.test(event.type)) {
            var doc = target.ownerDocument || document
            var box = doc.compatMode === "BackCompat" ? doc.body : doc.documentElement
            ret.pageX = event.clientX + (box.scrollLeft >> 0) - (box.clientLeft >> 0)
            ret.pageY = event.clientY + (box.scrollTop >> 0) - (box.clientTop >> 0)
            ret.wheelDeltaY = ret.wheelDelta
            ret.wheelDeltaX = 0
        }
        ret.timeStamp = new Date - 0
        ret.originalEvent = event
        ret.preventDefault = function() { //阻止默认行为
            event.returnValue = false
        }
        ret.stopPropagation = function() { //阻止事件在DOM树中的传播
            event.cancelBubble = true
        }
        return ret
    }
    var widget = avalon.ui.validation = function(element, data, vmodels) {
        var options = data.validationOptions
        var onSubmitCallback
        var vmodel = avalon.define(data.validationId, function(vm) {
            avalon.mix(vm, options)
            vm.$skipArray = ["widgetElement", "data", "validationHooks", "validateInKeyup", "validateAllInSubmit", "resetInBlur"]
            vm.widgetElement = element
            vm.data = []
            /**
             * @interface 为元素绑定submit事件，阻止默认行为
             */
            vm.$init = function() {
                element.setAttribute("novalidate", "novalidate");
                avalon.scan(element, [vmodel].concat(vmodels))
                if (vm.validateAllInSubmit) {
                    onSubmitCallback = avalon.bind(element, "submit", function(e) {
                        e.preventDefault()
                        vm.validateAll(vm.onValidateAll)
                    })
                }
                if (typeof options.onInit === "function") { //vmodels是不包括vmodel的
                    options.onInit.call(element, vmodel, options, vmodels)
                }
            }
            /**
             * @interface 销毁组件，移除相关回调
             */
            vm.$destory = function() {
                vm.data = []
                onSubmitCallback && avalon.unbind(element, "submit", onSubmitCallback)
                element.textContent = element.innerHTML = ""
            }

            /**
             * @interface 验证当前元素下的所有非disabled元素
             * @param callback {Null|Function} 最后执行的回调，如果用户没传就使用vm.onValidateAll
             */

            vm.validateAll = function(callback) {
                var fn = typeof callback === "function" ? callback : vm.onValidateAll
                var promise = vm.data.filter(function(el) {
                    return el.element && !el.element.disabled && vmodel.widgetElement.contains(el.element);
                }).map(function(data) {
                    return  vm.validate(data, true)
                })
                Promise.all(promise).then(function(array) {
                    var reasons = []
                    for (var i = 0, el; el = array[i++]; ) {
                        reasons = reasons.concat(el)
                    }
                    fn.call(vm.widgetElement, reasons)//这里只放置未通过验证的组件
                })
            }

            /**
             * @interface 重置当前表单元素
             * @param callback {Null|Function} 最后执行的回调，如果用户没传就使用vm.onResetAll
             */
            vm.resetAll = function(callback) {
                vm.data.filter(function(el) {
                    return el.element
                }).forEach(function(data) {
                    try {
                        vm.onReset.call(data.element, {type: "reset"}, data)
                    } catch (e) {
                    }
                })
                var fn = typeof callback == "function" ? callback : vm.onResetAll
                fn.call(vm.widgetElement)
            }
            /**
             * @interface 验证单个元素对应的VM中的属性是否符合格式<br>此方法是框架自己调用
             * @param data {Object} 绑定对象
             * @param isValidateAll {Undefined|Boolean} 是否全部验证,是就禁止onSuccess, onError, onComplete触发
             * @param event {Undefined|Event} 方便用户判定这是由keyup,还是blur等事件触发的
             */
            vm.validate = function(data, isValidateAll, event) {
                var value = data.valueAccessor()
                var inwardHooks = vmodel.validationHooks
                var globalHooks = avalon.duplexHooks
                var promises = []
                var elem = data.element
                data.validateParam.replace(/\w+/g, function(name) {
                    var hook = inwardHooks[name] || globalHooks[name]
                    if (!elem.disabled) {
                        var resolve, reject
                        promises.push(new Promise(function(a, b) {
                            resolve = a
                            reject = b
                        }))
                        var next = function(a) {
                            if (data.norequired)
                                a = true
                            delete data.norequired
                            if (a) {
                                resolve(true)
                            } else {
                                var reason = {
                                    element: elem,
                                    data: data.data,
                                    message: elem.getAttribute("data-duplex-message") || hook.message,
                                    validateRule: name,
                                    getMessage: getMessage
                                }
                                resolve(reason)
                            }
                        }
                        data.data = {}
                        hook.get(value, data, next)
                    }
                })
                //如果promises不为空，说明经过验证拦截器
                var lastPromise = Promise.all(promises).then(function(array) {
                    var reasons = []
                    for (var i = 0, el; el = array[i++]; ) {
                        if (typeof el === "object") {
                            reasons.push(el)
                        }
                    }
                    if (!isValidateAll) {
                        if (reasons.length) {
                            vm.onError.call(elem, reasons, event)
                        } else {
                            vm.onSuccess.call(elem, reasons, event)
                        }
                        vm.onComplete.call(elem, reasons, event)
                    }
                    return reasons
                })
                return lastPromise

            }
            //收集下方表单元素的数据
            vm.$watch("avalon-ms-duplex-init", function(data) {
                var inwardHooks = vmodel.validationHooks
                data.valueAccessor = data.evaluator.apply(null, data.args)

                switch (avalon.type(data.valueAccessor())) {
                    case "array":
                        data.valueResetor = function() {
                            this.valueAccessor([])
                        }
                        break
                    case "boolean":
                        data.valueResetor = function() {
                            this.valueAccessor(false)
                        }
                        break
                    case "number":
                        data.valueResetor = function() {
                            this.valueAccessor(0)
                        }
                        break
                    default:
                        data.valueResetor = function() {
                            this.valueAccessor("")
                        }
                        break
                }

                var globalHooks = avalon.duplexHooks
                if (typeof data.pipe !== "function" && avalon.contains(element, data.element)) {
                    var params = []
                    var validateParams = []
                    data.param.replace(/\w+/g, function(name) {
                        var hook = inwardHooks[name] || globalHooks[name]
                        if (hook && typeof hook.get === "function" && hook.message) {
                            validateParams.push(name)
                        } else {
                            params.push(name)
                        }
                    })
                    data.validate = vm.validate
                    data.param = params.join("-")
                    data.validateParam = validateParams.join("-")
                    if (validateParams.length) {
                        if (vm.validateInKeyup) {
                            data.bound("keyup", function(e) {
                                var type = data.element && data.element.getAttribute("data-duplex-event")
                                if (!type || /^(?:key|mouse|click|input)/.test(type)) {
                                    var ev = fixEvent(e)
                                    setTimeout(function() {
                                        vm.validate(data, 0, ev)
                                    })
                                }
                            })
                        }
                        if (vm.validateInBlur) {
                            data.bound("blur", function(e) {
                                vm.validate(data, 0, fixEvent(e))
                            })
                        }
                        if (vm.resetInFocus) {
                            data.bound("focus", function(e) {
                                vm.onReset.call(data.element, fixEvent(e), data)
                            })
                        }
                        var array = vm.data.filter(function(el) {
                            return el.element
                        })
                        avalon.Array.ensure(array, data)
                        vm.data = array
                    }

                    return false
                }
            })
        })

        return vmodel
    }
    var rformat = /\\?{{([^{}]+)\}}/gm
    function getMessage() {
        var data = this.data || {}
        return this.message.replace(rformat, function(_, name) {
            return data[name] == null ? "" : data[name]
        })
    }
    widget.defaults = {
        validationHooks: {}, //@config {Object} 空对象，用于放置验证规则
        onSuccess: avalon.noop, //@config {Function} 空函数，单个验证成功时触发，this指向被验证元素this指向被验证元素，传参为一个对象数组外加一个可能存在的事件对象
        onError: avalon.noop, //@config {Function} 空函数，单个验证失败时触发，this与传参情况同上
        onComplete: avalon.noop, //@config {Function} 空函数，单个验证无论成功与否都触发，this与传参情况同上
        onValidateAll: avalon.noop, //@config {Function} 空函数，整体验证后或调用了validateAll方法后触发；有了这东西你就不需要在form元素上ms-on-submit="submitForm"，直接将提交逻辑写在onValidateAll回调上
        onReset: avalon.noop, //@config {Function} 空函数，表单元素获取焦点时触发，this指向被验证元素，大家可以在这里清理className、value
        onResetAll: avalon.noop, //@config {Function} 空函数，当用户调用了resetAll后触发，
        validateInBlur: true, //@config {Boolean} true，在blur事件中进行验证,触发onSuccess, onError, onComplete回调
        validateInKeyup: false, //@config {Boolean} true，在keyup事件中进行验证,触发onSuccess, onError, onComplete回调
        validateAllInSubmit: true, //@config {Boolean} true，在submit事件中执行onValidateAll回调
        resetInFocus: false //@config {Boolean} true，在focus事件中执行onReset回调
    }
     
//http://bootstrapvalidator.com/
//https://github.com/rinh/jvalidator/blob/master/src/index.js
//http://baike.baidu.com/view/2582.htm?fr=aladdin&qq-pf-to=pcqq.group
})
/**
 @other
 <p>avalon.validation自带了许多<code>验证规则</code>，满足你一般的业务需求。</p>
 <p>大家可以在onReset的回调里得到第二个参数data, 然后调用data.valueResetor()将VM中的数据也置空,如布尔数据变false,
 数值数据变0,数组数据变[],字符串数组变成""

 </p>

 <p> 也可以在页面添加不依赖于ms-duplex的绑定</p>
 ```javascript
 validateVM.data.push({
 valueAccessor: function(){}
 validateParam: "xxx",
 element: element
 })
 ```
 */

/**
 @links
 [自带验证规则required,int,decimal,alpha,chs,ipv4,phone](avalon.validation.ex1.html)
 [自带验证规则qq,id,email,url,date,passport,pattern](avalon.validation.ex2.html)
 [自带验证规则maxlength,minlength,lt,gt,eq,equal](avalon.validation.ex3.html)
 [自带验证规则contains,contain](avalon.validation.ex4.html)
 [自带验证规则repeat(重复密码)](avalon.validation.ex5.html)
 [自定义验证规则](avalon.validation.ex6.html)
 [自带验证规则norequied](avalon.validation.ex7.html)
 [禁止获得焦点时的onRest回调 resetInFocus ](avalon.validation.ex8.html)
 [与textbox组件的混用, ms-duplex-string的使用 ](avalon.validation.ex9.html)
 [验证表单元素存在disabled的情况 ](avalon.validation.ex10.html)
**/
 /*提示信息弹窗*/
function tips(message,time){
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
}

function openUrl(_this,url){
 	 if(url == null || url =='' || url=="undefined"){
 		tips("您好！请前往邮箱查收注册邮件，激活注册链接即可完成注册。",2000);
       } else {
    	   window.open(url);
       }
 }
