package biz.req;

import java.util.Date;

import biz.page.Pagination;

/** 
* @author  xuzc
* @date 2018年1月13日 上午1:30:29 
* @version 1.0 
* @parameter  
* @since  
* @return  */
public class OrderListReq extends Pagination{

    /**
     * 学生姓名
     */
    private String studentName;

    /**
     * 基本信息
     */
    private String info;

    /**
     * 创建时间
     */
    private String startTime;

    /**
     * 修改时间
     */
    private String endTime;

    /**
     * 渠道id
     */
    private Integer channelId;
    
    /**
     * 名单来源id
     */
    private Integer listSourceId;

    /**
     * 用户id
     */
    private Integer userId;

    /**
     * 订单状态id
     */
    private Integer orderStatusId;

    /**
     * 登录人角色
     */
    private Integer roleId;

	/**
	 * @return the studentName
	 */
	public String getStudentName() {
		return studentName;
	}

	/**
	 * @param studentName the studentName to set
	 */
	public void setStudentName(String studentName) {
		this.studentName = studentName;
	}

	/**
	 * @return the info
	 */
	public String getInfo() {
		return info;
	}

	/**
	 * @param info the info to set
	 */
	public void setInfo(String info) {
		this.info = info;
	}

	/**
	 * @return the startTime
	 */
	public String getStartTime() {
		return startTime;
	}

	/**
	 * @param startTime the startTime to set
	 */
	public void setStartTime(String startTime) {
		this.startTime = startTime;
	}

	/**
	 * @return the endTime
	 */
	public String getEndTime() {
		return endTime;
	}

	/**
	 * @param endTime the endTime to set
	 */
	public void setEndTime(String endTime) {
		this.endTime = endTime;
	}

	/**
	 * @return the channelId
	 */
	public Integer getChannelId() {
		return channelId;
	}

	/**
	 * @param channelId the channelId to set
	 */
	public void setChannelId(Integer channelId) {
		this.channelId = channelId;
	}

	/**
	 * @return the listSourceId
	 */
	public Integer getListSourceId() {
		return listSourceId;
	}

	/**
	 * @param listSourceId the listSourceId to set
	 */
	public void setListSourceId(Integer listSourceId) {
		this.listSourceId = listSourceId;
	}

	/**
	 * @return the userId
	 */
	public Integer getUserId() {
		return userId;
	}

	/**
	 * @param userId the userId to set
	 */
	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	/**
	 * @return the orderStatusId
	 */
	public Integer getOrderStatusId() {
		return orderStatusId;
	}

	/**
	 * @param orderStatusId the orderStatusId to set
	 */
	public void setOrderStatusId(Integer orderStatusId) {
		this.orderStatusId = orderStatusId;
	}

	/**
	 * @return the roleId
	 */
	public Integer getRoleId() {
		return roleId;
	}

	/**
	 * @param roleId the roleId to set
	 */
	public void setRoleId(Integer roleId) {
		this.roleId = roleId;
	}
    
}
