package biz.domain;

import java.util.Date;

public class Order {
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
     * 手机号
     */
    private String mobilePhone;

    /**
     * QQ
     */
    private String qq;

    /**
     * 微信号
     */
    private String wechat;

    /**
     * 电话
     */
    private String phone;

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
     * 备注
     */
    private String remark;

    /**
     * 订单id
     * @return orderId 订单id
     */
    public Integer getOrderId() {
        return orderId;
    }

    /**
     * 订单id
     * @param orderId 订单id
     */
    public void setOrderId(Integer orderId) {
        this.orderId = orderId;
    }

    /**
     * 学生姓名
     * @return studentName 学生姓名
     */
    public String getStudentName() {
        return studentName;
    }

    /**
     * 学生姓名
     * @param studentName 学生姓名
     */
    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }

    /**
     * 基本信息
     * @return info 基本信息
     */
	public String getInfo() {
		return info;
	}

	 /**
     * 基本信息
     * @param info 基本信息
     */
	public void setInfo(String info) {
		this.info = info;
	}

	/**
     * 创建时间
     * @return createTime 创建时间
     */
    public Date getCreateTime() {
        return createTime;
    }

    /**
     * 创建时间
     * @param createTime 创建时间
     */
    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    /**
     * 修改时间
     * @return motifyTime 修改时间
     */
    public Date getMotifyTime() {
        return motifyTime;
    }

    /**
     * 修改时间
     * @param motifyTime 修改时间
     */
    public void setMotifyTime(Date motifyTime) {
        this.motifyTime = motifyTime;
    }

    /**
     * 手机号
     * @return mobilePhone 手机号
     */
    public String getMobilePhone() {
        return mobilePhone;
    }

    /**
     * 手机号
     * @param mobilePhone 手机号
     */
    public void setMobilePhone(String mobilePhone) {
        this.mobilePhone = mobilePhone;
    }

    /**
     * QQ
     * @return qq QQ
     */
    public String getQq() {
        return qq;
    }

    /**
     * QQ
     * @param qq QQ
     */
    public void setQq(String qq) {
        this.qq = qq;
    }

    /**
     * 微信号
     * @return wechat 微信号
     */
    public String getWechat() {
        return wechat;
    }

    /**
     * 微信号
     * @param wechat 微信号
     */
    public void setWechat(String wechat) {
        this.wechat = wechat;
    }

    /**
     * 电话
     * @return phone 电话
     */
    public String getPhone() {
        return phone;
    }

    /**
     * 电话
     * @param phone 电话
     */
    public void setPhone(String phone) {
        this.phone = phone;
    }

    /**
     * 渠道id
     * @return channelId 渠道id
     */
    public Integer getChannelId() {
        return channelId;
    }

    /**
     * 渠道id
     * @param channelId 渠道id
     */
    public void setChannelId(Integer channelId) {
        this.channelId = channelId;
    }

    /**
     * 名单来源id
     * @return listSourceId 名单来源id
     */
    public Integer getListSourceId() {
        return listSourceId;
    }

    /**
     * 名单来源id
     * @param listSourceId 名单来源id
     */
    public void setListSourceId(Integer listSourceId) {
        this.listSourceId = listSourceId;
    }

    /**
     * 用户id
     * @return userId 用户id
     */
    public Integer getUserId() {
        return userId;
    }

    /**
     * 用户id
     * @param userId 用户id
     */
    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    /**
     * 订单状态id
     * @return orderStatusId 订单状态id
     */
    public Integer getOrderStatusId() {
        return orderStatusId;
    }

    /**
     * 订单状态id
     * @param orderStatusId 订单状态id
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
    
}