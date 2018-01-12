package biz.page;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * PagingAlgorithm.java
 * 
 * 功能：前台分面显示,后台分页查询公共类
 * 
 * 类名：PagingAlgorithm
 *
 *   ver     变更日                          部门               责任人      变更内容
 * ──────────────────────────────────────────────
 *   V1.00   2014-02-13   恒生电子      胡振峰     初版
 *
 */

/***
 * 分页算法封装.
 * 分页须设置: TotalItem（总条数）,缺省为0, 应该在dao中被设置 PageSize（每页条数），应在web层被设置 QueryBase 缺省为20，子类可以通过覆盖 getDefaultPageSize()
 * 修改 CurrentPage（当前页）,缺省为1，首页， 应在web层被设置 分页后，可以得到：TotalPage（总页数） FristItem(当前页开始记录位置，从1开始记数) PageLastItem(当前页最后记录位置)
 * 页面上，每页显示条数名字应为： lines ，当前页名字应为： page
 * ========db2 paging sql
 *  SELECT * FROM (  
 *    Select USERID,CREATETIME,UPDATETIME,rownumber() over(ORDER BY USERID DESC) AS rn from SYS_USER ) AS a1 
 *  WHERE a1.rn BETWEEN 2 AND 3; 
 * ========
 * @author huzf
 * @since 2014/02/13
 */
public class PagingAlgorithm {
	
	Logger logger=LoggerFactory.getLogger(this.getClass());
	/**
	 * defaultPageSize.
	 */
	private  final Integer defaultPageSize = new Integer(8);
	/**
	 * defaultFriatPage.
	 */
	private  final Integer defaultFriatPage = new Integer(1);
	/**
	 * defaultTotleItem.
	 */
	private static final Integer defaultTotleItem = new Integer(0);
	/**
	 * totalItem.
	 */
	private Integer totalItem;
	/**
	 * pageSize.
	 */
	private Integer pageSize;
	/**
	 * currentPage.
	 */
	private Integer currentPage;
	
	/**
	 * @return Returns the defaultPageSize
	 */
	protected final Integer getDefaultPageSize() {
		return defaultPageSize;
	}
	/**
	 * 当前的页数.
	 * @return 返回
	 */
	public Integer getCurrentPage() {
		if (currentPage == null) {
			return defaultFriatPage;
		}

		return currentPage;
	}

	/**
	 * @param cPage The currentPage to set
	 */
	public void setCurrentPage(Integer cPage) {
		if ((cPage == null) || (cPage.intValue() <= 0)) {
			this.currentPage = defaultFriatPage;
		} else {
			this.currentPage = cPage;
		}
	}
	/**
	 * setCurrentPageString.
	 * @param s 参数
	 */
	public void setCurrentPageString(String s) {
		if (isBlank(s)) {
			return;
		}
		try {
			setCurrentPage(Integer.parseInt(s));
		} catch (NumberFormatException ignore) {
			this.setCurrentPage(defaultFriatPage);
		}
	}

	/**
	 * @return Returns the pageSize
	 */
	public Integer getPageSize() {
		if (pageSize == null) {
			return getDefaultPageSize();
		}

		return pageSize;
	}
	  
	/**
	 * @param pSize The pageSize to set
	 */
	public void setPageSize(Integer pSize) {
		if (pSize == null) {
			throw new IllegalArgumentException("PageSize can't be null.");
		}

		if (pSize.intValue() <= 0) {
			throw new IllegalArgumentException("PageSize must great than zero.");
		}

		this.pageSize = pSize;
	}
	/**
	 * setPageSizeString.
	 * @param pageSizeString 参数
	 */
	public void setPageSizeString(String pageSizeString) {
		if (isBlank(pageSizeString)) {
			return;
		}

		try {
			Integer integer = new Integer(pageSizeString);
			this.setPageSize(integer);
		} catch (NumberFormatException e) {
			logger.error(e.getMessage(),e);
		}
	}

