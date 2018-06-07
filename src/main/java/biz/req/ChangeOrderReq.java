package biz.req;
/** 
* @author  xuzc
* @date 2018年1月14日 下午3:30:56 
* @version 1.0 
* @parameter  
* @since  
* @return  */
public class ChangeOrderReq {
	
	/**
     * 学生姓名
     */
    private String studentName;

    /**
     * 基本信息
     */
    private String info; 

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
     * 订单id
     */
    private Integer orderId;

    /**
     * 订单状态id
     */
    private Integer orderStatusId;

    /**
     * 备注
     */
    private String remark;

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
	 * @return the remark
	 */
	public String getRemark() {
		return remark;
	}

	/**
	 * @param remark the remark to set
	 */
	public void setRemark(String remark) {
		this.remark = remark;
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

	
}
