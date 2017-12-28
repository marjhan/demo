package biz.service;

import biz.req.LoginReq;
import biz.req.ResetPasswordReq;
import biz.res.LoginRes;
import biz.res.ResetPasswordRes;

/** 
* @author  xuzc
* @date 2017年12月28日 下午2:52:00 
* @version 1.0 
* @parameter  
* @since  
* @return  */
public interface IUserLoginRegisterService {
	
	/**
	 * 用户登录验证
	 * @param user_name
	 * @param password
	 * @return
	 */
	public LoginRes login(LoginReq req);

	/**
	 * 重置密码
	 * @param req
	 * @return
	 */
	public ResetPasswordRes resetPassword(ResetPasswordReq req);
}
