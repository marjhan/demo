package biz.service.impl;

import org.springframework.stereotype.Service;

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
public class UserLoginRegisterService implements IUserLoginRegisterService{

	@Override
	public LoginRes login(LoginReq req) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ResetPasswordRes resetPassword(ResetPasswordReq req) {
		// TODO Auto-generated method stub
		return null;
	}
	
}
