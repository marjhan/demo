/**
 * Created by dmb17192 on 17-08-05.
 * 分页功能实现
 */
function queryHisInfoList(pageNo) {
        		if(pageNo != undefined){
        			this.pageNo = pageNo;
        			this.pageFristItem = (pageNo-1) * this.pageSize;
        		}
        		
    			var data = {
    		        	'pageSize': this.pageSize,
    		        	'pageFristItem':this.pageFristItem,
    		        	'server_id':'000007',
    		        	'app_key':this.app_key
    		    };
    			
    		    $.ajax({
    		        url: '/cloud/datacheck/common/qryHistoryInfo.json',
    		        dataType: "json",
    		        type: "GET",
    		        timeout: 20000,
    		        data:data,
    		        success: function (result) {
    		        		if(result.success == true){
    		        			//计算pageNum
    		        			this.totalItem = JSON.parse(result.data).totalItem;
    		        			if(this.totalItem <=0){
    		        				this.pageNum = 0;
    		        				this.pageNo = 0;
    		        				return;
    		        			}else if(this.totalItem <= this.pageSize){
    		        				this.pageNum = 1;
    		        			}else if(this.totalItem > this.pageSize){
    		        				this.pageNum = Math.ceil(this.totalItem /this.pageSize );
    		        			}
    		        			//渲染结果，初始化结果
    		    	        	this.isHisShow = true;
    		    	        	this.hisIdInfos = [];
    		            		this.hisIdInfos =  JSON.parse(result.data).listBean ;
    		        		}
    		        },
    		        error: function (XMLHttpRequest, textStatus, errorThrown) {
        	        	showTips("查询数据失败."+textStatus,1000);
        	        }
    		    });
    		}

