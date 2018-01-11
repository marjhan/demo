/**
 * Created by rk on 2017/6/24
 */
require(["domReady!","avalon","jquery","common/common","jquery.cookie"], function(dom,avalon,$,common) {
	var service_content = decodeURI(common.getUrlParam("service_content"));
    var apiMenu =avalon.define({
        $id:"apiMenu",
        url:"",
        keyWorkList:[],//关键字列表
        service_content:$("#searchInput").val(),//按照服务名搜索
        submitQuery:function(e){
            e=e||event;
            var keycode = (e.keyCode ? e.keyCode : e.which);
            if(keycode == '13'){
            	/*if($.trim(apiMenu.service_content)==""){
            		common.tips("搜索关键字不能为空，请输入您感兴趣的关键字！");
            		return;
            	}*/
                window.location.href="/market.html?service_content="+$.trim(apiMenu.service_content);
            } 
        },
        queryByServerName:function(type,e){
        	/*if($.trim(apiMenu.service_content)==""){
        		common.tips("搜索关键字不能为空，请输入您感兴趣的关键字！");
        		return;
        	}*/
            window.location.href="/market.html?service_content="+$.trim(apiMenu.service_content);
        },
    });
    var keyword = decodeURI(common.getUrlParam("key_word"));
    var serverName = decodeURI(common.getUrlParam("service_name"));
    apiMenu.search_keyword=keyword||serverName;
    if($.trim(service_content)!=""){
    	apiMenu.service_content=service_content;
    }

    avalon.scan(document.body);
    
});

