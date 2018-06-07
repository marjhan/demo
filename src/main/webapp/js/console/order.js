/**
 * Created by rk on 17-05-27.
 */
require([ "domReady!", "avalon", "jquery", "header", "common/common",
		"commona", "jquery.cookie", "pager", "datePicker" ], function(dom,
		avalon, $, common) {

	var vm = avalon.define({
		$id : "order",
		role_id : "",
		student_name : "",
		info : "",
		channel : "请选择渠道",
		channel_id : "",
		list_source : "请选择名单来源",
		list_source_id : "",
		user : "请选择负责人",
		user_id : "",
		order_status : "请选择状态",
		order_status_id : "",
		change_student_name : "",
		change_info : "",
		change_channel : "请选择渠道",
		change_channel_id : "",
		change_list_source : "请选择名单来源",
		change_list_source_id : "",
		change_user : "请选择负责人",
		change_user_id : "",
		change_order_status : "请选择状态",
		change_order_status_id : "",
		change_order_id	: "",
		change_order_remark	: "",
		startTime : "",
		endTime : "",
		orderList : [],
		//修改密码
		key:"",
		old_password:$('#old_password').val(),//原密码
		new_password:$('#new_password').val(),//新密码
		new_password_1:$('#new_password_1').val(),//新密码确认
        /**
         * 加密字符串
         * @param str
         * @returns {*}
         */
        encoding:function (str){
            if(RSAUtils && vm.key != ""){
                return RSAUtils.encryptedString(vm.key,str);
            }else{
                return str;
            }
        },
		/*原密码校验：1.不能为空；2.长度在6-14之间；*/
	    u1:function(){
	    	if(vm.old_password == '' || vm.old_password == null || vm.old_password == undefined){
	    		$('#u1').html('不能为空');
	    		$('#u1').show();
	    		return false;
	    	}else{
	    		if(vm.old_password.length>=6&&vm.old_password.length<=14){
	    			$('#u1').hide();
	    			return true;
	    		}else{
	    			$('#u1').show();
        			$("#u1").html("请输入长度为6~14位字符");
        			return false;
	    		}
	    	}
	    },
	    /*新密码校验：1.不能为空; 2.密码强度校验：数字，字母，特殊符号。满足其一权重加一; 3.新旧密码不能一致;*/	    
	    u2:function(){
	    	if(vm.new_password !=''){
	    		if(vm.new_password == vm.old_password){
	    			$('#v1,#v2,#v3').removeClass('active');
	    			$("#u2").html("新旧密码不能一致！");
	    			$('#u2').show();
	    			return false;
	    		}else{
	    			if(vm.new_password.length>=6&&vm.new_password.length<=14){// /^[\w]{6,14}$/ 验证字母，数字，下划线
		    			$('#v1,#v2,#v3').removeClass('active');
		    			var a = 0;
		    			if(vm.new_password.match(/[0-9]/g)){
		    				a++;
		    			}
		    			if(vm.new_password.match(/[a-zA-Z]/g)){
		    				a++;
		    			}
		    			if(vm.new_password.match(/.[^a-zA-Z0-9]/g)){
		    				a++;
		    			}
		    			if(a=="1"){
		    				$('#v1').addClass('active');
		    				$("#u2").html("密码过于简单");
			    			$('#u2').show();
			    			return false;
		    			}
		    			if(a=="2"){
		    				$('#v1,#v2').addClass('active');
			    			$('#u2').hide();
			    			return true;
		    			}
		    			if(a=="3"){
		    				$('#v1,#v2,#v3').addClass('active');
			    			$('#u2').hide();
			    			return true;
		    			}
		    		}else{
		    			$("#u2").html("请输入长度为6~14位字符");
		    			$('#u2').show();
		    			return false;
		    		}
	    		}
	    	}else{
	    		$('#v1,#v2,#v3').removeClass('active');
	    		$('#u2').html('不能为空');
	    		$('#u2').show();
	    		return false;
	    	}
	    },
	    //新密码确认校验
	    u3:function(){
	    	if(vm.new_password_1 != ''){
	    		if( vm.new_password == vm.new_password_1){
		    		$('#u3').hide();
		    		return true;
		    	}else{
		    		$('#u3').html('密码不一致');
		    		$('#u3').show();
		    		return false;
		    	}
	    	}else{
	    		$('#u3').html('不能为空');
	    		$('#u3').show();
	    		return false;
	    	}
	    },
	    //修改密码
	    changePassword:function(){
	    	if(vm.u1() && vm.u2() && vm.u3()){
	    		var old_password = vm.encoding(vm.old_password);
	    		var new_password = vm.encoding(vm.new_password);
	    		var param = {
	    				//hsid:vm.hsid,
	    				oldPwd:old_password,
	    				newPwd:new_password
	    		}
	    		$.ajax({
	    			url : "/sts/user/updatePwd.json" ,
                    dataType : "json" ,
                    type:"post",
                    async:false,
                    data:param,
                    success: function(data){
                    	if(data.data==null){
                    		showTips("修改成功！");
                    		vm.close('ChangePassword');
                    		setTimeout(function(){
                    			$.ajax({
                        			url:"/sts/user/updatePwdSuccess.json",
                        			dataType:"json",
                        			type:"post",
                        			async:false,
                        			success:function(data){
                        				location.replace(location.href)
                        			}
                        		})
                    		},1000)
                    	}
                    },
                    failure:function(r){
                    	showTips("原密码输入错误");
		            }
	    		})
	    	}
	    },
		pager : {
			currentPage : 1,
			totalItems : 0,
			perPages : 10,
			showJumper : true,
			onJump : function(e, data) {
				vm.pager.currentPage = data.currentPage;
				vm.$render();
			}
		},
		$render : function() {
			getOrderList();
		},
		changeEnv : function(envType) {
			vm.environmentVal = envType;
		},
		//修改订单弹窗弹框
		bouncedChangeOrder:function(id,change_order_id,change_student_name,change_info,change_channel,change_channel_id,change_list_source,
				change_list_source_id,change_user,change_user_id,change_order_status_id,change_order_status_name,change_order_remark){
	    	vm.change_order_id = change_order_id;
	    	vm.change_student_name = change_student_name;
	    	vm.change_info = change_info;
	    	vm.change_channel = change_channel;
	    	vm.change_channel_id = change_channel_id;
	    	vm.change_list_source = change_list_source;
	    	vm.change_list_source_id = change_list_source_id;
	    	vm.change_user = change_user;
	    	vm.change_user_id = change_user_id;
	    	vm.change_order_status_id = change_order_status_id;
	    	vm.change_order_status = change_order_status_name;
	    	vm.change_order_remark = change_order_remark;
	    	$('#'+id).show();
	    	$('#fade').show();
	    },
	    //关闭弹框
	    close:function(id){
	    	$('#'+id).hide();
	    	$('#fade').hide();
	    },
		selectDate : function(type) {
			var myDate = new Date();
			var year = myDate.getFullYear(), // 今年
			year1 = myDate.getFullYear(), // 给startTime用
			year2 = myDate.getFullYear() - 1, // 一年
			mouth = myDate.getMonth() + 1, // 当月
			mouth1 = myDate.getMonth(), // 一个月
			mouth2 = myDate.getMonth() - 2, // 三个月
			day = myDate.getDate();
			// 今天
			if (type == 0) {
				vm.startTime = year + "-" + mouth + "-" + day;
				vm.endTime = year + "-" + mouth + "-" + day;
				$(this).addClass('active').parent('span').siblings().find('a')
						.removeClass('active');
			}
			// 一个月
			if (type == 1) {
				if (mouth1 == 0) {
					mouth1 = 12;
					year1 = year1 - 1;
				}
				vm.startTime = year1 + "-" + mouth1 + "-" + day;
				vm.endTime = year + "-" + mouth + "-" + day;
				$(this).addClass('active').parent('span').siblings().find('a')
						.removeClass('active');
			}
			// 三个月
			if (type == 3) {
				if (mouth2 == 0) {
					mouth2 = 12;
					year1 = year1 - 1;
				}
				if (mouth2 < 0) {
					mouth2 = mouth + 10;
					year1 = year1 - 1;
				}
				vm.startTime = year1 + "-" + mouth2 + "-" + day;
				vm.endTime = year + "-" + mouth + "-" + day;
				$(this).addClass('active').parent('span').siblings().find('a')
						.removeClass('active');
			}
			// 一年
			if (type == 12) {
				vm.startTime = year2 + "-" + mouth + "-" + day;
				vm.endTime = year + "-" + mouth + "-" + day;
				$(this).addClass('active').parent('span').siblings().find('a')
						.removeClass('active');
			}
		},
		seach : function() {
			vm.pager.currentPage = 1;
			getOrderList(1);
		},
		changeOrder : function() {
			changeOrder();
		},
		reset : function() {
			vm.student_name = "";
			vm.info = "";
			vm.channel = "请选择渠道";
			vm.channel_id = "";
			vm.list_source = "请选择名单来源";
			vm.list_source_id = "";
			vm.user = "请选择负责人";
			vm.user_id = "";
			vm.order_status = "请选择状态";
			vm.order_status_id = "";
			$(".time a").removeClass("active");
			vm.startTime = "";
			vm.endTime = "";
			$(".input_2_parent").find("li").removeClass("active");
			vm.pager.currentPage = 1;
			getOrderList(1);
		},
		// 设定渠道
		setChannel : function(channelId) {
			vm.channel_id = channelId;
		},
		// 设定名单来源
		setListSource : function(listSourceId) {
			vm.list_source_id = listSourceId;
		},
		// 设定负责人
		setUser : function(userId) {
			vm.user_id = userId;
		},
		// 设定状态
		setOrderStatus : function(orderStatusId) {
			vm.order_status_id = orderStatusId;
		},
		// 设定渠道
		setChangeChannel : function(chaneChannelId) {
			vm.change_channel_id = chaneChannelId;
		},
		// 设定名单来源
		setChangeListSource : function(changeListSourceId) {
			vm.change_list_source_id = changeListSourceId;
		},
		// 设定状态
		setChangeOrderStatus : function(chaneOrderStatusId) {
			vm.change_order_status_id = chaneOrderStatusId;
		},
		// 设定负责人
		setChangeUser : function(chaneUserId) {
			vm.change_user_id = chaneUserId;
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
		}
	})
	function changeOrder() {
		var val1=vm.validatorName("#change_student_name");
		var val2=vm.validatorInfo("#change_info");
		var val3=(vm.change_channel_id!=""&&vm.change_channel_id!="0")?true:false;
		var val4=(vm.change_list_source_id!=""&&vm.change_list_source_id!="0")?true:false;
		var val5=(vm.change_user_id!=""&&vm.change_user_id!="0")?true:false;
		var val6=(vm.change_order_status_id!=""&&vm.change_order_status_id!="0")?true:false;
		var val7=vm.validatorRemark("#change_order_remark");
    	if(val1 && val2&& val3&& val4&& val5&& val6&& val7){
    		var param = {
    				studentName:vm.change_student_name,
    				info:vm.change_info,
    				channelId:vm.change_channel_id,
    				listSourceId:vm.change_list_source_id,
    				userId:vm.change_user_id,
    				orderId : vm.change_order_id,
    				orderStatusId : vm.change_order_status_id,
    				remark : vm.change_order_remark
    		};
    		$.ajax({
    			url : "changeOrder.json",
    			dataType : "json",
    			data : param,
    			type : "post",
    			async : true,
    			success : function(r) {
    				showTips(r.data.result);
    				vm.close('ChangeOrder');
    				vm.close('ChangeOrder2');
    				vm.pager.currentPage = 1;
    				getOrderList(1);
    			},
    			failure : function(r) {
    				showTips(r.data.result);
    			}
    		});
    	}
	}
	function getOrderList(isShowPageOne) {
		var param = {
			pageSize : vm.pager.perPages,
			currentPage : vm.pager.currentPage,
			studentName : vm.student_name,
			info : vm.info,
			channelId : vm.channel_id,
			listSourceId : vm.list_source_id,
			userId : vm.user_id,
			orderStatusId : vm.order_status_id,
			startTime : vm.startTime,
			endTime : vm.endTime
		};
		$.ajax({
			url : "myOrderList.json",
			dataType : "json",
			data : param,
			type : "post",
			async : true,
			success : function(data) {

				$("#orderInfo").show();
				if(data != null&&data.data!=null){
					vm.orderList = data.data.beanList;
					if(data.data.beanList == null){
						$("#orderInfo").hide();
					} else {
						$("#orderInfo").show();
						setTimeout(function(){
							$('.classifySpan').each(function(){
								$(this).attr('title', $(this).text());
							});
						},100)
					}
				}
				setTimeout(function(){
					avalon.vmodels.orderPager.totalItems =
						data.data.pageBean.totalItem;
				},10)
				if(isShowPageOne==1){
					avalon.vmodels.orderPager.currentPage=1;
				}
			},
			failure : function(r) {
				showTips(r.error_info);
			}
		});
	}
    /**
     * 获取rsa密码
     * @param callback
     */
    function getRSA(){
        if(RSAUtils){
            $.ajax({
                url:"/sts/user/getModulusExponent.json",
                type:"GET",
                success:function (result){
                    vm.key = RSAUtils.getKeyPair(result.data.exponent, '', result.data.modulus);
                }
            })
        }
    };

	$(function() {
        getRSA();
		getOrderList();
	})

	$(".input_2_parent").each(function() {
		$(this).on("click", function() {
			$(this).find("ul").toggle();
		})

		$(this).find("li").each(function() {
			$(this).on("click", function() {
				$(this).addClass("active").siblings().removeClass("active");
				var text = $(this).text();
				$(this).parent().siblings(".input_2").val(text);
			})
		})
		$(this).mouseleave(function() {
			$(this).find("ul").hide();
		});
	})

	$(function() {
		$('#channel,#list_source','#user','order_status').focus(function() {
			$(this).blur(); // 设置文本框取消获得焦点
		});
	})
	 //回车事件
    document.onkeydown = function (event) {
        var e = event || window.event;
        if (e && e.keyCode == 13) { //回车键的键值为13
    		getOrderList();
//    		vm.reset();
        }
    }; 

	avalon.scan();
	
	avalon.filters.contactsplit = function(str, args){//str为管道符之前计算得到的结果，默认框架会帮你传入，此方法必须返回一个值
		   /* 具体逻辑 */
		var mobilephone = str.split(args)[0];
		var qq = str.split(",")[1];
		var wechat = str.split(",")[2];
		var phone = str.split(",")[3];
		var contact = '手机：'+mobilephone+'</br>'+'QQ：'+qq+'</br>'+'微信：'+wechat+'</br>'+'电话：'+phone;
		return contact;
	}
})

// 显示提示框
	function showTips(message, time) {
		time = time == undefined ? 1300 : time;
			$.blockUI({
				message : '<div class="con-pop"><div class="inner"><div class="details"><p style="text-align: center">'
						+ message + '</p></div></div></div>',
				timeout : time,
				overlayCSS : {
					opacity : 0.05,
					cursor : "default"
				},
				css : {
					left : '43%',
					position : 'fixed',
					border : "0px",
					backgroundColor : "none",
					cursor : "auto",
					textAlign : "left"
				}
			});
	
}
