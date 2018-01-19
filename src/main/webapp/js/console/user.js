/**
 * Created by hk on 16-8-8.
 */
require(["domReady!","avalon","jquery","common/common","pager","jquery.cookie","header","zclip","commona"],function (dom,avalon,$,common){
	
	var zclip=null;
	var model=avalon.define({
		$id:"user",
		user_name:"",
		real_name:"",
		pager:{
			currentPage: 1,
			perPages:5,
			totalItems: $("#userlistsizetext").val(),
			showJumper: true,
			onJump: function(e, data) {
				model.pager.currentPage = data.currentPage;//设置当前页码
				var lastshowtr=$("#userlistTable").find("tbody").find("tr:visible");//找到原先显示的列表
				lastshowtr.each(function(){
					var copytd=$(this).find("td:eq(5)");//找到“Key & Secret”列
					copytd.find("div").find("p").find("div").remove();//将列中通过zclip.js添加的flash删除
				});
				lastshowtr.hide();	//隐藏原先显示的列表
				var first=(model.pager.currentPage-1)*model.pager.perPages;//设置当前页码应该显示的第一条数据的下标
				var end=(first+model.pager.perPages)>model.pager.totalItems?model.pager.totalItems:(first+5);//设置当前页码应该显示的最后一条数据的下标
				$("#userlistTable").find("tbody").find("tr").each(function(i){
					var tr=$(this);
					if(i>=first && i<end){//将属于当前页码的数据显示
						tr.show();
					}
				})
				//refreshClip();//设置当前列可复制
			}
		},
		/*验证用户名*/
		validatorUserName:function(el){
			
			var reg=/^[A-Za-z0-9]+$/;//用户名正则
			var result=false;
			$(el).siblings("div").remove();
			$(el).parent().children("div .sl-error").remove();
			var $txt=$.trim($(el).val());
			if($txt==""){
				$(el).parent().append("<div class='sl-error'><i class='error'></i>用户名不能为空</div>");
			}else if($txt.length>20){
				$(el).parent().append("<div class='sl-error'><i class='error'></i>用户名不能为超过20个字符</div>");
			}else if(!reg.test($txt)){
				$(el).parent().append("<div class='sl-error'><i class='error'></i>用户名只能由字母以及数字组成</div>");
			}else{
				result=true;
			}
			return result;
		},
		/*验证真实姓名*/
		validatorRealName:function(el){
			
			var reg=/^[\u4E00-\u9FA5A-Za-z]+$/;//姓名正则
			var result=false;
			$(el).siblings("div").remove();
			$(el).parent().children("div .sl-error").remove();
			var $txt=$.trim($(el).val());
			if($txt==""){
				$(el).parent().append("<div class='sl-error'><i class='error'></i>真实姓名不能为空</div>");
			}else if($txt.length>20){
				$(el).parent().append("<div class='sl-error'><i class='error'></i>真实姓名不能为超过20个字符</div>");
			}else if(!reg.test($txt)){
				$(el).parent().append("<div class='sl-error'><i class='error'></i>真实姓名只能有由字母以及汉字组成</div>");
			}else{
				result=true;
			}
			return result;
		},
		$skipArray:["pager"],
		addUser:function(){
			var val1=model.validatorUserName("#user_name");
			var val2=model.validatorRealName("#real_name");
        	if(val1 && val2){
        		common.ajax({
        			url : "option/addUser.json" ,
        	        dataType : 'text/html' ,
        	        type:"post",
        	        async:false,
        	        data:{
        	        	userName:$("#user_name").val(),
        	        	realName:$("#real_name").val(),
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
		updateUserStatus:function(user_id,status){
        	common.ajax({
        		url : "option/updateUserStatus.json" ,
        	    dataType : 'text/html' ,
        	    type:"post",
        	    async:false,
        	    data:{
        	        userId:user_id,
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
