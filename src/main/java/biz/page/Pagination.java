package biz.page;

import biz.domain.ConsoleOperationDTO;

/**
 * 分页参数T2传输对象.
 * @author xuzc
 *
 */
public class Pagination extends ConsoleOperationDTO{
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
	private Integer pageSize = new Integer(10);

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
	 * 是否需要分页.
	 */
	private Boolean needPage = true;
	/**
	 * 是否需要分页标志.
	 */
	private Integer needPageFlag = 1; 
	
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
    
	/**
	 * @return the needPage
	 */
	public Boolean getNeedPage() {
		return needPage;
	}
	/**
	 * @param needPage the needPage to set
	 */
	public void setNeedPage(Boolean needPage) {
		this.needPage = needPage;
	}
	/**
	 * @return the needPageFlag
	 */
	public Integer getNeedPageFlag() {
		return needPageFlag;
	}
	/**
	 * @param needPageFlag the needPageFlag to set
	 */
	public void setNeedPageFlag(Integer needPageFlag) {
		this.needPageFlag = needPageFlag;
		if(needPageFlag == 1) {
			this.needPage = true;
		} else if(needPageFlag == 0) {
			this.needPage = false;
		}
	}
	/**
     * set totalPage pageFristItem pageLastItem.
     */
    public void reSetParameters(){
    	this.totalPage = (int)Math.ceil(totalItem/(double)pageSize);
    	if(currentPage > totalPage) {
    		currentPage = totalPage;
    	}
    	if(currentPage > 0){
    		this.pageFristItem = (currentPage - 1) * pageSize;
    	}
    	this.pageLastItem = pageFristItem + pageSize;
    }
    
    /**
	 * 把分页类中的分页相关参数拷贝到Pagination对象中并且返回.
	 * @return 返回
	 */
	public Pagination copyPagination() {
		Pagination p = new Pagination();
		p.setTotalItem(this.getTotalItem());
		p.setTotalPage(this.getTotalPage());
		p.setCurrentPage(this.getCurrentPage()); 
		p.setPageSize(this.getPageSize());
		p.setPageFristItem(this.getPageFristItem());
		p.setPageLastItem(this.getPageLastItem());
		return p;
	}
}
