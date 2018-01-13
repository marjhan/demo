package biz.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import biz.common.exception.BusinessException;
import biz.common.util.FrontConstants;
import biz.dao.IRoleDao;
import biz.dao.IUserDao;
import biz.domain.Role;
import biz.domain.User;
import biz.req.LoginReq;
import biz.req.ResetPasswordReq;
import biz.res.LoginRes;
import biz.res.ResetPasswordRes;
import biz.service.IUserLoginRegisterService;

/** 
* @author  xuzc
* @date 2017年12月28日 下午2:52:00 
* @version 1.0 
* @parameter  
* @since  
* @return  */

@Service
public class UserLoginRegisterServiceImpl implements IUserLoginRegisterService{

	/** 用户信息dao. */
	@Autowired
	private IUserDao userDao;

	/** 角色信息dao. */
	@Autowired
	private IRoleDao roleDao;

	@Override
	public LoginRes login(LoginReq req) {
		LoginRes loginRes = new LoginRes();
		Role role = new Role();
		User user = userDao.selectByUserName(req.getUserName());
		if(user==null){
			throw new BusinessException("000", "用户名不存在");
		}else if(user.getPassWord().equals(req.getPassword())){
			role = roleDao.selectByPrimaryKey(user.getRoleId());
			if(role==null){
				throw new BusinessException("000", "角色不存在");				
			}else{
				loginRes.setUserId(user.getUserId());
				loginRes.setUserName(user.getUserName());
				loginRes.setRealName(user.getRealName());
				loginRes.setRoleId(role.getRoleId());
				loginRes.setRoleName(role.getRoleName());
				return loginRes;
			}
		}else{
			throw new BusinessException(FrontConstants.ERROR_CODE_5103007, "密码错误");	
		}
	}

	@Override
	public ResetPasswordRes resetPassword(ResetPasswordReq req) {
		// TODO Auto-generated method stub
		return null;
	}
	
}
