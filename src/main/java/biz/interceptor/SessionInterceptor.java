package biz.interceptor;

import java.util.Iterator;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import biz.common.exception.BusinessException;
import biz.common.util.ParamConstants;
import biz.res.LoginRes;
import biz.session.provider.SessionProvider;

/**
 * session监听器
 * @author xuzc
 * @date 2017年12月28日
 */
public class SessionInterceptor extends HandlerInterceptorAdapter {

	/**无需登录的请求集合.*/
	@Value("${freePath}")
	private String freePath;
	/**会话通道提供者接口类.*/
	private SessionProvider SessionProvider;
	/**日志对象.*/
	static Logger logger = Logger.getLogger(SessionInterceptor.class);
	/**String数组,用于日志打印时的一些敏感变量(全名或结尾).*/
	private String[] str1 = {"password","_pwd"};
	/**String数组,用于日志打印时的一些过长内容变量.*/
	private String[] str2 = {};
	
	/**
	 * afterCompletion方法.
	 * @param request 请求.
	 * @param response 响应.
	 * @param handler 对象.
	 * @param ex 异常信息.
	 * @throws Exception 异常处理抛出.
	 */
	@Override
	public void afterCompletion(HttpServletRequest request,
			HttpServletResponse response, Object handler, Exception ex)
			throws Exception {
		super.afterCompletion(request, response, handler, ex);
	}

	/**
	 * postHandle方法.
	 * @param request 请求.
	 * @param response 响应.
	 * @param handler 对象.
	 * @param modelAndView 视图.
	 * @throws Exception 异常处理抛出.
	 */
	@Override
	public void postHandle(HttpServletRequest request,
			HttpServletResponse response, Object handler,
			ModelAndView modelAndView) throws Exception {
		super.postHandle(request, response, handler, modelAndView);
	}

	/**
	 * preHandle方法.
	 * @param request 请求.
	 * @param response 响应.
	 * @param handler 对象.
	 * @throws Exception 异常处理抛出.
	 * @return 返回.
	 */
	@Override
	public boolean preHandle(HttpServletRequest request,
			HttpServletResponse response, Object handler) throws Exception {
		/**根据配置文件获取无需登录即可发送的请求.*/
//		String[] freeReq = freePath.trim().split(";");
//		String url = request.getRequestURI();
		boolean ok = false;
//		for(String free : freeReq){
//			if(url.endsWith(free)){
//				ok = false;
//				break;
//			}
//		}
		
		String ip=this.getIpAddr2(request);
		request.getSession().setAttribute("ip", ip);

		/**如果是需要前置登录的请求需要根据session判断其是否登录.*/
		if(ok){
			LoginRes loginRes = (LoginRes) SessionProvider.getAttribute(request, ParamConstants.USER_ID);
			if(loginRes == null || loginRes.getUser_id()==null){	
// 				request.getRequestDispatcher("/itn/teng/user/toLogin.json").forward(request,response);
				String requestURL = request.getRequestURL().toString();
				System.out.println(requestURL);
				if(isAjaxRequest(request)){
					throw new BusinessException(ParamConstants.INTERCEPTOR_NO_LOGIN, "请登录！");	
				}else{
					String redirect = request.getContextPath() + "/login/login.html";
					response.sendRedirect(redirect);
					return false;
				}
			}
		}
		
		

		return true;
	}

	/**
	 * get SessionProvider.
	 * @return SessionProvider.
	 */
	public SessionProvider getSessionProvider() {
		return SessionProvider;
	}

	/**
	 * @param sessionProvider set SessionProvider.
	 */
	public void setSessionProvider(SessionProvider sessionProvider) {
		SessionProvider = sessionProvider;
	}

	/**
	 * 获取请求地址方法.
	 * @param methodName 入参.
	 * @return 返回.
	 */
	public String getMethodName(String methodName) {
		if(!StringUtils.isEmpty(methodName)){
			int i1 = methodName.indexOf("/teng");
			int i2 = 0;
//			int i2 = methodName.lastIndexOf(".json");
			if(methodName.contains(".json"))
				i2 = methodName.lastIndexOf(".json");
			else if(methodName.contains(".html"))
				i2 = methodName.lastIndexOf(".html");
			methodName = methodName.substring(i1, i2);
		}
		
		return methodName;
	}
	
	/**
	 * 入参打印.
	 * @param map 入参集合.
	 * @param logger 日志对象.
	 * @param description 描述.
	 */
	@SuppressWarnings("unused")
	private void log(Map<String, String[]> map, Logger logger,
			String description) {
		boolean b1 = false;
		boolean b2 = false;
		Set<String> keySet = map.keySet();
		StringBuffer str = new StringBuffer();

		Iterator<String> Istr = keySet.iterator();
		while (Istr.hasNext()) {
			String parameter = Istr.next();
			String[] sb = map.get(parameter);

			for (String string1 : str1) {
				if (parameter.endsWith(string1)) {
					b1 = true;
					break;
				}
			}
			/** 在不属于上述情况下. */
			if (!b1) {
				/** 看变量名是否属于给定的长篇幅变量. */
				for (String string2 : str2) {
					if (parameter.endsWith(string2)) {
						b2 = true;
						break;
					}
				}
			}
			if (b1) {
				str.append(parameter + ":" + "******").append("|");
				b1 = false;
			} else if (b2) {
				str.append(parameter + ":" + "......(考虑篇幅原因此处不予显示)")
						.append("|");
				b2 = false;
			} else {
				str.append(parameter + ":" + sb[0]).append("|");
			}
		}
		// str.append(parameter + ":" + sb[0]).append("|");
		logger.info(description + " " + str);

	}
	
	/**
	 * 获取请求的ip.
	 * @param request 请求.
	 * @return 返回.
	 */
	public String getIpAddr(HttpServletRequest request) { 
        String ip = request.getHeader("x-forwarded-for"); 
        if(ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) { 
            ip = request.getHeader("Proxy-Client-IP"); 
        } 
        if(ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) { 
            ip = request.getHeader("WL-Proxy-Client-IP"); 
        } 
        if(ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) { 
            ip = request.getRemoteAddr(); 
        } 
        return ip; 
    } 

	private  String getIpAddr2(HttpServletRequest request) {
		String ip = request.getHeader("X-Real-IP"); 
		logger.info("ip ---X-Real-IP--" + ip);
        if(ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) { 
            ip = request.getHeader("x-forwarded-for"); 
            logger.info("ip --- x-forwarded-for--"  + ip);
        } 
        if(ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) { 
            ip = request.getHeader("Proxy-Client-IP"); 
            logger.info("ip --- Proxy-Client-IP--" + ip);
        } 
        if(ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) { 
            ip = request.getHeader("WL-Proxy-Client-IP"); 
            logger.info("ip --- WL-Proxy-Client-IP--" + ip);
        } 
        if(ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) { 
            ip = request.getRemoteAddr(); 
            logger.info("ip --- getRemoteAddr--" + ip);
        } 
        return ip; 
	}
	
	/** 
     * 判断是否为Ajax请求 
     * 
     * @param request HttpServletRequest 
     * @return 是true, 否false 
     */  
    public static boolean isAjaxRequest(HttpServletRequest request) {  
        return request.getRequestURI().endsWith(".json");  
//        String requestType = request.getHeader("X-Requested-With");  
//        return requestType != null && requestType.equals("XMLHttpRequest");  
    }  
}
