package biz.dao;

import java.util.List;

import biz.domain.User;

public interface IUserDao {
	
    int deleteByPrimaryKey(Integer userId);

    int insert(User record);

    int insertSelective(User record);

    User selectByPrimaryKey(Integer userId);

    User selectByUserName(String userName);

    int updateByPrimaryKeySelective(User record);

    int updateByPrimaryKey(User record);
    
    List<User> queryUserInfoList();
}