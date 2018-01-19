package biz.action.order;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import biz.action.WebsiteBaseAction;
import biz.common.exception.BusinessException;
import biz.common.util.ParamConstants;
import biz.domain.Channel;
import biz.domain.ListSource;
import biz.domain.Order;
import biz.domain.OrderStatus;
import biz.domain.User;
import biz.entity.ResponseContext;
import biz.entity.ResponseEntity;
import biz.req.ChangeOrderReq;
import biz.req.CheckMobilePhoneReq;
import biz.req.OrderListReq;
import biz.res.ChangeOrderRes;
import biz.res.LoginRes;
import biz.res.OrderListRes;
import biz.service.IChannelService;
import biz.service.IListSourceService;
import biz.service.IOrderService;
import biz.service.IOrderStatusService;
import biz.service.IUserInfoService;
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
	
	/**用户接口.*/
	@Autowired
	private  IUserInfoService userInfoService;
	
	/**渠道接口.*/
	@Autowired
	private  IChannelService channelService;
	
	/**名单来源接口.*/
	@Autowired
	private  IListSourceService listSourceService;
	
	/**订单状态接口.*/
	@Autowired
	private  IOrderStatusService orderStatusService;
	
	/**
	 * 订单列表.
	 * 
	 * @param index
	 * @param type
	 * @return
	 */
	@RequestMapping(value = "/list")
	public String orderList(Model model, HttpServletRequest request) {
		LoginRes loginRes = (LoginRes) sessionProvider.getAttribute(request, ParamConstants.USER_ID);
		if (null == loginRes) {
			throw new BusinessException("", "请登录！");
		}
		try {
			Integer roleId = loginRes.getRoleId();
			List<User> userList= userInfoService.queryUserInfoList();
			List<Channel> channelList= channelService.queryChannelList();
			List<ListSource> listSourceList= listSourceService.queryListSourceList();
			List<OrderStatus> orderStatusList= orderStatusService.queryOrderStatusList();
			model.addAttribute("roleId", roleId);	
			model.addAttribute("userList", userList);	
			model.addAttribute("channelList", channelList);
			model.addAttribute("listSourceList", listSourceList);
			model.addAttribute("orderStatusList", orderStatusList);
		} catch (Exception e) {
			e.printStackTrace();
			throw new BusinessException("", "网络异常！");
		}
		return "order/order";
	}
	
	/**
	 * 获取订单列表.
	 * 
	 * @param req
	 * @return
	 */
	@RequestMapping(value = "/myOrderList")
	public @ResponseBody ResponseEntity myOrderList(HttpServletRequest request, OrderListReq req) {
		LoginRes loginRes = (LoginRes) sessionProvider.getAttribute(request, ParamConstants.USER_ID);
		if (null == loginRes) {
			throw new BusinessException("", "请登录！");
		}
		if(loginRes.getRoleId()!=1)
			req.setUserId(loginRes.getUserId());
		OrderListRes res = orderService.queryOrderList(req);
		ResponseContext.setValue(res);			
		return  ResponseContext.getResponseEntity();
	}
	
	/**
	 * 获取修改订单.
	 * 
	 * @param req
	 * @return
	 */
	@RequestMapping(value = "/changeOrder")
	public @ResponseBody ResponseEntity changeOrder(HttpServletRequest request, ChangeOrderReq req) {
		LoginRes loginRes = (LoginRes) sessionProvider.getAttribute(request, ParamConstants.USER_ID);
		if (null == loginRes) {
			throw new BusinessException("", "请登录！");
		}
		req.setUserId(loginRes.getUserId());
		ChangeOrderRes res = orderService.changeOrder(req);
		ResponseContext.setValue(res);			
		return  ResponseContext.getResponseEntity();
	}
	
	/**
	 * 新增订单页面.
	 * 
	 * @param req
	 * @return
	 */
	@RequestMapping(value = "/order_new")
	public String addOrder(Model model,HttpServletRequest request) {
		LoginRes loginRes = (LoginRes) sessionProvider.getAttribute(request, ParamConstants.USER_ID);
		if (null == loginRes) {
			throw new BusinessException("", "请登录！");
		}else if(loginRes.getRoleId()!=1){
			throw new BusinessException("", "不是管理员！");
		}					
		Integer roleId = loginRes.getRoleId();
		List<User> userList= userInfoService.queryUserInfoList();
		List<Channel> channelList= channelService.queryChannelList();
		List<ListSource> listSourceList= listSourceService.queryListSourceList();
		List<OrderStatus> orderStatusList= orderStatusService.queryOrderStatusList();
		model.addAttribute("roleId", roleId);	
		model.addAttribute("userList", userList);	
		model.addAttribute("channelList", channelList);
		model.addAttribute("listSourceList", listSourceList);
		model.addAttribute("orderStatusList", orderStatusList);
		return  "order/order_add";
	}
	
	/**
	 * 检查手机号.
	 * 
	 * @param req
	 * @return
	 */
	@RequestMapping(value = "/checkMobilePhone")
	public @ResponseBody ResponseEntity checkMobilePhone(HttpServletRequest request,CheckMobilePhoneReq req) {
		LoginRes loginRes = (LoginRes) sessionProvider.getAttribute(request, ParamConstants.USER_ID);
		if (null == loginRes) {
			throw new BusinessException("", "请登录！");
		}else if(loginRes.getRoleId()!=1){
			throw new BusinessException("", "不是管理员！");
		}			
		try {
			ResponseContext.setValue(orderService.checkMobilePhone(req));
		} catch (Exception e) {
			e.printStackTrace();
		}		
		return  ResponseContext.getResponseEntity();
	}
	
	/**
	 * 新增订单.
	 * 
	 * @param req
	 * @return
	 */
	@RequestMapping(value = "/addOrder")
	public @ResponseBody ResponseEntity addOrder(HttpServletRequest request,Order order) {
		LoginRes loginRes = (LoginRes) sessionProvider.getAttribute(request, ParamConstants.USER_ID);
		if (null == loginRes) {
			throw new BusinessException("", "请登录！");
		}else if(loginRes.getRoleId()!=1){
			throw new BusinessException("", "不是管理员！");
		}			
		try {
			int result = orderService.addOrder(order);
			ResponseContext.setValue(result);
		} catch (Exception e) {
			e.printStackTrace();
			throw new BusinessException("0009", "订单保存失败");
		}		
		return  ResponseContext.getResponseEntity();
	}

}
