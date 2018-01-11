/**
 * Created by dmb17192 on 17-08-05.
 */

/**
 * 表格创建
 */

function createTabByManyArrObj(DITC,tabId,bigdata,cName){
	
	createTabByArr(DITC,tabId,bigdata,false,cName);
}

/**
 * 创建表格
 * @param DITC
 * @param tabId
 * @param bigdata
 * @param isAppend
 * @returns
 */
function createTabByArr(DITC,tabId,bigdata,isAppend,cName){
	
	var dataObj = Object.keys(bigdata);
	if( dataObj.length > 0 ){
		//初始化一个空表格
		var $table=$("#"+tabId);
		if(isAppend == false){
			$table.html("");
		}
		
		var lessR = 0;
		var firtNode = 0;
		var head2 = "<tr ><td colspan='2'>公司名称</td><td colspan='2'>"+ cName +"</td></tr>";
		for(var d =0; d<dataObj.length; d++  ){
			var tabName =  dataObj[d];
			var data = bigdata[tabName];
			if(data && data instanceof Array){
				lessR++;
				//多个list
				
				if( data.length>0 ){
					//循环List
					var serial = 0;
					var totalLen = 0;
					var sb = "";
					var initRow = null;
					for(var i =0; i<data.length ; i++){
						var obj = data[i];
						var propertiesArr = Object.keys(obj);
						var length = propertiesArr.length;
						totalLen+= length;
						for(var pi =0; pi<length; pi++){
							var name = propertiesArr[pi];
							var value = null;
							
							if("penContent" == name){
								   value = obj['penContent'].illegalAct + "<br/>" + obj['penContent'].mainIllegalAct;
							}else{
								   value = obj[propertiesArr[pi]];
							}
							
							if(pi==0){
								var s = "<tr ><td rowspan="+ length  +">"+(i+1)+"</td><td >"+ (DITC ==null? name :  DITC[name] == undefined ? name : DITC[name]) +"</td><td >"+ value +"</td></tr>";
								if(i ==0 ){
									initRow = new Object();
									initRow.len = length;
									initRow.name = name;
									initRow.value = value;
								}else{
									sb += s;
								}
							}else{
								sb += "<tr ><td  >"+ (DITC ==null? name :  DITC[name] == undefined ? name : DITC[name] )  +"</td><td  >"+ value +"</td></tr>" ;
							}
						}
					}
					if(totalLen > 0 && initRow != null){
						if(lessR == 1){
							var head = "<tr ><td>类型</td><td>序号</td><td >字段名</td><td >字段值</td></tr>";
							sb  = head + "<tr ><td rowspan="+ totalLen  +">"+ (DITC ==null? tabName :  DITC[tabName] == undefined ? tabName :  DITC[tabName] )  +"</td><td rowspan="+ initRow.len  +">"+1+"</td><td >"+  (DITC ==null? initRow.name :  DITC[initRow.name] == undefined ? initRow.name : DITC[initRow.name] )  +"</td><td >"+ initRow.value +"</td></tr>" + sb;	
						}else{
							sb  =  "<tr ><td rowspan="+ totalLen  +">"+ (DITC ==null? tabName :  DITC[tabName] == undefined ?  tabName : DITC[tabName] ) +"</td><td rowspan="+ initRow.len  +">"+1+"</td><td >"+  (DITC ==null? initRow.name :  DITC[initRow.name] == undefined ? initRow.name : DITC[initRow.name]   ) +"</td><td >"+ initRow.value +"</td></tr>" + sb;	
						}
					}
					initRow = null;
					firtNode++;
					if(firtNode == 1 ){
						$table.append(head2+sb);
					}else{
						$table.append(sb);
					}
					
				}
			}
		}
	}
}



function appendTabByManyArrObj(DITC,tabId,bigdata){
	
	createTabByArr(DITC,tabId,bigdata,true);
}


/**
 * 简单表格创建.
 */
function appendSimpleTabContent($tid,$d,DITC,call){
	var resultTab = $("#"+$tid);
	resultTab.html("");
	var i=0;
	for(var v in $d){
		if(i == 0){
			resultTab.append("<tr ><th colspan='2'>字段名</th><th colspan='2'>字段值</th></tr>");
		}
		var key = 'DITC.'+v;
		var val = DITC[v];
		if(typeof val != 'undefined' && typeof val=='string' && val.indexOf("avalon")<0 && $d[v] != '' &&  $d[v] != null){
			resultTab.append("<tr ><td colspan='2'>"+ val +"</td><td colspan='2'>"+ $d[v]  +"</td></tr>");
		}
		i++;
	}
	call();
}


function appendSimpleTab($tid,$d,DICT,call){
	var resultTab = $("#"+$tid);
	resultTab.html("");
	var proArr = Object.keys( $d );
	var head = "";
	var body = "";
	for(var i=0; i<proArr.length; i++){
		var n = proArr[i];
		head += "<th >"+ DICT[n]+" </th>";
		body += "<td >"+ $d[n] +"</td>";
	}
	resultTab.append("<tr >"+ head +"</tr>");
	resultTab.append("<tr >" + body  +"</tr>");
	if(typeof call == 'function'){
		call();
	}
}

function replaceHideSign(card){
	var pre = "**************";
	if(card.length == 15 ){
		pre = "***********";
	}else if(card.length == 11 ){
		pre = "*******";
	}
	return pre + card.slice(-4);
}

function replaceHideSignForName(name){
	if(name && name.length>0){
		var isChinese = name.charCodeAt(0) > 255;
		if( isChinese ){
			var pre = "**";
			return name.substr(0,1)+pre;
		}else{
			var pre = "***";
			if(name.length == 1){
				return name.substr(0,1) + pre;
			}else{
				return name.substr(0,1) + pre + name.substr(name.length-1);
			}
		}
	}else{
		return name;
	}
}


//读取key
function getQueryString(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }else{
    	//location.href = "/console/check_services.html";
    }
    
    return null;
}

//显示提示框
function showTips(message, time) {
	time = time == undefined ? 2000 : time;
	$.blockUI({
		message: '<div class="con-pop"><div class="inner"><div class="details"><p style="text-align: center">' + message + '</p></div></div></div>',
		timeout:  time, overlayCSS : { opacity : 0.05, cursor:"default" },
		css : { left:'43%', position : 'fixed', border:"0px", backgroundColor:"none", cursor:"auto", textAlign:"left" }
	});
}