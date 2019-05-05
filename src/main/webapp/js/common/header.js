/**
 * Created by rk on 2016/7/22
 */
require(["domReady!","avalon","jquery","common/common","jquery.cookie","jquery.actual"], function(dom,avalon,$,common) {
	
	var header = avalon.define({
		$id:"header",
        isCompany:true,
        username:'',//用户名
        deal_status:"",//实名认证状态
        left:"",
        search_doc: "",
        login:function(){
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
                    window.location.href ="/skyjoy/user/login.html";
                }
            })
        },
        toggleLogin:function(flag){
        	if(!flag){
        		$("#unlogin").show();
            	$("#login").hide();
        	}else{
        		$("#login").show();
            	$("#unlogin").hide();
        	}
        },
        toggleClass:function(event){
        	event.stopPropagation();
    		var logout = $(this).find('div');
    		if(logout.hasClass('none_select')){
    			logout.removeClass('none_select').addClass('show_select');
    			$(this).removeClass('user-close').addClass('user-open');
    		}else{
    			logout.removeClass('show_select').addClass('none_select');
    			$(this).removeClass('user-open').addClass('user-close');
    		}
        },
        iconSearch_show:function(){
        	//第1步设置背景图的宽度
  		  		//获取屏幕宽度
	  		var window_width = $(window).width();
	  			//设置背景图的宽度
	  		$(this).find(".iconSearch_box").width(window_width);
    		//第2步设置背景图的left
    			//获取距离浏览器左边的距离
    		var tmp = header.getOffsetLeft($(this));
    			//设置left
    		$(this).find(".iconSearch_box").css("left",-tmp+"px")
    		$(this).find(".iconSearch_box").slideDown("slow");
        },
        iconSearch_hide:function(id){
        	if(id=="1"){
        		$(this).find(".iconSearch_box").hide();
        	}
        	if(id=="2"){
        		$(this).parent().parent(".iconSearch_box").hide();
        	}
        },
        setAttribute:function(el){
			var child_menu_pannel = el.find(".child_menu_pannel");
			/*child_menu_pannel的bottom值：child_menu_pannel的高度值+1px*/
			//获取child_menu_pannel的高度值
			//var child_menu_pannel_height = child_menu_pannel.height();
			//设置child_menu_pannel的bottom值
			//child_menu_pannel.css("bottom",child_menu_pannel_height*-1);
			/*child_menu_pannel的left值：(li的宽度-child_menu_pannel的宽度)/2*/
			//获取当前li的宽度
			var li_width = el.width()+42;
			//获取child_menu_pannel的width
			var child_menu_pannel_width = el.find(".child_menu_pannel").width();
			//设置child_menu_pannel的left
			child_menu_pannel.css("left",(li_width-child_menu_pannel_width)/2+"px");
			header.left = (li_width-child_menu_pannel_width)/2;
		},
		getOffsetLeft:function(obj){
			var tmp1 = obj.offset().left;//第一级left
	        //var val = obj.offsetParent();
	        //var tmp2 = val.offset().left;//第二级left
	        //val = tmp1+tmp2;
	        return tmp1;
		},
	});
	
	$(function() {
		
		//搜索标签点击事件
		$('#search_tag a').click(function() {
			window.location.href="/result.html?content=" + $(this).text();
		});
	});
	
	$(".menu-list>li").on("mouseenter",function(){
		//第一步设置属性
		//header.setAttribute($(this));
		//步骤1：设置背景图的宽度
		  //获取屏幕宽度
		var window_width = $(window).width();
		  //设置背景图的宽度
		$(this).find(".common_background").width(window_width);
		//步骤2：设置背景图的left值
		//公式：tmp+li的一半-pannel的一半
		var tmp = header.getOffsetLeft($(this));
		//var pannelwidth = $(this).find(".child_menu_pannel").width();
		//var pannelwidth_half = pannelwidth/2;
		//var liwidth = $(this).width();
		//var liwidth_half = liwidth/2;
		//var left = common.accSub(tmp+liwidth_half+25,pannelwidth_half);
		var left = common.accSub(-(tmp+21),header.left);
		$(this).find(".common_background").css("left",-tmp+"px");
		//步骤3：设置当前背景图的高度
		$(this).find(".child_menu_ul").show();
		var this_child_menu_pannel_height = $(this).find(".child_menu_pannel").actual('height');
		$(this).find(".common_background").height(this_child_menu_pannel_height+40);
		$(this).find(".child_menu_ul").hide();
		//步骤4：显示当前面板，隐藏兄弟面板
		$(this).find(".child_menu_pannel").show();
		$(this).find(".common_background").slideDown("slow");
		$(this).find(".child_menu_ul").slideDown("slow");
		$(this).siblings().find(".child_menu_pannel").hide();
		$(this).siblings().find(".common_background").hide();
		$(this).siblings().find(".child_menu_ul").hide();
		return;
	})
	
	$(".menu-list>li").on("mouseleave",function(){
		$(this).find(".child_menu_pannel").hide();
		$(this).find(".common_background").hide();
		$(this).find(".child_menu_ul").hide();
		return;
	})
	$(".menu-list>li").on("click",function(){
		$(this).find(".child_menu_pannel").hide();
		$(this).find(".common_background").hide();
		$(this).find(".child_menu_ul").hide();
		return;
	})
	$(".common_hide_icon").click(function(){
		$(this).parent().siblings(".child_menu_pannel").hide();
		$(this).parent(".common_background").hide();
		$(this).parent().siblings().find(".child_menu_ul").hide();
		return;
	})
	
	function isLogin(){
        var username = common.isLogin();
        if(username!=""){
        	header.toggleLogin(true);
            header.username=username;
            common.ajax({
                url : "user/islogin.json" ,
                dataType : "json" ,
                type:"post",
                callback: function(data){
//                    $("#cas_logout_url").attr('ms-click','logout()');
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
	isLogin();
	$(function(){
		$(document).on("click",function(){
			$('.user_out').removeClass('user-open').addClass('user-close').find('div').removeClass('show_select').addClass('none_select');
		}) 
		//加载产品信息列表
		/* $.ajax({
			url: "/cloud/open/productInfo/menuList.json",
			type: "POST", async: false,
			success: function(data) {
				if(data.rows != null) {
					$.each(data.rows, function (index, item) {
    					var str = '<li><a target="_blank" href="/productInfo/' + item.serial_no + '.html">' + item.doc_name + '</a></li>';
    					$('#productInfo .child_menu_ul').append(str);
    				});
					if(data.rows.length == 0) {
						$('#productInfo .child_menu_pannel').remove();
					}
				}
			}
		}); */
	})
	
	avalon.scan();
})