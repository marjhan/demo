/**
 * Created by hk on 16-8-8.
 */
require(["domReady!","avalon","jquery","common/common","pager","jquery.cookie","header","zclip","commona"],function (dom,avalon,$,common){
	
	var zclip=null;
	var model=avalon.define({
		$id:"channel",
		channel_name:"",
		pager:{
			currentPage: 1,
			perPages:5,
			totalItems: $("#channellistsizetext").val(),
			showJumper: true,
			onJump: function(e, data) {
				model.pager.currentPage = data.currentPage;//设置当前页码
				var lastshowtr=$("#channellistTable").find("tbody").find("tr:visible");//找到原先显示的列表
				lastshowtr.each(function(){
					var copytd=$(this).find("td:eq(5)");//找到“Key & Secret”列
					copytd.find("div").find("p").find("div").remove();//将列中通过zclip.js添加的flash删除
				});
				lastshowtr.hide();	//隐藏原先显示的列表
				var first=(model.pager.currentPage-1)*model.pager.perPages;//设置当前页码应该显示的第一条数据的下标
				var end=(first+model.pager.perPages)>model.pager.totalItems?model.pager.totalItems:(first+5);//设置当前页码应该显示的最后一条数据的下标
				$("#channellistTable").find("tbody").find("tr").each(function(i){
					var tr=$(this);
					if(i>=first && i<end){//将属于当前页码的数据显示
						tr.show();
					}
				})
				//refreshClip();//设置当前列可复制
			}
		},
		/*验证渠道名*/
		validatorChannelName:function(el){
			
			var reg=/^[\u4E00-\u9FA5A-Za-z0-9]+$/;//渠道名正则
			var result=false;
			$(el).siblings("div").remove();
			$(el).parent().children("div .sl-error").remove();
			var $txt=$.trim($(el).val());
			if($txt==""){
				$(el).parent().append("<div class='sl-error'><i class='error'></i>渠道名不能为空</div>");
			}else if($txt.length>15){
				$(el).parent().append("<div class='sl-error'><i class='error'></i>渠道名不能为超过15个字符</div>");
			}else if(!reg.test($txt)){
				$(el).parent().append("<div class='sl-error'><i class='error'></i>渠道名只能由中文字母以及数字组成</div>");
			}else{
				result=true;
			}
			return result;
		},
		$skipArray:["pager"],
		addChannel:function(){
			var val1=model.validatorChannelName("#channel_name");
        	if(val1){
        		common.ajax({
        			url : "option/addChannel.json" ,
        	        dataType : 'text/html' ,
        	        type:"post",
        	        async:false,
        	        data:{
        	        	channelName:$("#channel_name").val(),
        	        },
        	        callback: function(data){
            			common.tips("用户新增成功");
						setTimeout(function(){
	        				location.replace(location.href);
						},1500)
        	        },
        	        failure:function(r){
        	        	common.alertNodePop(r.error_info);
        	        }
        		});
        	}
		},
		updateChannelStatus:function(channel_id,status){
        	common.ajax({
        		url : "option/updateChannelStatus.json" ,
        	    dataType : 'text/html' ,
        	    type:"post",
        	    async:false,
        	    data:{
        	        channelId:channel_id,
        	        status:status,
        	    },
        	    callback: function(data){
        	    	common.tips("用户状态修改成功");
        	    	setTimeout(function(){
        	    		location.replace(location.href);
						},1500)
        	        },
        	   failure:function(r){
        	        common.alertNodePop(r.error_info);
        	   }
        	});
		},	
	});
	

	avalon.scan();
})
