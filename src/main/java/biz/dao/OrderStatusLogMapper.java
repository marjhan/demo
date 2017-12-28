package biz.dao;

import biz.domain.OrderStatusLog;

public interface OrderStatusLogMapper {
    int deleteByPrimaryKey(Integer orderStatusLogId);

    int insert(OrderStatusLog record);

    int insertSelective(OrderStatusLog record);

    OrderStatusLog selectByPrimaryKey(Integer orderStatusLogId);

    int updateByPrimaryKeySelective(OrderStatusLog record);

    int updateByPrimaryKey(OrderStatusLog record);
}