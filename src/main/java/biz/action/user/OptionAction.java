package biz.action.user;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import biz.action.WebsiteBaseAction;
import biz.common.util.ParamConstants;
import biz.res.LoginRes;
import biz.session.provider.SessionProvider;
/**
 * 用户管理.
 * @author xuzc
 */
@Controller
@RequestMapping("/sts/option")
public class OptionAction extends WebsiteBaseAction{
	/**session提供.*/
	@Autowired
	private SessionProvider sessionProvider;
	
	/**
	 * 用户管理页面.
	 * @param req 请求.
	 * @return 返回.
	 */
	@RequestMapping(value = "/user")
	public  String login(Model model, HttpServletRequest request, HttpServletResponse response) {
		LoginRes loginRes = (LoginRes) sessionProvider.getAttribute(request, ParamConstants.USER_ID);
		if(loginRes==null){
			return "login/login";			
		}
//		return "index";
		SetUserInfoToPage(request);
		return "option/user";
	}

}
