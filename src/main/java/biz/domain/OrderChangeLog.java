package biz.domain;

import java.util.Date;

public class OrderChangeLog {
    /**
     * 订单修改日志id
     */
    private Integer orderChangeLogId;

    /**
     * 修改前订单状态
     */
    private Integer oldOrderStatusId;

    /**
     * 修改后订单状态
     */
    private Integer newOrderStatusId;

    /**
     * 修改前备注
     */
    private String oldRemark;

    /**
     * 修改后备注
     */
    private String newRemark;

    /**
     * 创建时间
     */
    private Date createTime;

    /**
     * 修改时间
     */
    private Date motifyTime;

    /**
     * 操作人id
     */
    private Integer userId;

    /**
     * 订单修改日志id
     * @return order_change_log_id 订单修改日志id
     */
    public Integer getOrderChangeLogId() {
        return orderChangeLogId;
    }

    /**
     * 订单修改日志id
     * @param orderChangeLogId 订单修改日志id
     */
    public void setOrderChangeLogId(Integer orderChangeLogId) {
        this.orderChangeLogId = orderChangeLogId;
    }

    /**
     * 修改前订单状态
     * @return old_order_status_id 修改前订单状态
     */
    public Integer getOldOrderStatusId() {
        return oldOrderStatusId;
    }

    /**
     * 修改前订单状态
     * @param oldOrderStatusId 修改前订单状态
     */
    public void setOldOrderStatusId(Integer oldOrderStatusId) {
        this.oldOrderStatusId = oldOrderStatusId;
    }

    /**
     * 修改后订单状态
     * @return new_order_status_id 修改后订单状态
     */
    public Integer getNewOrderStatusId() {
        return newOrderStatusId;
    }

    /**
     * 修改后订单状态
     * @param newOrderStatusId 修改后订单状态
     */
    public void setNewOrderStatusId(Integer newOrderStatusId) {
        this.newOrderStatusId = newOrderStatusId;
    }

    /**
	 * @return the oldRemark
	 */
	public String getOldRemark() {
		return oldRemark;
	}

	/**
	 * @param oldRemark the oldRemark to set
	 */
	public void setOldRemark(String oldRemark) {
		this.oldRemark = oldRemark;
	}

	/**
	 * @return the newRemark
	 */
	public String getNewRemark() {
		return newRemark;
	}

	/**
	 * @param newRemark the newRemark to set
	 */
	public void setNewRemark(String newRemark) {
		this.newRemark = newRemark;
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
     * 操作人id
     * @return user_id 操作人id
     */
    public Integer getUserId() {
        return userId;
    }

    /**
     * 操作人id
     * @param userId 操作人id
     */
    public void setUserId(Integer userId) {
        this.userId = userId;
    }
}