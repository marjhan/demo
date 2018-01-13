package biz.domain;

public class OrderStatus {
    /**
     * 订单状态id
     */
    private Integer orderStatusId;

    /**
     * 订单状态
     */
    private String orderStatusName;

    /**
     * 状态
     */
    private String status;

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
     * 订单状态
     * @return order_status_name 订单状态
     */
    public String getOrderStatusName() {
        return orderStatusName;
    }

    /**
     * 订单状态
     * @param orderStatusName 订单状态
     */
    public void setOrderStatusName(String orderStatusName) {
        this.orderStatusName = orderStatusName;
    }

	/**
	 * @return the status
	 */
	public String getStatus() {
		return status;
	}

	/**
	 * @param status the status to set
	 */
	public void setStatus(String status) {
		this.status = status;
	}
    
}