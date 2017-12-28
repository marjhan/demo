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
    private Integer mobilePhone;

    /**
     * QQ
     */
    private Integer qq;

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
    private Integer listSource;

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
    private String remake;

    /**
     * 订单id
     * @return order_id 订单id
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
     * @return student_name 学生姓名
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
     * 创建时间
     * @return create_time 创建时间
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
     * @return motify_time 修改时间
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
     * @return mobile_phone 手机号
     */
    public Integer getMobilePhone() {
        return mobilePhone;
    }

    /**
     * 手机号
     * @param mobilePhone 手机号
     */
    public void setMobilePhone(Integer mobilePhone) {
        this.mobilePhone = mobilePhone;
    }

    /**
     * QQ
     * @return qq QQ
     */
    public Integer getQq() {
        return qq;
    }

    /**
     * QQ
     * @param qq QQ
     */
    public void setQq(Integer qq) {
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
     * @return channel_id 渠道id
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
     * @return list_source 名单来源id
     */
    public Integer getListSource() {
        return listSource;
    }

    /**
     * 名单来源id
     * @param listSource 名单来源id
     */
    public void setListSource(Integer listSource) {
        this.listSource = listSource;
    }

    /**
     * 用户id
     * @return user_id 用户id
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
     * @return order_status_id 订单状态id
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
     * 备注
     * @return remake 备注
     */
    public String getRemake() {
        return remake;
    }

    /**
     * 备注
     * @param remake 备注
     */
    public void setRemake(String remake) {
        this.remake = remake;
    }
}