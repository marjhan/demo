package biz.service;

import java.util.List;

import biz.domain.ListSource;
import biz.domain.OrderStatus;

/** 
* @author  xuzc
* @date 2018年1月14日 上午12:37:59 
* @version 1.0 
* @parameter  
* @since  
* @return  */
public interface IOrderStatusService {
	
	List<OrderStatus> queryOrderStatusList();
	
	List<OrderStatus> queryAllOrderStatusList();
	
	int addOrderStatus(OrderStatus orderStatus);
	
	int updateOrderStatusStatus(OrderStatus orderStatus);

}
