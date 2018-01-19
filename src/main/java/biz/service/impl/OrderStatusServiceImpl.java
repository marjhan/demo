package biz.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import biz.dao.IOrderStatusDao;
import biz.domain.OrderStatus;
import biz.service.IOrderStatusService;

/** 
* @author  xuzc
* @date 2018年1月14日 上午12:39:10 
* @version 1.0 
* @parameter  
* @since  
* @return  */
@Service
public class OrderStatusServiceImpl implements IOrderStatusService{

	/** 渠道信息dao. */
	@Autowired
	private IOrderStatusDao orderStatusDao;

	@Override
	public List<OrderStatus> queryOrderStatusList() {
		return orderStatusDao.queryOrderStatusList();
	}

	@Override
	public List<OrderStatus> queryAllOrderStatusList() {
		return orderStatusDao.queryAllOrderStatusList();
	}

	@Override
	public int addOrderStatus(OrderStatus orderStatus) {
		return orderStatusDao.insertSelective(orderStatus);
	}

	@Override
	public int updateOrderStatusStatus(OrderStatus orderStatus) {
		return orderStatusDao.updateByPrimaryKeySelective(orderStatus);
	}

}
