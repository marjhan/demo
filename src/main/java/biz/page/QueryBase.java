package biz.page;

/**
 * 查询条件.
 * @author chenhl.
 *
 */
public class QueryBase {
	/**
	 * 总条数.
	 */
	private Integer	totalCount;
	/**
	 * 定位串.
	 */
	private Integer position_str = 0;
	/**
	 * 请求个数.
	 */
	private Integer request_num = 10;
	/**
	 * 访问页.
	 */
	private Integer page = null;
	/**
	 * 是否返回总数.
	 */
	private boolean requireTotal = true;
	/**
	 * @return 返回总数.
	 */
	public Integer getTotalCount() {
		return totalCount;
	}
	/**
	 * @param totalCount 设置总数.
	 */
	public void setTotalCount(Integer totalCount) {
		this.totalCount = totalCount;
	}
	/**
	 * @return 返回定位.
	 */
	public Integer getPosition_str() {
		return position_str;
	}
	/**
	 * @param position_str 设置定位.
	 */
	public void setPosition_str(Integer position_str) {
		this.position_str = position_str;
	}
	/**
	 * @return 返回分页数.
	 */
	public Integer getRequest_num() {
		return request_num;
	}
	/**
	 * @param request_num 设置分页数.
	 */
	public void setRequest_num(Integer request_num) {
		this.request_num = request_num;
	}
	/**
	 * @return 是否需要总数.
	 */
	public boolean isRequireTotal() {
		return requireTotal;
	}
	/**
	 * @param requireTotal 设置是否需总数.
	 */
	public void setRequireTotal(boolean requireTotal) {
		this.requireTotal = requireTotal;
	}
	/**
	 * @return the page.
	 */
	public Integer getPage() {
		return page;
	}
	/**
	 * @param page the page to set.
	 */
	public void setPage(Integer page) {
		this.page = page;
	}
	/**
	 * 通过page设置Position_str值.
	 */
	public void setPosition_strWithPage() {
		if(this.page != null){
			this.position_str = (this.page - 1) * this.request_num;
		}
	}
	
}
