package biz.dao;

import java.util.List;

import biz.domain.Order;
import biz.domain.OrderListDTO;
import biz.req.CheckMobilePhoneReq;
import biz.req.OrderListReq;

public interface IOrderDao {
    int deleteByPrimaryKey(Integer orderId);

    int insert(Order record);

    int insertSelective(Order record);

    Order selectByPrimaryKey(Integer orderId);

    int updateByPrimaryKeySelective(Order record);

    int updateByPrimaryKey(Order record);
    
    List<OrderListDTO> queryOrderListByUser(OrderListReq req);
    
    int getOrderListByUserCount(OrderListReq req);
    
    boolean getOrderByMobilePhone(CheckMobilePhoneReq req);
}