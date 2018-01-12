package biz.service.impl;

import java.util.ArrayList;
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

	/** 用户信息dao. */
	@Autowired
	private IOrderDao orderDao;

	@Override
	public OrderListRes queryOrderList(OrderListReq req) {
		OrderListRes res = new OrderListRes();
		List<OrderListDTO> beanList = new ArrayList<OrderListDTO>();
		int count = 10;
		req.setTotalItem(count);
		req.reSetParameters();
		res.setBeanList(beanList);
		res.setPageBean(req.copyPagination());
		// TODO Auto-generated method stub
		return null;
	}

}
