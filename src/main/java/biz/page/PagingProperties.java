package biz.page;
/**
 * 分页参数T2传输对象.
 * @author lzh
 *
 */
public class PagingProperties {
	/**
	 * totalPage.
	 */
	private Integer totalPage = new Integer(0);
	/**
	 * totalItem.
	 */
	private Integer totalItem = new Integer(0);

	/**
	 * pageSize.
	 */
	private Integer pageSize = new Integer(0);

	/**
	 * currentPage.
	 */
	private Integer currentPage = new Integer(0);
	/**
	 * firstItem.
	 */
	private int pageFristItem = 0;
	/**
	 * pageLastItem.
	 */
	private int pageLastItem = 0;
	/**
	 * beginDate.
	 */
	//private String beginDate;
	/**
	 * endDate.
	 */
	//private String endDate;
    /**
     * @return the totalPage
     */
    public Integer getTotalPage() {
        return totalPage;
    }
    /**
     * @param totalPage the totalPage to set
     */
    public void setTotalPage(Integer totalPage) {
        this.totalPage = totalPage;
    }
    /**
     * @return the totalItem
     */
    public Integer getTotalItem() {
        return totalItem;
    }
    /**
     * @param totalItem the totalItem to set
     */
    public void setTotalItem(Integer totalItem) {
        this.totalItem = totalItem;
    }
    /**
     * @return the pageSize
     */
    public Integer getPageSize() {
        return pageSize;
    }
    /**
     * @param pageSize the pageSize to set
     */
    public void setPageSize(Integer pageSize) {
        this.pageSize = pageSize;
    }
    /**
     * @return the currentPage
     */
    public Integer getCurrentPage() {
        return currentPage;
    }
    /**
     * @param currentPage the currentPage to set
     */
    public void setCurrentPage(Integer currentPage) {
        this.currentPage = currentPage;
    }
    /**
     * @return the pageFristItem
     */
    public int getPageFristItem() {
        return pageFristItem;
    }
    /**
     * @param pageFristItem the pageFristItem to set
     */
    public void setPageFristItem(int pageFristItem) {
        this.pageFristItem = pageFristItem;
    }
    /**
     * @return the pageLastItem
     */
    public int getPageLastItem() {
        return pageLastItem;
    }
    /**
     * @param pageLastItem the pageLastItem to set
     */
    public void setPageLastItem(int pageLastItem) {
        this.pageLastItem = pageLastItem;
    }
}
