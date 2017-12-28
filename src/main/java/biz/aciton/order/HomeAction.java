package biz.aciton.order;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import biz.action.WebsiteBaseAction;

/** 
* @author  xuzc
* @date 2017年12月28日 下午6:30:38 
* @version 1.0 
* @parameter  
* @since  
* @return  */
@Controller
@RequestMapping("/sts/home")
public class HomeAction extends WebsiteBaseAction{
	
	/**
	 * 首页.
	 * 
	 * @param index
	 * @param type
	 * @return
	 */
	@RequestMapping(value = "/index")
	public String paymentPage(Model model, HttpServletRequest request) {
		
		
		return "index";
	}

}
