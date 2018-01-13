package biz.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import biz.dao.IUserDao;
import biz.domain.User;
import biz.req.UserInfoGetReq;
import biz.res.UserInfoGetRes;
import biz.service.IUserInfoService;

/** 
* @author  xuzc
* @date 2017年12月29日 上午12:32:13 
* @version 1.0 
* @parameter  
* @since  
* @return  */
@Service
public class UserInfoServiceImpl implements IUserInfoService{

	/** 用户信息dao. */
	@Autowired
	private IUserDao userDao;

	@Override
	public UserInfoGetRes getUserInfo(UserInfoGetReq userInfOGetReq) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<User> queryUserInfoList() {
		return userDao.queryUserInfoList();
	}

}
