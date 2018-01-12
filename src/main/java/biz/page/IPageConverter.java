package biz.page;

/**
 * 分页类.
 * @author hspcadmin
 *
 * @param <T>
 */
public abstract interface IPageConverter<T> {
	
	/**
	 * .
	 * @param paramT .
	 * @return .
	 */
	public abstract IPageParameter toPage(T paramT);

	/**
	 * .
	 * @param paramT .
	 * @param paramInt .
	 */
	public abstract void returnTotal(T paramT, int paramInt);
}
