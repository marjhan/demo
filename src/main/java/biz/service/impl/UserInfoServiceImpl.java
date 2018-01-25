package biz.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import biz.common.exception.BusinessException;
import biz.common.util.FrontConstants;
import biz.common.util.MD5;
import biz.dao.IUserDao;
import biz.domain.User;
import biz.req.UpdatePwdReq;
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

	@Override
	public List<User> queryAllUserInfoList() {
		return userDao.queryAllUserInfoList();
	}

	@Override
	public void updateUserInfo(UpdatePwdReq req) {
		try {
			User user = new User();
			user.setPassword(req.getNewPwd());
			user.setUserId(req.getUserId());
			userDao.updateByPrimaryKeySelective(user);
		} catch (Exception e) {
			e.printStackTrace();
			throw new BusinessException("82", "网络异常");
		}	
	}

	@Override
	public int addUser(User user) {
		try {
			user.setPassword(MD5.getResult("000000"));
			user.setStatus("1");
			user.setRoleId(2);
			return userDao.insertSelective(user);
		} catch (Exception e) {
			throw new BusinessException(FrontConstants.ERROR_CODE_5103007, "添加用户失败");
		}
	}

	@Override
	public int updateUserStatus(User user) {
		return userDao.updateByPrimaryKeySelective(user);
	}

}
