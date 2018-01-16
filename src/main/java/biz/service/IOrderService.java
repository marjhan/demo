package biz.service;

import biz.domain.Order;
import biz.req.ChangeOrderReq;
import biz.req.CheckMobilePhoneReq;
import biz.req.OrderListReq;
import biz.res.ChangeOrderRes;
import biz.res.OrderListRes;

/** 
* @author  xuzc
* @date 2018年1月13日 上午1:27:50 
* @version 1.0 
* @parameter  
* @since  
* @return  */
public interface IOrderService {
	
	public OrderListRes queryOrderList(OrderListReq req);
	
	public ChangeOrderRes changeOrder(ChangeOrderReq req);
	
	public boolean checkMobilePhone(CheckMobilePhoneReq req);
	
	public int addOrder(Order order);
	
}
