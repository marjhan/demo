package biz.entity;

import java.util.Date;

/**
 * 请求统计对象
 *
 */
public class RequestStatisticsInfo {
	/**
	 * 上一次请求时间.
	 */
	private  Date pre_request_time;
	
	/**
	 * 当天已请求次数.
	 */
	private int request_count;


	/**
	 * @return the pre_request_time
	 */
	public Date getPre_request_time() {
		return pre_request_time;
	}

	/**
	 * @param pre_request_time the pre_request_time to set
	 */
	public void setPre_request_time(Date pre_request_time) {
		this.pre_request_time = pre_request_time;
	}

	/**
	 * @return the request_count
	 */
	public int getRequest_count() {
		return request_count;
	}

	/**
	 * @param request_count the request_count to set
	 */
	public void setRequest_count(int request_count) {
		this.request_count = request_count;
	}
	
	

}
