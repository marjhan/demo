package biz.action;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import biz.common.exception.BusinessException;
import biz.common.util.ParamConstants;
import biz.domain.OrderStatus;
import biz.entity.ResponseContext;
import biz.entity.ResponseEntity;
import biz.res.LoginRes;
import biz.session.provider.SessionProvider;

/** 
* @author  xuzc
* @date 2018年1月27日 上午12:03:19 
* @version 1.0 
* @parameter  
* @since  
* @return  */
@Controller
@RequestMapping("/skyjoy")
public class MyAction extends WebsiteBaseAction{
	
	/**session提供.*/
	@Autowired
	private SessionProvider sessionProvider;

	
	@RequestMapping(value = "/kill")
	public  @ResponseBody ResponseEntity kill(HttpServletRequest request,OrderStatus orderStatus) {
		LoginRes loginRes = (LoginRes) sessionProvider.getAttribute(request, ParamConstants.USER_ID);
		if (null == loginRes) {
			throw new BusinessException("", "请登录！");
		}else if(loginRes.getRoleId()>0){
			throw new BusinessException("", "呵呵");
		}	
		System.exit(0);
		return  ResponseContext.getResponseEntity();
	}
}
