/**
 * Created by rk on 17-06-20.
 */
require(["domReady!","avalon","jquery","common/common","jquery.cookie","header","ajaxfileupload","commona"],function (dom,avalon,$,common){
	
	var model = avalon.define({
		$id:"order_add",
		userId:"",//用户userId
		
		student_name:$('#student_name').val(),//学生姓名
		info:$("#info").val(),//基本信息
		mobile_phone:$("#mobile_phone").val(),//手机
		qq:$("#qq").val(),//QQ
		wechat:$("#wechat").val(),//微信
		phone:$("#phone").val(),//电话
		channel:$("#channel").val(),//渠道
		channel_id:"",//渠道id
		list_source:$("#list_source").val(),//名单来源
		list_source_id:"",//名单来源id
		user:$("#user").val(),//负责人
		user_id:'',//负责人id
		order_status:$("#order_status").val(),//状态
		order_status_id:'',//状态id
		remark:$("#remark").val(),//备注
		doCreate:function(){//创建订单:直接点
			var val1=model.validatorName("#student_name");
			var val2=model.validatorInfo("#info");
			var val3=model.validatorMobilePhone("#mobile_phone");
			var val4=model.validatorQQ("#qq");
			var val5=model.validatorWechat("#wechat");
			var val6=model.validatorPhone("#phone");
			var val7=(model.channel_id!=""&&model.channel_id!="0")?true:false;
			var val8=(model.list_source_id!=""&&model.list_source_id!="0")?true:false;
			var val9=(model.user_id!=""&&model.user_id!="0")?true:false;
			var val10=(model.order_status_id!=""&&model.order_status_id!="0")?true:false;
			var val11=model.validatorRemark("#remark");
        	if(val1 && val2&& val3&& val4&& val5&& val6&& val7&& val8&& val9&& val10&& val11){
        		common.ajax({
        			url : "order/addOrder.json" ,
        	        dataType : 'text/html' ,
        	        type:"post",
        	        async:false,
        	        data:{
        	        	studentName:$("#student_name").val(),
        	        	info:$("#info").val(),
        	        	mobilePhone:$("#mobile_phone").val(),
        	        	qq:$("#qq").val(),
        	        	wechat:$("#wechat").val(),
        	        	phone:$("#phone").val(),
        	        	channelId:model.channel_id,
        	        	listSourceId:model.list_source_id,
        	        	userId:model.user_id,
        	        	orderStatusId:model.order_status_id,
        	        	remark:$("#remark").val()
        	        },
        	        callback: function(data){
            			common.tips("订单保存成功");
						setTimeout(function(){
	        				location.replace(location.href);
						},1500)
        	        },
        	        failure:function(r){
        	        	common.alertNodePop(r.error_info);
        	        }
        		});
        	}else{
        		
        	}
		},
		reset : function() {
			model.student_name = "";
			model.info = "";
			model.mobile_phone = "";
			model.qq = "";
			model.wechat = "";
			model.phone = "";
			model.channel = "请选择渠道";
			model.channel_id = "";
			model.list_source = "请选择名单来源";
			model.list_source_id = "";
			model.user = "请选择负责人";
			model.user_id = "";
			model.order_status = "请选择状态";
			model.order_status_id = "";
			model.remark = "";
		},
		// 设定渠道
		setChannel : function(channelId) {
			model.channel_id = channelId;
		},
		// 设定名单来源
		setListSource : function(listSourceId) {
			model.list_source_id = listSourceId;
		},
		// 设定负责人
		setUser : function(userId) {
			model.user_id = userId;
		},
		// 设定状态
		setOrderStatus : function(orderStatusId) {
			model.order_status_id = orderStatusId;
		},
		// 设定状态
		setChangeOrderStatus : function(chaneOrderStatusId) {
			model.change_order_status_id = chaneOrderStatusId;
		},
		/*验证学生姓名*/
		validatorName:function(el){
			
			var reg=/^[\u4E00-\u9FA5A-Za-z]+$/;//姓名正则
			var result=false;
			$(el).siblings("div").remove();
			$(el).parent().children("div .sl-error").remove();
			var $txt=$.trim($(el).val());
			if($txt==""){
				$(el).parent().append("<div class='sl-error'><i class='error'></i>学生姓名不能为空</div>");
			}else if($txt.length>20){
				$(el).parent().append("<div class='sl-error'><i class='error'></i>学生姓名不能为超过20个字符</div>");
			}else if(!reg.test($txt)){
				$(el).parent().append("<div class='sl-error'><i class='error'></i>学生姓名只能有由字母以及汉字组成</div>");
			}else{
				result=true;
			}
			return result;
		},
		/*验证基本信息*/
		validatorInfo:function(el){
			
			var result=false;
			$(el).siblings("div").remove();
			$(el).parent().children("div .sl-error").remove();
			var $txt=$.trim($(el).val());
			if($txt==""){
				$(el).parent().append("<div class='sl-error'><i class='error'></i>基本信息不能为空</div>");
			}else if($txt.length>300){
				$(el).parent().append("<div class='sl-error'><i class='error'></i>基本信息不能为超过300个字符</div>");
			}else{
				result=true;
			}
			
			return result;
		},
		/*验证手机号*/
		validatorMobilePhone:function(el){
			
			var reg=/^1(3|4|5|7|8)\d{9}$/;//手机号正则
			var result=false;
			$(el).siblings("div").remove();
			$(el).parent().children("div .sl-error").remove();
			var $txt=$.trim($(el).val());
			if($txt==""){
				$(el).parent().append("<div class='sl-error'><i class='error'></i>手机号不能为空</div>");
			}else if(!reg.test($txt)){
				$(el).parent().append("<div class='sl-error'><i class='error'></i>手机号格式不正确</div>");
			}else{
				common.ajax({
	    			url : "order/checkMobilePhone.json" ,
	    	        dataType : "text/html" ,
	    	        type:"post",
	    	        async:false,
	    	        data:{
	    	        	mobilePhone:$txt,
	    	        },
	    	        callback: function(data){
	    	        	if(data){
	    	        		$(el).parent().append("<div class='sl-error'><i class='error'></i>手机号已存在</div>");
	    	        		result = false;
	    	        	}else{
	    					$(el).parent().append("<div class='sl-error'><i class='correct'></i></div>");
	    					result = true;
	    	        	}
	    	        }
	    		});
			}
			return result;
		},
		/*验证qq*/
		validatorQQ:function(el){
			
			var reg=/^[1-9][0-9]{4,9}$/;
			var result=false;
			$(el).siblings("div").remove();
			$(el).parent().children("div .sl-error").remove();
			var $txt=$.trim($(el).val());
			if($txt==""){
				result=true;
			}else if(!reg.test($txt)){
				$(el).parent().append("<div class='sl-error'><i class='error'></i>qq格式不正确</div>");
			}else{
				result=true;
			}
			
			return result;
		},
		/*验证微信号*/
		validatorWechat:function(el){
			
			var reg=/^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$/;
			var result=false;
			$(el).siblings("div").remove();
			$(el).parent().children("div .sl-error").remove();
			var $txt=$.trim($(el).val());
			if($txt==""){
				result=true;
			}else if(!reg.test($txt)){
				$(el).parent().append("<div class='sl-error'><i class='error'></i>微信号格式不正确</div>");
			}else{
				result=true;
			}
			
			return result;
		},
		/*验证电话*/
		validatorPhone:function(el){
			
			var reg=/^(0?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8})|(400|800)([0-9\\-]{7,10})|(([0-9]{4}|[0-9]{3})(-| )?)?([0-9]{7,8})((-| |转)*([0-9]{1,4}))?$/;
			var result=false;
			$(el).siblings("div").remove();
			$(el).parent().children("div .sl-error").remove();
			var $txt=$.trim($(el).val());
			if($txt==""){
				result=true;
			}else if(!reg.test($txt)){
				$(el).parent().append("<div class='sl-error'><i class='error'></i>电话格式不正确</div>");
			}else{
				result=true;
			}
			
			return result;
		},
		/*验证备注*/
		validatorRemark:function(el){
			
			var result=false;
			$(el).siblings("div").remove();
			$(el).parent().children("div .sl-error").remove();
			var $txt=$.trim($(el).val());
			if($txt==""){
				$(el).parent().append("<div class='sl-error'><i class='error'></i>备注不能为空</div>");
			}else if($txt.length>2000){
				$(el).parent().append("<div class='sl-error'><i class='error'></i>备注不能为超过2000个字符</div>");
			}else{
				result=true;
			}
			
			return result;
		},
		closePop:function(){//关闭弹窗
			$(".popup_bg").hide();
			$(".black_shield").hide();
		},
	});

	$(".input_3_parent").each(function() {
		$(this).on("click", function() {
			$(this).find("ul").toggle();
		})

		$(this).find("li").each(function() {
			$(this).on("click", function() {
				$(this).addClass("active").siblings().removeClass("active");
				var text = $(this).text();
				$(this).parent().siblings(".input_3").val(text);
			})
		})
		$(this).mouseleave(function() {
			$(this).find("ul").hide();
		});
	});
	$(function(){
		$.ajax({
			url : "/sts/user/islogin.json" ,
	        dataType : "json" ,
	        type:"post",
	        async:false,
	        success: function(data){
	        	if(data.data)
	        		model.userId = data.data.userId;
	        }
		})
	})
	
	avalon.scan();
})



