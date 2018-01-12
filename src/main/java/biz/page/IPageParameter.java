package biz.page;


/**
 * 分页参数.
 * @author hspcadmin
 *
 */
public abstract interface IPageParameter {
	
	/**
	 * .
	 * @return .
	 */
	public abstract int getStart();

	/**
	 * .
	 * @return .
	 */
	public abstract int getLimit();

	/**
	 * .
	 * @return .
	 */
	public abstract boolean isRequireTotal();

	/**
	 * .
	 * @param paramInt .
	 */
	public abstract void setTotal(int paramInt);
}
