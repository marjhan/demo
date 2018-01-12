package biz.page;

import java.io.Serializable;

/**
 * 分页实现.
 * @author hspcadmin
 *
 */
public class PageParameter implements IPageParameter, Serializable {
	private static final long serialVersionUID = 6245373576773306619L;

	/** 默认分页大小. */
	public static final int PAGE_LIMIT_DEFAULT = 20;
	
	/** 开始索引. */
	private int start;
	
	/** 分页大小. */
	private int limit = 20;
	
	/** 是否需要分页. */
	private boolean requireTotal = true;
	
	/** 分页总数. */
	private int total;

	/**
	 * @return the start
	 */
	public int getStart() {
		return start;
	}

	/**
	 * @param start the start to set
	 */
	public void setStart(int start) {
		this.start = start;
	}

	/**
	 * @return the limit
	 */
	public int getLimit() {
		return limit;
	}

	/**
	 * @param limit the limit to set
	 */
	public void setLimit(int limit) {
		this.limit = limit;
	}

	/**
	 * @return the requireTotal
	 */
	public boolean isRequireTotal() {
		return requireTotal;
	}

	/**
	 * @param requireTotal the requireTotal to set
	 */
	public void setRequireTotal(boolean requireTotal) {
		this.requireTotal = requireTotal;
	}

	/**
	 * @return the total
	 */
	public int getTotal() {
		return total;
	}

	/**
	 * @param total the total to set
	 */
	public void setTotal(int total) {
		this.total = total;
	}

	/**
	 * @return the serialversionuid
	 */
	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	/**
	 * @return the pageLimitDefault
	 */
	public static int getPageLimitDefault() {
		return PAGE_LIMIT_DEFAULT;
	}
	
}
