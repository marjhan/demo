package biz.dao;

import java.util.List;

import biz.domain.OrderStatus;

public interface IOrderStatusDao {
    int deleteByPrimaryKey(Integer orderStatusId);

    int insert(OrderStatus record);

    int insertSelective(OrderStatus record);

    OrderStatus selectByPrimaryKey(Integer orderStatusId);

    int updateByPrimaryKeySelective(OrderStatus record);

    int updateByPrimaryKey(OrderStatus record);
    
    List<OrderStatus> queryOrderStatusList();
}