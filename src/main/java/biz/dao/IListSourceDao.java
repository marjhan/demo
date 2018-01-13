package biz.dao;

import java.util.List;

import biz.domain.ListSource;

public interface IListSourceDao {
    int deleteByPrimaryKey(Integer listSourceId);

    int insert(ListSource record);

    int insertSelective(ListSource record);

    ListSource selectByPrimaryKey(Integer listSourceId);

    int updateByPrimaryKeySelective(ListSource record);

    int updateByPrimaryKey(ListSource record);
    
    List<ListSource> queryListSourceList();
}