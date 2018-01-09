package biz.dao;

import biz.domain.LitsSource;

public interface ILitsSourceDao {
    int deleteByPrimaryKey(Integer listSourceId);

    int insert(LitsSource record);

    int insertSelective(LitsSource record);

    LitsSource selectByPrimaryKey(Integer listSourceId);

    int updateByPrimaryKeySelective(LitsSource record);

    int updateByPrimaryKey(LitsSource record);
}