package biz.domain;

import java.util.Date;

public class OrderStatusLog {
    /**
     * 订单状态修改日志id
     */
    private Integer orderStatusLogId;

    /**
     * 订单状态修改日志
     */
    private String orderStatusLog;

    /**
     * 创建时间
     */
    private Date createTime;

    /**
     * 修改时间
     */
    private Date motifyTime;

    /**
     * 订单状态修改日志id
     * @return order_status_log_id 订单状态修改日志id
     */
    public Integer getOrderStatusLogId() {
        return orderStatusLogId;
    }

    /**
     * 订单状态修改日志id
     * @param orderStatusLogId 订单状态修改日志id
     */
    public void setOrderStatusLogId(Integer orderStatusLogId) {
        this.orderStatusLogId = orderStatusLogId;
    }

    /**
     * 订单状态修改日志
     * @return order_status_log 订单状态修改日志
     */
    public String getOrderStatusLog() {
        return orderStatusLog;
    }

    /**
     * 订单状态修改日志
     * @param orderStatusLog 订单状态修改日志
     */
    public void setOrderStatusLog(String orderStatusLog) {
        this.orderStatusLog = orderStatusLog;
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
}