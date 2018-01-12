/**
 * Created by rk on 17-05-27.
 */
require([ "domReady!", "avalon", "jquery", "header", "common/common",
		"commona", "jquery.cookie", "pager", "datePicker" ], function(dom,
		avalon, $, common) {

	var vm = avalon.define({
		$id : "order",
		student_name : "",
		info : "",
		channel : "请选择渠道",
		channel_id : "",
		list_source : "请选择名单来源",
		list_source_id : "",
		user : "请选择负责人",
		user_id : "",
		startTime : "",
		endTime : "",
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
		reset : function() {
			vm.student_name = "";
			vm.info = "";
			vm.channel = "请选择渠道";
			vm.channel_id = "";
			vm.list_source = "请选择名单来源";
			vm.list_source_id = "";
			vm.user = "请选择负责人";
			vm.user_id = "";
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
		}
	})
	function getOrderList(isShowPageOne) {
		var param = {
			pageSize : vm.pager.perPages,
			currentPage : vm.pager.currentPage,
			student_name : vm.student_name,
			channel_id : vm.channel_id,
			list_source_id : vm.list_source_id,
			user_id : vm.user_id,
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
					avalon.vmodels.orderPage.totalItems =
						data.data.pageBean.totalItem;
				},10)
				if(isShowPageOne==1){
					avalon.vmodels.orderPage.currentPage=1;
				}
			},
			failure : function(r) {
				showTips(r.error_info);
			}
		});
	}

	$(function() {
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
		$('#channel,#list_source').focus(function() {
			$(this).blur(); // 设置文本框取消获得焦点
		});
	})

	avalon.scan();
})

// 显示提示框
function showTips(message, time) {
	time = time == undefined ? 1300 : time;
	$
			.blockUI({
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