	/**
	 * @return Returns the totalItem
	 */
	public Integer getTotalItem() {
		if (totalItem == null) {
			// throw new IllegalStateException("Please set the TotalItem
			// frist.");
			return defaultTotleItem;
		}

		return totalItem;
	}

	/**
	 * @param tItem The totalItem to set
	 */
	public void setTotalItem(Integer tItemreq) {
		Integer tItem;
		if (tItemreq == null) {
			// throw new IllegalArgumentException("TotalItem can't be null.");
			tItem = new Integer(0);
		}else{
			tItem =tItemreq;
		}
		this.totalItem = tItem;
		int current = this.getCurrentPage().intValue();
		int lastPage = this.getTotalPage();
		logger.debug("current="+current+" ;lastPage="+lastPage);
		//if (current > lastPage) {
			//this.setCurrentPage(new Integer(lastPage));
		//}
	}
	/**
	 * getTotalPage.
	 * @return 返回
	 */
	public int getTotalPage() {
		int pgSize = this.getPageSize().intValue();
		int total = this.getTotalItem().intValue();
		int result = total / pgSize;

		if ((total % pgSize) != 0) {
			result++;
		}

		return result;
	}
	/**
	 * getPageFristItem.
	 * @return 返回
	 */
	public int getPageFristItem() {
		int cPage = this.getCurrentPage().intValue();

		if (cPage == 1) {
			//return 1;
			return 0;   //mysql从0开始
		}

		cPage--;

		int pgSize = this.getPageSize().intValue();

		return (pgSize * cPage);
	}
	/**
	 * getPageLastItem.
	 * @return 返回
	 * mysql 返回较特殊,返回的pagesize
	 */
	public int getPageLastItem() {
		int pgSize = this.getPageSize().intValue();
		/*
		int cPage = this.getCurrentPage().intValue(); 
		int assumeLast = pgSize * cPage;
		int totalItem = getTotalItem().intValue();

		if (assumeLast > totalItem) {
			return totalItem;
		} else {
			return assumeLast;
		}*/
		return pgSize;
		
	}
 

	/**
	 * 把分页类中的分页相关参数拷贝到ParingPropertes对象中并且返回.
	 * @return 返回
	 */
	public Pagination getPagination() {
		Pagination p = new Pagination();
		p.setTotalItem(this.getTotalItem());
		p.setTotalPage(this.getTotalPage());
		p.setCurrentPage(this.getCurrentPage()); 
		p.setPageFristItem(this.getPageFristItem());
		p.setPageLastItem(this.getPageLastItem());
		return p;
	}

	/**
	 * 通过Pagination设置分页类中的分页相关参数.
	 * @param pagination 参数
	 */
	public void setPagination(Pagination pagination) {
		if(pagination != null && pagination.getCurrentPage()!=null && pagination.getCurrentPage() != 0){
			this.setCurrentPage(pagination.getCurrentPage());
		}else{
			this.setCurrentPage(this.defaultFriatPage);
		}
		if(pagination != null && pagination.getPageSize()!=null && pagination.getPageSize() != 0){
			this.setPageSize(pagination.getPageSize());
		}else{
			this.setPageSize(this.defaultPageSize);
		}
		if(pagination != null && pagination.getTotalItem()!=null && pagination.getTotalItem() != 0){
			this.setTotalItem(pagination.getTotalItem());
		}else{
			this.setTotalItem(0);
		}
	}
	/**
	 * 把分页类中的分页相关参数拷贝到DOMAIN中.
	 * @param dto 参数
	 */
	public void copyPagination(Pagination dto){
		//System.out.println("copy start:"+this.getPageFristItem()+","+this.getPageLastItem());
		dto.setPageFristItem(this.getPageFristItem());
		dto.setPageLastItem(this.getPageLastItem()); 
	}
	/**
	 * isBlank.
	 * @param s 参数
	 * @return 返回
	 */
	private boolean isBlank(String s){
		if(s!= null && s.length()!=0){
			if(s.trim() == null || s.trim().length() == 0){
				return true;
			}
			return false;
		}
		return true;
	}
     
}
