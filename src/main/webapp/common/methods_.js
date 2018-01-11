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
