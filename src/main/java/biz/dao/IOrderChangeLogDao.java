package biz.dao;

import biz.domain.OrderChangeLog;

public interface IOrderChangeLogDao {
    int deleteByPrimaryKey(Integer orderChangeLogId);

    int insert(OrderChangeLog record);

    int insertSelective(OrderChangeLog record);

    OrderChangeLog selectByPrimaryKey(Integer orderChangeLogId);

    int updateByPrimaryKeySelective(OrderChangeLog record);

    int updateByPrimaryKey(OrderChangeLog record);
}