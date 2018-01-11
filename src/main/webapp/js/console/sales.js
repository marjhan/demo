/**
 * Created by rk on 17-05-27.
 */
require(["domReady!","avalon","jquery","header","common/common","commona","jquery.cookie","pager"],function (dom,avalon,$,common){
	
	var vm = avalon.define({
		$id:"sales",
		service_name:"",
		client_name:"",
		environment_type:"请选择服务环境",
		environmentVal:"",
		service_status_prd:"请选择服务状态",
		service_status_uat:"请选择服务状态",
		serviceStatusVal:"",
		service_type:"请选择服务分类",
		serviceTypeVal:"",
		serviceList:[],
		serviceId:"",
		chargeinfo:[],
		serviceInfo:[],
		serviceStatus:"",
		alternation_id:"",
		 pager:{
	            currentPage: 1,
	            totalItems: 0,
	            perPages:10,
	            showJumper: true,
	            onJump: function(e, data) {
	            	vm.pager.currentPage = data.currentPage;
	            	vm.$render();
	            }
	        },
	        $render:function(){
	            getServiceList();          
	        },
	        changeEnv:function(envType){
	        	vm.environmentVal=envType;
	        },
	        seach:function(){
	        	vm.pager.currentPage = 1;
	        	getServiceList(1);
	        },
	        reset:function(){
	        	vm.service_name="";
	        	vm.client_name="";
	        	vm.environment_type="请选择服务环境";
	        	vm.environmentVaule="";
	        	vm.service_status_prd="请选择服务状态";
	        	vm.service_status_uat="请选择服务状态";
	        	vm.service_type="请选择服务分类";
	        	vm.environmentVal="";
	        	vm.serviceTypeVal="";
	        	vm.serviceStatusVal="";
	        	vm.client_name="";
	        	vm.alternation_id="";
	        	$(".input_2_parent").find("li").removeClass("active");
	        	vm.pager.currentPage=1;
	        	getServiceList(1);
	        },
	        //设定服务类型值
	        setServiceType:function(serviceType){
	        	vm.serviceTypeVal=serviceType;
	        },
	        setAlternation:function(alternationId){
	        	vm.alternation_id = alternationId;
	        },
	        //设定服务状态值
	        setServiceStatus:function(serviceStatus){
	        	vm.serviceStatusVal=serviceStatus;
	        	if(serviceStatus == 10){
	        		var _this = $("#evn_type").find("li").eq(1);
	        		$("#evn_type").find("li").eq(1).addClass("active");
	        		$("#environment_type").val(_this.text());
	        	}
	        },
	        openPop:function(id,serviceId){
		    	vm.serviceId=serviceId;
		    	vm.getCharge(serviceId);
		    	vm.choose_one_comboType();
		    	$('#'+id).show();
		    	$('#fade').show();
		    	
		    }
	})
	function getServiceList(isShowPageOne){
		 var param={
            pageSize:vm.pager.perPages,
            currentPage:vm.pager.currentPage,
            service_name:vm.service_name,
            environment_type:vm.environmentVal,
            classify_id:vm.serviceTypeVal,
            use_status:vm.serviceStatusVal,
            client_name:vm.client_name,
            alternation_id:vm.alternation_id
		 };
		$.ajax({
			url : "mySalesList.json" ,
	        dataType : "json" ,
	        data:param,
	        type:"post",
	        async:true,
	        success: function(data){

    			$("#serviceInfo").show();
//	        	if(data != null){
//	        		vm.serviceList = data.data.beanList;
//	        		if(data.data.beanList == null){
//	        			$("#serviceInfo").hide();
//	        		} else {
//	        			$("#serviceInfo").show();
//	        			setTimeout(function(){
//	        				$('.classifySpan').each(function(){
//	        					$(this).attr('title', $(this).text());
//	        				});
//	        	       },100)
//	        		}
//	        	}
//	        	 setTimeout(function(){
//                     avalon.vmodels.servicePage.totalItems = data.data.pageBean.totalItem;
//                },10)
//                if(isShowPageOne==1){
//                    avalon.vmodels.servicePage.currentPage=1;
//                }
	        },
	        failure:function(r){
	        	showTips(r.error_info);
	        }
		});
	}
	
	$(function(){
		getServiceList();
	})
	
	$(".input_2_parent").each(function(){
		$(this).on("click",function(){
			$(this).find("ul").toggle();
		})
		
		$(this).find("li").each(function(){
			$(this).on("click",function(){
				$(this).addClass("active").siblings().removeClass("active");
				var text = $(this).text();
				$(this).parent().siblings(".input_2").val(text);
			})
		})
		$(this).mouseleave(function(){
			$(this).find("ul").hide();
		});
	})
	
	$(function(){
		$('#environment_type,#service_status,#service_type').focus(function(){
			$(this).blur(); //设置文本框取消获得焦点
		});
	})
	
	avalon.scan();
})

//显示提示框
function showTips(message, time) {
	time = time == undefined ? 1300 : time;
	$.blockUI({
		message: '<div class="con-pop"><div class="inner"><div class="details"><p style="text-align: center">' + message + '</p></div></div></div>',
		timeout:  time, overlayCSS : { opacity : 0.05, cursor:"default" },
		css : { left:'43%', position : 'fixed', border:"0px", backgroundColor:"none", cursor:"auto", textAlign:"left" }
	});
}
