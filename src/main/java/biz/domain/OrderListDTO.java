package biz.domain;

import java.util.Date;

/** 
* @author  xuzc
* @date 2018年1月13日 上午1:30:09 
* @version 1.0 
* @parameter  
* @since  
* @return  */
public class OrderListDTO {
	/**
     * 订单id
     */
    private Integer orderId;

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
    private Date createTime;

    /**
     * 修改时间
     */
    private Date motifyTime;

    /**
     * 联系方式
     */
    private String contacts;

    /**
     * 渠道id
     */
    private Integer channelId;
    
    /**
     * 渠道
     */
    private String channelName;

    /**
     * 名单来源id
     */
    private Integer listSourceId;

    /**
     * 名单来源
     */
    private String listSourceName;

    /**
     * 用户id
     */
    private Integer userId;

    /**
     * 用户
     */
    private String userName;

    /**
     * 订单状态id
     */
    private Integer orderStatusId;

    /**
     * 订单状态
     */
    private String orderStatusName;

    /**
     * 备注
     */
    private String remake;

	/**
	 * @return the orderId
	 */
	public Integer getOrderId() {
		return orderId;
	}

	/**
	 * @param orderId the orderId to set
	 */
	public void setOrderId(Integer orderId) {
		this.orderId = orderId;
	}

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
	 * @return the createTime
	 */
	public Date getCreateTime() {
		return createTime;
	}

	/**
	 * @param createTime the createTime to set
	 */
	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	/**
	 * @return the motifyTime
	 */
	public Date getMotifyTime() {
		return motifyTime;
	}

	/**
	 * @param motifyTime the motifyTime to set
	 */
	public void setMotifyTime(Date motifyTime) {
		this.motifyTime = motifyTime;
	}

	/**
	 * @return the contacts
	 */
	public String getContacts() {
		return contacts;
	}

	/**
	 * @param contacts the contacts to set
	 */
	public void setContacts(String contacts) {
		this.contacts = contacts;
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
	 * @return the channelName
	 */
	public String getChannelName() {
		return channelName;
	}

	/**
	 * @param channelName the channelName to set
	 */
	public void setChannelName(String channelName) {
		this.channelName = channelName;
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
	 * @return the listSourceName
	 */
	public String getListSourceName() {
		return listSourceName;
	}

	/**
	 * @param listSourceName the listSourceName to set
	 */
	public void setListSourceName(String listSourceName) {
		this.listSourceName = listSourceName;
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
	 * @return the userName
	 */
	public String getUserName() {
		return userName;
	}

	/**
	 * @param userName the userName to set
	 */
	public void setUserName(String userName) {
		this.userName = userName;
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
	 * @return the orderStatusName
	 */
	public String getOrderStatusName() {
		return orderStatusName;
	}

	/**
	 * @param orderStatusName the orderStatusName to set
	 */
	public void setOrderStatusName(String orderStatusName) {
		this.orderStatusName = orderStatusName;
	}

	/**
	 * @return the remake
	 */
	public String getRemake() {
		return remake;
	}

	/**
	 * @param remake the remake to set
	 */
	public void setRemake(String remake) {
		this.remake = remake;
	}
    
}
