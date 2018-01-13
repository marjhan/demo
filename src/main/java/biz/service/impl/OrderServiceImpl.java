package biz.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import biz.dao.IOrderDao;
import biz.domain.OrderListDTO;
import biz.req.OrderListReq;
import biz.res.OrderListRes;
import biz.service.IOrderService;

/** 
* @author  xuzc
* @date 2018年1月13日 上午1:33:08 
* @version 1.0 
* @parameter  
* @since  
* @return  */
@Service
public class OrderServiceImpl implements IOrderService{

	/** 订单信息dao. */
	@Autowired
	private IOrderDao orderDao;

	@Override
	public OrderListRes queryOrderList(OrderListReq req) {
		OrderListRes res = new OrderListRes();
		int count = orderDao.getOrderListByUserCount(req);
		req.setTotalItem(count);
		req.reSetParameters();
		List<OrderListDTO> beanList = orderDao.queryOrderListByUser(req);
		res.setBeanList(beanList);
		res.setPageBean(req.copyPagination());
		// TODO Auto-generated method stub
		return res;
	}

}
