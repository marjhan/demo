package biz.action.order;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import biz.action.WebsiteBaseAction;
import biz.common.exception.BusinessException;
import biz.common.util.ParamConstants;
import biz.entity.ResponseContext;
import biz.entity.ResponseEntity;
import biz.req.OrderListReq;
import biz.res.LoginRes;
import biz.res.OrderListRes;
import biz.service.IOrderService;
import biz.session.provider.SessionProvider;

/** 
* @author  xuzc
* @date 2017年12月28日 下午6:30:38 
* @version 1.0 
* @parameter  
* @since  
* @return  */
@Controller
@RequestMapping("/sts/order")
public class OrderAction extends WebsiteBaseAction{
	/**session提供.*/
	@Autowired
	private SessionProvider sessionProvider;
	
	/**订单接口.*/
	@Autowired
	private  IOrderService orderService;
	
	/**
	 * 订单列表.
	 * 
	 * @param index
	 * @param type
	 * @return
	 */
	@RequestMapping(value = "/list")
	public String orderList(HttpServletRequest request) {
				
		return "order/order";
	}
	
	/**
	 * 获取订单列表.
	 * 
	 * @param index
	 * @param type
	 * @return
	 */
	@RequestMapping(value = "/myOrderList")
	public @ResponseBody ResponseEntity myOrderList(HttpServletRequest request, OrderListReq req) {
		LoginRes loginRes = (LoginRes) sessionProvider.getAttribute(request, ParamConstants.USER_ID);
		if (null == loginRes) {
			throw new BusinessException("", "请登录！");
		}
		req.setRoleId(loginRes.getRoleId());
		OrderListRes res = orderService.queryOrderList(req);
		ResponseContext.setValue(res);			
		return  ResponseContext.getResponseEntity();
	}

}
