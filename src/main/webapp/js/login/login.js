/**
 * Created by changqing on 15-3-2.
 */
require(["domReady!","avalon","jquery","common/common","jquery.cookie","validation"], function(dom,avalon,$,common) {

    var validationVM;
    var can_click = true;

    function showError(el, data,msg) {
        $(".sl-error").remove();
        if(msg){
            $(".ui-title").before('<div class="sl-error"><span class="ui-icon ui-icon-error"></span>'+msg+'</div>');
            $(el).parent("div").removeClass('ui-item-error');
        }else if(data){
            $(".ui-title").before('<div class="sl-error"><span class="ui-icon ui-icon-error"></span>'+data.getMessage()+'</div>');
        }
        $(el).parent("div").addClass("ui-item-error");
    }
    function removeError(el){
       $(".sl-error").remove();
       $(el).parent("div").removeClass('ui-item-error');
    }
    $(function() {
        common.getRSA()
        $("#username_i").focus();
    });
    $(document).keydown(function(event){
        if(event.keyCode == 13){
            model.submitI();
        }
    });
    var model = avalon.define({
        $id:"login",
        username: $.cookie("_un_")||common.getUrlParam("user_account")||"",
        password:"",
        type:"",
        imgcode:"",/*输入三次 出现图片验证码*/
        show:false,
        errorTimes:0,
        correct:true,
        reset: function() {
            validationVM && validationVM.resetAll()
        },
        submitI:function(){
            validationVM && validationVM.validateAll()
        },
        changeValidateCode:function(obj){
            var timeNow = new Date().getTime();
            $("#imageCode").attr("src","/sts/imageCode/getImageCode.json?time="+timeNow);
        },
        validation:{
            onInit: function(v) {
                validationVM = v
            },
            onReset: function(e, data) {
                data.valueResetor && data.valueResetor()
                avalon(this).removeClass("error success")
                removeError(this)
            },
            onComplete:function(){
                if($(this).attr("id")== "username_i" && $.trim($(this).val()) !== ""){
                    model.username = $.trim(model.username);
                    model.queryErrorTimes();
                    if(model.errorTimes>2){
                        model.show = true;
                    }else{
                        model.show = false;
                    }
                }
            },
            onError: function(reasons) {
                reasons.forEach(function(reason) {
                    avalon(this).removeClass("success").addClass("error")
                    showError(this, reason)
                }, this)
            },
            onSuccess: function() {
                avalon(this).removeClass("error").addClass("success")
                removeError(this)
//                showSuccess(this);
            },
            onValidateAll: function(reasons) {
                reasons.forEach(function(reason) {
                    avalon(reason.element).removeClass("success").addClass("error")
                    showError(reason.element, reason)
                });

                var flag=true;
                if(model.show&&model.correct){
                    flag = model.checkImgcode("#imgCodeDiv");
                }else if(model.show){
                    flag=false;
                }else if(!model.show){
                    flag=true;
                }
                if (reasons.length === 0&&flag) {
                    model.submitInfo();
                }else{
                    model.correct=true;
                }
            }
        },
        checkImgcode:function(el){
            model.correct = common.check_imgcode(el,model.imgcode);
            setTimeout(function(){
                model.correct=true;
            },500)
            return model.correct;
        },
        queryErrorTimes:function(){
            common.ajax({
                url : "user/errorTimes.json",
                dataType : "json" ,
                type:"post",
                async:false,
                data:{user_name:model.username},
                callback: function(data){
                    if(data!=null){
                        model.errorTimes = data.error_times;
                    }
                }
            });
        },
        submitInfo:function(){
            if(can_click){
                can_click = false;
                var en_password =common.encoding(model.password);
                common.ajax({
                    url:"user/toLogin.json",
                    dataType : "json",
                    type:"post",
                    async:false,
                    data:{
                        userName:model.username,
                        password:en_password,
                        operateSystem:common.detectOS(),
                        browser:common.getBrowser(),
                        resolution:common.getScreen(),
                        userSource:5
                    },
                    callback : function( data){
                        removeError("username");
                        if(!data.errorCode){
                        	if(data.userId){
                        		$.cookie("_a_", data.userId, { path: '/', expires: 10 });
                        		$.cookie("_n_", model.strFilter(data.userName), { path: '/', expires: 10 });
                        		$.cookie("_un_", data.userName, { path: '/', expires: 10 });
                        		model.$goPage(data);
                        	}else{
                        		$.cookie("_a_","",{path: '/',expires:-1});
                        		$.cookie("_n_","",{path: '/',expires:-1});
                        		$.cookie("_t_","",{path: '/',expires:-1});
                        	}
                        }else if(data.errorCode=="5103007"){
                            showError(null,null,r.errorInfo);
                            var name = model.username;
                            model.imgcode ="";
                            model.password = "";
                            model.queryErrorTimes();
                            if(model.errorTimes>2){
                                model.show = true;
                                model.changeValidateCode();
                            }else{
                                model.show = false;
                            }
                        }else if(data.errorCode == "10109506"){
                        	common.getRSA();
                            showError(null,null,data.errorInfo)
                        }else{
                            showError(null,null,data.errorInfo);
                        }
                        can_click = true;
                    },
                })
            }
        },
        $goPage:function(data){
            if($.cookie("_u_")&&($.cookie("_u_").indexOf("openplat")>-1||$.cookie("_u_").indexOf("cms")>-1)){
                window.location.href =$.cookie("_u_");
            }else{
                window.location.href ="/sts/sales/list.html";
            }
        },
        strFilter:function(str){
            var str1 = str.substring(0,3);
            var str2 = str.substring(str.length-4,str.length);
            return str1+"******"+str2;
        }
    });
    model.$watch("show", function(a, b) {
        if(model.show){
            $("#imgCodeDiv").show();
            model.changeValidateCode();
        }else{
            $("#imgCodeDiv").hide();
            model.imgcode ="";
        }
    });
    avalon.scan(document.body);

})