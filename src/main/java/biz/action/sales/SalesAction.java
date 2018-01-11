package biz.action.sales;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import biz.action.WebsiteBaseAction;
import biz.entity.ResponseContext;
import biz.entity.ResponseEntity;

/** 
* @author  xuzc
* @date 2017年12月28日 下午6:30:38 
* @version 1.0 
* @parameter  
* @since  
* @return  */
@Controller
@RequestMapping("/sts/sales")
public class SalesAction extends WebsiteBaseAction{
	
	/**
	 * 销售列表.
	 * 
	 * @param index
	 * @param type
	 * @return
	 */
	@RequestMapping(value = "/list")
	public String salesList(HttpServletRequest request) {
				
		return "sales/sales";
	}
	
	/**
	 * 获取销售列表.
	 * 
	 * @param index
	 * @param type
	 * @return
	 */
	@RequestMapping(value = "/mySalesList")
	public @ResponseBody ResponseEntity mySalesList(HttpServletRequest request) {
				
		return  ResponseContext.getResponseEntity();
	}

}
