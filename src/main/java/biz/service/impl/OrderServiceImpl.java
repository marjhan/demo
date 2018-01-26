package biz.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import biz.common.exception.BusinessException;
import biz.dao.IOrderChangeLogDao;
import biz.dao.IOrderDao;
import biz.domain.Order;
import biz.domain.OrderChangeLog;
import biz.domain.OrderListDTO;
import biz.req.ChangeOrderReq;
import biz.req.CheckMobilePhoneReq;
import biz.req.OrderListReq;
import biz.res.ChangeOrderRes;
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

	/** 订单修改日志dao. */
	@Autowired
	private IOrderChangeLogDao orderChangeLogDao;

	@Override
	public OrderListRes queryOrderList(OrderListReq req) {
		OrderListRes res = new OrderListRes();
		int count = orderDao.getOrderListByUserCount(req);
		req.setTotalItem(count);
		req.reSetParameters();
		List<OrderListDTO> beanList = orderDao.queryOrderListByUser(req);
		res.setBeanList(beanList);
		res.setPageBean(req.copyPagination());
		return res;
	}

	@Override
	@Transactional
	public ChangeOrderRes changeOrder(ChangeOrderReq req) {
		ChangeOrderRes res = new ChangeOrderRes();
		String result = "";
		OrderChangeLog orderChangeLog = new OrderChangeLog();
		Order oldOrder = orderDao.selectByPrimaryKey(req.getOrderId());
		if(oldOrder!=null){
			Integer oldOrderStatusId = oldOrder.getOrderStatusId();
			String oldRemark = oldOrder.getRemark();
			if(oldOrder.getOrderStatusId()!=req.getOrderStatusId() ||!oldOrder.getRemark().equalsIgnoreCase(req.getRemark())){
				try {
					oldOrder.setOrderId(req.getOrderId());
					oldOrder.setOrderStatusId(req.getOrderStatusId());
					oldOrder.setRemark(req.getRemark());
					
					orderDao.updateByPrimaryKey(oldOrder);
					
					orderChangeLog.setOldOrderStatusId(oldOrderStatusId);
					orderChangeLog.setNewOrderStatusId(req.getOrderStatusId());
					orderChangeLog.setOldRemark(oldRemark);
					orderChangeLog.setNewRemark(req.getRemark());
					orderChangeLog.setUserId(req.getUserId());
					orderChangeLogDao.insert(orderChangeLog);
					
					result = "订单修改成功！";
				} catch (BusinessException e) {
					e.printStackTrace();
					result = "订单修改失败！请重新操作";
				}
			}else{
				result = "订单修改成功！";
			}
		}else{
			result = "订单不存在，请重新操作";
		}
		res.setResult(result);
		return res;
	}

	@Override
	public boolean checkMobilePhone(CheckMobilePhoneReq req) {
		return orderDao.getOrderByMobilePhone(req);
	}

	@Override
	public int addOrder(Order order) {
		return orderDao.insertSelective(order);
	}

}
