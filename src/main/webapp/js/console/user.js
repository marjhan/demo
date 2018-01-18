/**
 * Created by hk on 16-8-8.
 */
require(["domReady!","avalon","jquery","common/common","pager","jquery.cookie","header","zclip","commona"],function (dom,avalon,$,common){
	
	var zclip=null;
	var model=avalon.define({
		$id:"prd_app",
		appkey:"",
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
		$skipArray:["pager"],
		addApp:function(){
			var appsize=$("#applistsizetext").val();
			if(appsize>=100){
				$("#overSizePop").show();
				$("#fade").show();
			}else{
				window.location.href="/console/app_add.html";
			}
		},
		closePop:function(){//关闭弹窗
			$(".popup_bg").hide();
			$("#fade").hide();
		},
		
	});

	$(function(){
		
	})
	

	avalon.scan();
})
