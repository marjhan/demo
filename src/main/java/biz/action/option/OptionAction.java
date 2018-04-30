package biz.action.option;

import java.io.UnsupportedEncodingException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
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
import biz.domain.OrderStatus;
import biz.domain.Role;
import biz.domain.User;
import biz.entity.ResponseContext;
import biz.entity.ResponseEntity;
import biz.res.LoginRes;
import biz.service.IChannelService;
import biz.service.IListSourceService;
import biz.service.IOrderStatusService;
import biz.service.IRoleService;
import biz.service.IUserInfoService;
import biz.session.provider.SessionProvider;
/**
 * 用户管理.
 * @author xuzc
 */
@Controller
@RequestMapping("/sts/option")
public class OptionAction extends WebsiteBaseAction{
	
	/**日志对象.*/
	static Logger logger = Logger.getLogger(OptionAction.class);
	
	/**session提供.*/
	@Autowired
	private SessionProvider sessionProvider;
	
	/**用户接口.*/
	@Autowired
	private  IUserInfoService userInfoService;
	
	/**角色接口.*/
	@Autowired
	private  IRoleService roleService;
	
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
	 * 用户管理页面.
	 * @param req 请求.
	 * @return 返回.
	 */
	@RequestMapping(value = "/user")
	public  String user(Model model, HttpServletRequest request, HttpServletResponse response) {
		LoginRes loginRes = (LoginRes) sessionProvider.getAttribute(request, ParamConstants.USER_ID);
		if (null == loginRes) {
			throw new BusinessException("", "请登录！");
		}else if(loginRes.getRoleId()>1){
			throw new BusinessException("", "不是管理员！");
		}
		Integer roleId = loginRes.getRoleId();
		List<User> userList= userInfoService.queryAllUserInfoList();
		List<Role> roleList= roleService.queryRoleList();
		model.addAttribute("roleId", roleId);	
		model.addAttribute("userList", userList);		
		model.addAttribute("roleList", roleList);
		return "option/user";
	}
	
	
	/**
	 * 新增用户.
	 * @param req 请求.
	 * @return 返回.
	 * @throws UnsupportedEncodingException 
	 */
	@RequestMapping(value = "/addUser")
	public  @ResponseBody ResponseEntity addUser(HttpServletRequest request,User user) throws UnsupportedEncodingException {
		logger.info("编码格式："+request.getCharacterEncoding());
		logger.info("真实姓名："+user.getRealName());
		LoginRes loginRes = (LoginRes) sessionProvider.getAttribute(request, ParamConstants.USER_ID);
		if (null == loginRes) {
			throw new BusinessException("", "请登录！");
		}else if(loginRes.getRoleId()>1){
			throw new BusinessException("", "不是管理员！");
		}	
		try {
			int result = userInfoService.addUser(user);
			ResponseContext.setValue(result);
		} catch (Exception e) {
			e.printStackTrace();
			throw new BusinessException("0009", "新增用户失败");
		}		
		return  ResponseContext.getResponseEntity();
	}
	
	
	/**
	 * 修改用户状态.
	 * @param req 请求.
	 * @return 返回.
	 */
	@RequestMapping(value = "/updateUserStatus")
	public  @ResponseBody ResponseEntity updateUserStatus(HttpServletRequest request,User user) {
		LoginRes loginRes = (LoginRes) sessionProvider.getAttribute(request, ParamConstants.USER_ID);
		if (null == loginRes) {
			throw new BusinessException("", "请登录！");
		}else if(loginRes.getRoleId()>1){
			throw new BusinessException("", "不是管理员！");
		}else if(user.getUserId()==1&&loginRes.getRoleId()>0){
			throw new BusinessException("", "不能操作管理员账号！");
		}
		try {
			int result = userInfoService.updateUserStatus(user);
			ResponseContext.setValue(result);
		} catch (Exception e) {
			e.printStackTrace();
			throw new BusinessException("0009", "修改用户状态失败");
		}		
		return  ResponseContext.getResponseEntity();
	}
	
	
	/**
	 * 渠道管理页面.
	 * @param req 请求.
	 * @return 返回.
	 */
	@RequestMapping(value = "/channel")
	public  String channel(Model model, HttpServletRequest request, HttpServletResponse response) {
		LoginRes loginRes = (LoginRes) sessionProvider.getAttribute(request, ParamConstants.USER_ID);
		if (null == loginRes) {
			throw new BusinessException("", "请登录！");
		}else if(loginRes.getRoleId()>1){
			throw new BusinessException("", "不是管理员！");
		}
		Integer roleId = loginRes.getRoleId();
		List<Channel> channelList= channelService.queryAllChannelList();
		model.addAttribute("roleId", roleId);	
		model.addAttribute("channelList", channelList);	
		return "option/channel";
	}
	
	
	/**
	 * 新增渠道.
	 * @param req 请求.
	 * @return 返回.
	 */
	@RequestMapping(value = "/addChannel")
	public  @ResponseBody ResponseEntity addChannel(HttpServletRequest request,Channel channel) {
		LoginRes loginRes = (LoginRes) sessionProvider.getAttribute(request, ParamConstants.USER_ID);
		if (null == loginRes) {
			throw new BusinessException("", "请登录！");
		}else if(loginRes.getRoleId()>1){
			throw new BusinessException("", "不是管理员！");
		}	
		try {
			int result = channelService.addChannel(channel);
			ResponseContext.setValue(result);
		} catch (Exception e) {
			e.printStackTrace();
			throw new BusinessException("0009", "新增渠道失败");
		}		
		return  ResponseContext.getResponseEntity();
	}
	
	
	/**
	 * 修改渠道状态.
	 * @param req 请求.
	 * @return 返回.
	 */
	@RequestMapping(value = "/updateChannelStatus")
	public  @ResponseBody ResponseEntity updateChannelStatus(HttpServletRequest request,Channel channel) {
		LoginRes loginRes = (LoginRes) sessionProvider.getAttribute(request, ParamConstants.USER_ID);
		if (null == loginRes) {
			throw new BusinessException("", "请登录！");
		}else if(loginRes.getRoleId()>1){
			throw new BusinessException("", "不是管理员！");
		}	
		try {
			int result = channelService.updateChannelStatus(channel);
			ResponseContext.setValue(result);
		} catch (Exception e) {
			e.printStackTrace();
			throw new BusinessException("0009", "修改渠道状态失败");
		}		
		return  ResponseContext.getResponseEntity();
	}
	
	
	/**
	 * 名单来源管理页面.
	 * @param req 请求.
	 * @return 返回.
	 */
	@RequestMapping(value = "/listSource")
	public  String listSource(Model model, HttpServletRequest request, HttpServletResponse response) {
		LoginRes loginRes = (LoginRes) sessionProvider.getAttribute(request, ParamConstants.USER_ID);
		if (null == loginRes) {
			throw new BusinessException("", "请登录！");
		}else if(loginRes.getRoleId()>1){
			throw new BusinessException("", "不是管理员！");
		}
		Integer roleId = loginRes.getRoleId();
		List<ListSource> listSourceList= listSourceService.queryAllListSourceList();
		model.addAttribute("roleId", roleId);	
		model.addAttribute("listSourceList", listSourceList);	
		return "option/listSource";
	}
	
	
	/**
	 * 新增名单来源.
	 * @param req 请求.
	 * @return 返回.
	 */
	@RequestMapping(value = "/addListSource")
	public  @ResponseBody ResponseEntity addListSource(HttpServletRequest request,ListSource listSource) {
		LoginRes loginRes = (LoginRes) sessionProvider.getAttribute(request, ParamConstants.USER_ID);
		if (null == loginRes) {
			throw new BusinessException("", "请登录！");
		}else if(loginRes.getRoleId()>1){
			throw new BusinessException("", "不是管理员！");
		}	
		try {
			int result = listSourceService.addListSource(listSource);
			ResponseContext.setValue(result);
		} catch (Exception e) {
			e.printStackTrace();
			throw new BusinessException("0009", "新增名单来源失败");
		}		
		return  ResponseContext.getResponseEntity();
	}
	
	
	/**
	 * 修改名单来源状态.
	 * @param req 请求.
	 * @return 返回.
	 */
	@RequestMapping(value = "/updateListSourceStatus")
	public  @ResponseBody ResponseEntity updateListSourceStatus(HttpServletRequest request,ListSource listSource) {
		LoginRes loginRes = (LoginRes) sessionProvider.getAttribute(request, ParamConstants.USER_ID);
		if (null == loginRes) {
			throw new BusinessException("", "请登录！");
		}else if(loginRes.getRoleId()>1){
			throw new BusinessException("", "不是管理员！");
		}	
		try {
			int result = listSourceService.updateListSourceStatus(listSource);
			ResponseContext.setValue(result);
		} catch (Exception e) {
			e.printStackTrace();
			throw new BusinessException("0009", "名单来源状态修改失败");
		}		
		return  ResponseContext.getResponseEntity();
	}
	
	
	/**
	 * 订单状态管理页面.
	 * @param req 请求.
	 * @return 返回.
	 */
	@RequestMapping(value = "/orderStatus")
	public  String orderStatus(Model model, HttpServletRequest request, HttpServletResponse response) {
		LoginRes loginRes = (LoginRes) sessionProvider.getAttribute(request, ParamConstants.USER_ID);
		if (null == loginRes) {
			throw new BusinessException("", "请登录！");
		}else if(loginRes.getRoleId()>1){
			throw new BusinessException("", "不是管理员！");
		}
		Integer roleId = loginRes.getRoleId();
		List<OrderStatus> orderStatusList= orderStatusService.queryAllOrderStatusList();
		model.addAttribute("roleId", roleId);	
		model.addAttribute("orderStatusList", orderStatusList);	
		return "option/orderStatus";
	}
	
	
	/**
	 * 新增订单状态.
	 * @param req 请求.
	 * @return 返回.
	 */
	@RequestMapping(value = "/addOrderStatus")
	public  @ResponseBody ResponseEntity addOrderStatus(HttpServletRequest request,OrderStatus orderStatus) {
		LoginRes loginRes = (LoginRes) sessionProvider.getAttribute(request, ParamConstants.USER_ID);
		if (null == loginRes) {
			throw new BusinessException("", "请登录！");
		}else if(loginRes.getRoleId()>1){
			throw new BusinessException("", "不是管理员！");
		}	
		try {
			int result = orderStatusService.addOrderStatus(orderStatus);
			ResponseContext.setValue(result);
		} catch (Exception e) {
			e.printStackTrace();
			throw new BusinessException("0009", "新增订单状态失败");
		}		
		return  ResponseContext.getResponseEntity();
	}
	
	
	/**
	 * 修改订单状态的状态.
	 * @param req 请求.
	 * @return 返回.
	 */
	@RequestMapping(value = "/updateOrderStatus")
	public  @ResponseBody ResponseEntity updateOrderStatus(HttpServletRequest request,OrderStatus orderStatus) {
		LoginRes loginRes = (LoginRes) sessionProvider.getAttribute(request, ParamConstants.USER_ID);
		if (null == loginRes) {
			throw new BusinessException("", "请登录！");
		}else if(loginRes.getRoleId()>1){
			throw new BusinessException("", "不是管理员！");
		}	
		try {
			int result = orderStatusService.updateOrderStatusStatus(orderStatus);
			ResponseContext.setValue(result);
		} catch (Exception e) {
			e.printStackTrace();
			throw new BusinessException("0009", "修改状态失败");
		}		
		return  ResponseContext.getResponseEntity();
	}

}
