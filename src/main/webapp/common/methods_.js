require(["domReady!","avalon","jquery","common/common","jquery.cookie"], function(dom,avalon,$,common) {
	var model=avalon.define({
	        $id:"common",
	        appkey:"",
	        environment:"",
	        url:"",
	        signature:"",
	        recharge:"",
	        datacheckServices:"",
	        pluginInfo:[],
	        closePop:function(id){//关闭弹出框
	            $(".popup_bg").hide();
	            $(".black_shield").hide();
	            if(id.match("#")!=null){
	         	   location.reload();
	            }
	         },
	         /*
	          * 该方法用于：AppView.vm/serviceInfo.vm/sandboxAppView.vm/sandboxServiceInfo.vm
	          * */
	        showOff:function(){
				$('#off,.black_shield').show();
			},
			/* 上线，下线功能
			 * environment：1：沙箱应用  2：生产应用
			 * 该方法用于：AppView.vm/serviceInfo.vm/sandboxAppView.vm/sandboxServiceInfo.vm
			 * */
			onoffline:function(app_key,clientStatus,environment){
				if(app_key!=""){
					common.ajax({
						url : "application/updateAppStatus.json" ,
						dataType : "json" ,
						type:"post",
						async:false,
						data:{
							appKey:app_key,
							environment:environment,
							clientStatus:clientStatus
						},
						callback: function(data){
							model.closePop("");
							window.location.reload();
						}
					});
				}
			},
			/*删除应用_显示删除弹框
			 * 该方法用于：AppView.vm/serviceInfo.vm/sandboxAppView.vm/sandboxServiceInfo.vm
			 * */
			delApp:function(app_key,environment){
				$("#delPop").show();
				$(".black_overlay").show();
				model.appkey = app_key;
				model.environment = environment;
			},
			/*删除应用_real
			 * 该方法用于：AppView.vm/serviceInfo.vm/sandboxAppView.vm/sandboxServiceInfo.vm
			 * */
			confirmDelBt:function(){
				var environment = model.environment;
				if(environment == "1"){
					model.url="/console/test_app.html";
				}
				if(environment == "2"){
					model.url="/console/prd_app.html";
				}
				if(model.appkey!=""){
					common.ajax({
						url : "application/delApp.json" ,
						dataType : "json" ,
						type:"post",
						async:false,
						data:{
							appKey:model.appkey,
							environment:model.environment
						},
						callback: function(data){
							model.closePop("");
							window.location.href=model.url;
						}
					});
				}
			},
			/*已上传附件下载
			 * 该方法用于：AppCreate.vm/AppView.vm
			 * */
			download:function(){
				var client_key = $(this).prop('id');
				var param = {
						client_key:client_key,
						environment_type:2
				}
				common.ajax({
	    			url : "image/judgeExist.json" ,
	    	        dataType : "json" ,
	    	        type:"post",
	    	        async:true,
	    	        data:param,
	    	        callback: function(data){
	    	    	        window.location.href="/cloud/open/image/download.json?environment_type=2&client_key="+client_key;
	    	        },
	    	        failure:function(r){
	    	        	common.alertNodePop(r.error_info);
	    	        }
	    		});
			},
			/*
			 * 显示弹窗方法
			 * 该方法用于：Popup.vm
			 * */
			//弹框
		    bounced:function(id){
		    	$('#'+id).show();
		    	$('#fade').show();
		    },
		    //关闭弹框
		    close:function(id){
		    	$('#'+id).hide();
		    	$('#fade').hide();
		    },
		    getPlugnPage:function(){
		    	$.ajax({
					url : "/cloud/open/plugin/getPluginInfo.json" ,
			        dataType : "json" ,
			        type:"post",
			        async:true,
			        success: function(data){
			        	model.pluginInfo = data.data.pluginInfo;
			        	if(model.pluginInfo != null){
			        		model.signature = data.data.signature;
			        		model.recharge = data.data.recharge;
			        		model.datacheckServices = data.data.datacheckServices;
			        		if(model.signature == "false" && model.recharge == "false" && model.datacheckServices=="false"){
			        			model.pluginInfo = [];
			        		}
			        		
			        	}
			        },
			        error:function(r){
			        	tips(r.error_info);
			        }
				});
		    } 
			
	})
	
	/**
	 * 
	 * 多页面公用的方法：控台左侧导航栏收起，展开的功能
	 * 
	 * */
	$(".sidebar .nav-sidebar").each(function(){
		var li = $(this).find("li").first();
		li.click(function(){
			var ul = $(this).parent();
			var ul_switch = ul.hasClass("active");
			var i = $(this).find("i");
			if(ul_switch){
				ul.removeClass("active");
				i.removeClass("parent-down").addClass("parent-up");
				i.siblings("i")
			}else{
				ul.addClass("active").siblings(".nav").removeClass("active");
				$(".sidebar .nav-sidebar").each(function(){
					if(!$(this).hasClass("active")){
						$(this).children("li:first-child").find("i").removeClass("parent-down").addClass("parent-up");
					}else{
						$(this).children("li:first-child").find("i").removeClass("parent-up").addClass("parent-down");
					}	
				})
				//ul.addClass("active");
				//i.removeClass("parent-up").addClass("parent-down");
			}
		})
	})
	
	model.getPlugnPage();
	avalon.scan();
})


/**
 * 文件上传
 * id和arg可以拼成当前点击的input type="file" 的元素的id
 * arg是前半部分，id是后半部分
 * id参数是本地存放文件路径的元素的id
 * */
function upload(id,arg){
	var value =  $(arg+id).val();
	$("#"+id).val(value);
}
/**
 *提示信息弹窗
 */
function tips(message,time){
    time=time==undefined?1000:time;
    $.blockUI({
        message: '<div class="con-pop"><div class="inner"><div class="details"><p style="text-align: center">'+message+'</p></div></div></div>',
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
