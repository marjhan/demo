/**
 * Created by wyy on 2017/11/15
 */
require(["domReady!","avalon","jquery","common/common","jquery.cookie","jquery.actual","apiMenu"], function(dom,avalon,$,common) {
	
	var header = avalon.define({
		$id:"marketHeader",
        isCompany:true,
        username:'',//用户名
        deal_status:"",//实名认证状态
        left:"",
        search_doc: "",
        service_content:"",
        login:false,
        tologin:function(){
            $.cookie("_u_", window.location, { path: '/skyjoy', expires: 10 });
            var userBehavior = window.location.href;
            common.ajax({
                url:"user/setUserBehavior.json",
                type:"get",
                data:{
                	userBehavior:userBehavior
                },
                callback:function(r){
                    window.location.href ="/login/login.html";
                }
            })
        },
        //注册
        regist:function(){
        	 var userBehavior = window.location.href;
             common.ajax({
                 url:"user/setUserBehavior.json",
                 type:"get",
                 data:{
                 	userBehavior:userBehavior
                 },
                 callback:function(r){
                     window.location.href ="/registration/regist.html";
                 }
             })
        },
        /*退出*/
        logout:function(){
            common.ajax({
                url:"user/loginExit.json",
                type:"get",
                data:"",
                callback:function(r){
                	header.toggleLogin(false);
                    $.cookie("_t_","",{path: '/skyjoy',expires:-1});
                    $.cookie("_n_","",{path: '/skyjoy',expires:-1});
                    $.cookie("_u_", window.location, { path: '/skyjoy', expires: 10 });
                    window.location.href ="/login/login.html";
                }
            })
        },
        queryByServerName:function(){
        	common.ajax({
                url : "/queryMarketDetailList.json",
                dataType : "json",
                type:"post",
                data:{
                	service_content:vm.service_content
                },
                async:false,
                callback: function(data){
                    console.log(data);
                },
                failure:function(data){
                        common.alertNodePop(data.error_info);
                }
            });
        },
        isHaveService:function(){
            common.ajax({
                url : "api/queryServiceInfo.json",
                dataType : "json",
                type:"post",
                data:{
                    pageSize:10,
                    currentPage:1,
                    category:0
                },
                async:false,
                callback: function(data){
                    if(data!=null){
                        if(data.pageBean.totalItem==0){
                            window.location.href = "/manage/usingService";
                        }else{
                            window.location.href = "/manage/serviceManage";
                        }
                    }
                },
                failure:function(data){
                    if(data.error_code == '404291'){
                        $.cookie("_u_",window.location, { path: '/skyjoy', expires: 10 });
                        window.location.href="/login/login.html";
                    }else{
                        common.alertNodePop(data.error_info);
                    }
                }
            });
        },
        toggleLogin:function(flag){
        	if(!flag){
        		$("#unlogin").show();
            	$("#login").hide();
            	header.login  = false;
        	}else{
        		$("#login").show();
            	$("#unlogin").hide();
            	header.login  = true;
        	}
        },
        
	})
	
	$(function() {
		
	});	
	function isLogin(){
        var user_id = common.isLogin();
        if(user_id!=""){
        	header.toggleLogin(true);
            header.username=user_id;
            common.ajax({
                url : "user/islogin.json" ,
                dataType : "json" ,
                type:"post",
                callback: function(data){
                    if(data.userType == 2){
                        header.isCompany=true;
                    }else{
                        header.isCompany=false;
                    }
                    $("#cas_logout_url").attr('href',data.cas_logout_url);
                },
                failure:function(r){
                    if(r.error_code=='291'){
                        $.cookie("_u_",window.location, { path: '/skyjoy', expires: 10 });
                        window.location.href="/login/login.html";
                    }else{
                        common.alertNodePop(r.error_info);
                    }
                }
            })
        }else{
        	header.toggleLogin(false);
        }
    }
	$(function(){
		isLogin();
	})
	
	avalon.scan();
})