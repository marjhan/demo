/**
 * Created by hk on 16-8-8.
 */
require(["domReady!","avalon","jquery","common/common","pager","jquery.cookie","header","zclip","commona"],function (dom,avalon,$,common){
	
	var zclip=null;
	var model=avalon.define({
		$id:"channel",
		channel_name:"",
		// 修改密码
		key:"",
		old_password:$('#old_password').val(),// 原密码
		new_password:$('#new_password').val(),// 新密码
		new_password_1:$('#new_password_1').val(),// 新密码确认
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
        /**
		 * 加密字符串
		 * 
		 * @param str
		 * @returns {*}
		 */
        encoding:function (str){
            if(RSAUtils && model.key != ""){
                return RSAUtils.encryptedString(model.key,str);
            }else{
                return str;
            }
        },
		/*原密码校验：1.不能为空；2.长度在6-14之间；*/
	    u1:function(){
	    	if(model.old_password == '' || model.old_password == null || model.old_password == undefined){
	    		$('#u1').html('不能为空');
	    		$('#u1').show();
	    		return false;
	    	}else{
	    		if(model.old_password.length>=6&&model.old_password.length<=14){
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
	    	if(model.new_password !=''){
	    		if(model.new_password == model.old_password){
	    			$('#v1,#v2,#v3').removeClass('active');
	    			$("#u2").html("新旧密码不能一致！");
	    			$('#u2').show();
	    			return false;
	    		}else{
	    			if(model.new_password.length>=6&&model.new_password.length<=14){// /^[\w]{6,14}$/ 验证字母，数字，下划线
		    			$('#v1,#v2,#v3').removeClass('active');
		    			var a = 0;
		    			if(model.new_password.match(/[0-9]/g)){
		    				a++;
		    			}
		    			if(model.new_password.match(/[a-zA-Z]/g)){
		    				a++;
		    			}
		    			if(model.new_password.match(/.[^a-zA-Z0-9]/g)){
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
	    	if(model.new_password_1 != ''){
	    		if( model.new_password == model.new_password_1){
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
	    	if(model.u1() && model.u2() && model.u3()){
	    		var old_password = model.encoding(model.old_password);
	    		var new_password = model.encoding(model.new_password);
	    		var param = {
	    				//hsid:model.hsid,
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
                    		model.close('ChangePassword');
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
	    //关闭弹框
	    close:function(id){
	    	$('#'+id).hide();
	    	$('#fade').hide();
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


    /**
	 * 获取rsa密码
	 * 
	 * @param callback
	 */
    function getRSA(){
        if(RSAUtils){
            $.ajax({
                url:"/sts/user/getModulusExponent.json",
                type:"GET",
                success:function (result){
                    model.key = RSAUtils.getKeyPair(result.data.exponent, '', result.data.modulus);
                }
            })
        }
    };

	$(function() {
        getRSA();
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

	avalon.scan();
})
