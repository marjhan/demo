package biz.action.user;

import java.security.KeyPair;
import java.security.interfaces.RSAPublicKey;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Timer;
import java.util.TimerTask;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import org.apache.commons.codec.binary.Hex;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import biz.action.WebsiteBaseAction;
import biz.action.common.CommonMethod;
import biz.common.exception.BusinessException;
import biz.common.util.FrontConstants;
import biz.common.util.ParamConstants;
import biz.common.util.RSAUtils;
import biz.entity.RequestStatisticsInfo;
import biz.entity.ResponseContext;
import biz.entity.ResponseEntity;
import biz.req.ErrorTimesReq;
import biz.req.LoginReq;
import biz.req.ResetPasswordReq;
import biz.res.ErrorTimesRes;
import biz.res.LoginRes;
import biz.service.IUserInfoService;
import biz.service.IUserLoginRegisterService;
import biz.session.provider.SessionProvider;
/**
 * 登录注册.
 * @author xufy12864.
 */
@Controller
@RequestMapping("/teng/user")
public class UserLoginRegisterAction extends WebsiteBaseAction{
	/**session提供.*/
	@Autowired
	private SessionProvider sessionProvider;
	/**登录注册接口.*/
	@Autowired
	private IUserLoginRegisterService userLoginRegisterService;
	/**用户信息接口.*/
	@Autowired
	private IUserInfoService userInfoService;
	@Value("${app.server.host}")
	private String host;
	@Value("${app.server.port}")
	private String port;
	static private Map<String, RequestStatisticsInfo> map = new HashMap<String, RequestStatisticsInfo>();

	/**日志对象.*/
	static Logger logger = Logger.getLogger(UserLoginRegisterAction.class);
	 private static final long PERIOD_DAY = 24 * 60 * 60 * 1000L;
	 
	 public UserLoginRegisterAction(){
		 Calendar calendar = Calendar.getInstance();
			/*** 定制每日0:00执行方法 ***/
			calendar.set(Calendar.HOUR_OF_DAY, 0);
			calendar.set(Calendar.MINUTE, 0);
			calendar.set(Calendar.SECOND, 0);
			
			//第一次执行定时任务的时间  
			Date date=calendar.getTime();
			
			//如果第一次执行定时任务的时间 小于当前的时间  
	        //此时要在 第一次执行定时任务的时间加一天，以便此任务在下个时间点执行。如果不加一天，任务会立即执行。  
			if (date.before(new Date())) {  
	            date = addDay(date, 1);  
	        }  
			Timer timer = new Timer();
			//安排指定的任务在指定的时间开始进行重复的固定延迟执行。
			timer.schedule(new ClearThread(), date, PERIOD_DAY);
	 }
	
	 // 增加或减少天数  
	    private  Date addDay(Date date, int num) {  
	        Calendar startDT = Calendar.getInstance();  
	        startDT.setTime(date);  
	        startDT.add(Calendar.DAY_OF_MONTH, num);  
	        return startDT.getTime();  
	    }  
		
		 private class ClearThread extends TimerTask {
	        public void run() {
	        	map.clear();
	        	logger.info("清空校验码map内容！");
	        }
	    }
	
	/**
	 * 登录页面.
	 * @param req 请求.
	 * @return 返回.
	 */
	@RequestMapping(value = "/toLogin")
	public  String toLogin(Model model, HttpServletRequest request, HttpServletResponse response) {
		SetUserInfoToPage(request);
		return "redirect:"+ "http://"+host +"/service/index.html";
	}
	
	/**
	 * 登录.
	 * @param req 请求.
	 * @return 返回.
	 */
	@RequestMapping(value="/login",method=RequestMethod.POST)
	public @ResponseBody ResponseEntity login(HttpServletRequest request,HttpServletResponse response,@Valid LoginReq req){
		ErrorTimesRes errorTimesRes = (ErrorTimesRes)sessionProvider.getAttribute(request, FrontConstants.ERROR_KEY+req.getUser_name().trim());
		if (errorTimesRes == null) {
			errorTimesRes = new ErrorTimesRes();
		}
		/**对密码进行解密.*/
		req.setPassword(CommonMethod.getPassword(req.getPassword(), request, response, sessionProvider));
		
	    String ip=(String)request.getSession().getAttribute("ip");
	    req.setIp(ip);
	    try {
	    	LoginRes loginRes = userLoginRegisterService.login(req);
//	    	UserInfoGetReq userInfoGetReq = new UserInfoGetReq();
//	    	userInfoGetReq.setUser_id(loginRes.getUser_id());
//	    	UserInfoGetRes userInfoGetRes = userInfoService.getUserInfo(userInfoGetReq);
	    	sessionProvider.setAttribute(request, response, ParamConstants.USER_ID, loginRes);
	    	ResponseContext.setValue(loginRes);
		} catch (BusinessException e) {
			Logger.getLogger(UserLoginRegisterAction.class).info("login" + e);
			String errorCode = e.getError_code();
			if(FrontConstants.ERROR_CODE_5103007.equals(errorCode)) {
				errorTimesRes.setError_times(errorTimesRes.getError_times() + 1);
				sessionProvider.setAttribute(request, response, FrontConstants.ERROR_KEY+req.getUser_name().trim(), errorTimesRes);
			}
			throw new BusinessException(e.getError_code(), e.getError_info());
		}
		//登录成功清除密码错误信息
		sessionProvider.removeAttribute(request, response, FrontConstants.ERROR_KEY+req.getUser_name().trim());
	    return  ResponseContext.getResponseEntity();
	}
	public @ResponseBody ResponseEntity loginback(HttpServletRequest request,HttpServletResponse response,@Valid LoginReq req){
		/**对密码进行解密.*/
		req.setPassword(CommonMethod.getPassword(req.getPassword(), request, response, sessionProvider));
		
	    String ip=(String)request.getSession().getAttribute("ip");
	    req.setIp(ip);
	    LoginRes loginRes = userLoginRegisterService.login(req);
		ResponseContext.setValue(loginRes);
		sessionProvider.setAttribute(request, response, ParamConstants.USER_ID, loginRes);
		return  ResponseContext.getResponseEntity();
	}
	
