package biz.dao;

import biz.domain.RemakeLog;

public interface RemakeLogMapper {
    int deleteByPrimaryKey(Integer remakeLogId);

    int insert(RemakeLog record);

    int insertSelective(RemakeLog record);

    RemakeLog selectByPrimaryKey(Integer remakeLogId);

    int updateByPrimaryKeySelective(RemakeLog record);

    int updateByPrimaryKey(RemakeLog record);
}