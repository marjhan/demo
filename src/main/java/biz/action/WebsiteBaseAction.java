package biz.action;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;

import biz.common.exception.BusinessException;
import biz.common.util.ParamConstants;
import biz.req.UserInfoGetReq;
import biz.res.LoginRes;
import biz.res.UserInfoGetRes;
import biz.service.IUserInfoService;
import biz.session.provider.SessionProvider;
/** 
* @author  xuzc
* @date 2017年12月28日 下午1:13:34 
* @version 1.0 
* @parameter  
* @since  
* @return  */
public class WebsiteBaseAction {
	
	/** 日志对象. */
	static Logger logger = Logger.getLogger(WebsiteBaseAction.class);
	
	/**
	 * SessionProvider 对象.
	 */
	@Autowired
	private SessionProvider sessionProvider;
	/**
	 * 用户服务接口.
	 */
	@Autowired
	private IUserInfoService userInfoService;
	/**
	 * 登录对象.
	 */
	public  LoginRes loginRes=null;
	
	public String image = null;
    /**
     * session中获取用户信息.
     * @return 返回参数
     */
	public LoginRes getLoginRes(HttpServletRequest request){
		loginRes = (LoginRes)sessionProvider.getAttribute(request, ParamConstants.USER_ID);
		return loginRes;
	}
	
	/**
     * session中获取完整的用户信息.
     * @return 返回参数
     */
	public UserInfoGetRes getUserInfo(HttpServletRequest request){
		loginRes = getLoginRes(request);
		if(loginRes != null) {
			UserInfoGetReq req = new UserInfoGetReq();
			req.setUser_id(loginRes.getUserId());
			return userInfoService.getUserInfo(req);
		}
		return null;
	}
	
	/**
	 * 将用户信息传递到页面
	 * @param request
	 */
	public void SetUserInfoToPage(HttpServletRequest request) {
		LoginRes loginRes = getLoginRes(request);
		String loginName = "";
		if(loginRes != null) {
			try {
				loginName = loginRes.getUserName();
				loginName = loginName.substring(0, 3) + "******" + loginName.substring(loginName.length() - 4, loginName.length());
			} catch (Exception e) {
				logger.info(e);
				throw new BusinessException("000","数据错误");
			}
		}
		//用户登录信息
		request.setAttribute("loginInfo", loginRes);
		//用户信息
		request.setAttribute("userInfo", getUserInfo(request));
	}
	
	public String getImageValidation(HttpServletRequest request){
		image = (String)sessionProvider.getAttribute(request, "captchaToken");
		return image;
	}
    
}