	/**
	 * 找回密码.
	 * @param req 请求.
	 * @return 返回.
	 */
	@RequestMapping(value="/resetPassword",method=RequestMethod.POST)
	public @ResponseBody  ResponseEntity resetPassword(HttpServletRequest request,HttpServletResponse response, @Valid ResetPasswordReq req){
		/**对密码进行解密.*/
		req.setNew_password(CommonMethod.getPassword(req.getNew_password(), request, response, sessionProvider));
		
		ResponseContext.setValue(userLoginRegisterService.resetPassword(req)); 
		return ResponseContext.getResponseEntity();
	}


	/**
     * 获取RSA公钥系数和指数.
     *
     * @return 返回.
     * @create: 2012-5-30 上午10:42:51 xuwf.
     * @history:.
     */
	//@RequestMapping(value = "/getModulusExponent",method = RequestMethod.GET)
	public @ResponseBody ResponseEntity getModulusExponent() {
		RSAPublicKey publicKey = RSAUtils.getDefaultPublicKey();
		// 系数
		String modulus = new String(Hex.encodeHex(publicKey.getModulus()
				.toByteArray()));
		// 指数
		String exponent = new String(Hex.encodeHex(publicKey
				.getPublicExponent().toByteArray()));
		Map<String, String> map = new HashMap<String, String>();
		map.put("modulus", modulus);
		map.put("exponent", exponent);

		ResponseContext.setValue(map);
		return ResponseContext.getResponseEntity();
	}
	
	/**
     * 获取RSA公钥系数和指数.
     *
     * @return 返回.
     * @create: 2012-5-30 上午10:42:51 xuwf.
     * @history:.
     */
	@RequestMapping(value = "/getModulusExponent")
	public @ResponseBody ResponseEntity getActiveModulusExponent(HttpServletRequest request,HttpServletResponse response) {
		KeyPair keyPair = (KeyPair)sessionProvider.getAttribute(request, ParamConstants.KEYPAIR);
		if(keyPair == null) {
			keyPair = RSAUtils.generateKeyPair2();
			sessionProvider.setAttribute(request, response, ParamConstants.KEYPAIR, keyPair);
		}
		
		RSAPublicKey publicKey = (RSAPublicKey)keyPair.getPublic();
		
		// 系数
		String modulus = new String(Hex.encodeHex(publicKey.getModulus()
				.toByteArray()));
		// 指数
		String exponent = new String(Hex.encodeHex(publicKey
				.getPublicExponent().toByteArray()));
		Map<String, String> map = new HashMap<String, String>();
		map.put("modulus", modulus);
		map.put("exponent", exponent);

		ResponseContext.setValue(map);
		return ResponseContext.getResponseEntity();
	}
	 
	/**
	 * 退出登录.
	 * @return 返回.
	 */
	@RequestMapping(value = "/loginExit",method = RequestMethod.GET)
	public String loginExit(Model model, HttpServletRequest request, HttpServletResponse response ) {
		sessionProvider.removeAttribute(request, response, ParamConstants.USER_ID);
		request.getSession().invalidate();
		ResponseContext.setValue(null);
		return "redirect:/service/index.html";
	}
	
	/**
	 * 判断是否有登录.
	 * @param user_id 用户id.
	 * @return 返回.
	 */
	@RequestMapping(value = "/isLogin",method = RequestMethod.POST)
	public @ResponseBody ResponseEntity isLogin(HttpServletRequest request,String user_id) {
		LoginRes loginRes = (LoginRes)sessionProvider.getAttribute(request, ParamConstants.USER_ID);
		ResponseContext.setValue(toSure(loginRes,user_id));
		return ResponseContext.getResponsenull();
	}
	/**
	 * 判断登录情况.
	 * @param loginRes 入参.
	 * @param user_id 入参.
	 * @return 返回登录判定结果.
	 */
	public Map<String,Object> toSure(LoginRes loginRes, String user_id){		
		HashMap<String, Object> returnMap = new HashMap<String, Object>();
		if(loginRes != null && user_id != null){
			if(user_id.equals(loginRes.getUser_id())){
				returnMap.put("isLogin", true);
			}else{
				throw new BusinessException(ParamConstants.ERROR_NO_2, "非法登录!");
			}
		} else{
			throw new BusinessException(ParamConstants.INTERCEPTOR_NO_LOGIN, "未登录!");
		}
		
		return returnMap;
	}
	
	@RequestMapping(value="/errorTimes",method=RequestMethod.POST)
	public @ResponseBody ResponseEntity errorTimes(HttpServletRequest request, @Valid ErrorTimesReq req) {
		ErrorTimesRes errorTimesRes = (ErrorTimesRes)sessionProvider.getAttribute(request, FrontConstants.ERROR_KEY+req.getUser_name().trim());
		if (errorTimesRes == null) {
			errorTimesRes = new ErrorTimesRes();
		}
		ResponseContext.setValue(errorTimesRes);
		return  ResponseContext.getResponseEntity();
	}
	
	/**
	 * @return 返回.
	 */
	public SessionProvider getSessionProvider() {
		return sessionProvider;
	}

	/**
	 * @param sessionProvider 入参.
	 */
	public void setSessionProvider(SessionProvider sessionProvider) {
		this.sessionProvider = sessionProvider;
	}
	
}
