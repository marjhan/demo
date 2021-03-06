package biz.service.impl;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import biz.action.user.UserLoginRegisterAction;
import biz.common.exception.BusinessException;
import biz.common.util.FrontConstants;
import biz.common.util.MD5;
import biz.dao.IRoleDao;
import biz.dao.IUserDao;
import biz.domain.Role;
import biz.domain.User;
import biz.req.LoginReq;
import biz.res.LoginRes;
import biz.service.IUserLoginRegisterService;

/**
 * @author xuzc
 * @date 2017年12月28日 下午2:52:00
 * @version 1.0
 * @parameter
 * @since
 * @return
 */

@Service
public class UserLoginRegisterServiceImpl implements IUserLoginRegisterService {	
	
	/**日志对象.*/
	static Logger logger = Logger.getLogger(UserLoginRegisterServiceImpl.class);

	/** 用户信息dao. */
	@Autowired
	private IUserDao userDao;

	/** 角色信息dao. */
	@Autowired
	private IRoleDao roleDao;

	@Override
	public LoginRes login(LoginReq req) {
		try {
			String password = MD5.getResult(req.getPassword());
			LoginRes loginRes = new LoginRes();
			Role role = new Role();
			User user = userDao.selectByUserName(req.getUserName());
			logger.info(password);
			logger.info(user.getPassword());
			if (user == null) {
				throw new BusinessException("000", "用户名不存在");
			} else if (user.getPassword().contains(password)||password.contains(user.getPassword())) {
				role = roleDao.selectByPrimaryKey(user.getRoleId());
				if (role == null) {
					throw new BusinessException("000", "角色不存在");
				} else {
					loginRes.setUserId(user.getUserId());
					loginRes.setUserName(user.getUserName());
					loginRes.setRealName(user.getRealName());
					loginRes.setRoleId(role.getRoleId());
					loginRes.setRoleName(role.getRoleName());
					return loginRes;
				}
			} else {
				throw new BusinessException(FrontConstants.ERROR_CODE_5103007, "密码错误");
			}
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			throw new BusinessException(FrontConstants.ERROR_CODE_5103007, "密码错误");
		}
	}

}
