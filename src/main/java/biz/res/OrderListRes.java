package biz.res;

import java.util.List;

import biz.domain.OrderListDTO;
import biz.page.Pagination;

/** 
* @author  xuzc
* @date 2018年1月13日 上午1:58:55 
* @version 1.0 
* @parameter  
* @since  
* @return  */
public class OrderListRes {
	private List<OrderListDTO> beanList;
	private Pagination pageBean;
	public List<OrderListDTO> getBeanList() {
		return beanList;
	}
	public void setBeanList(List<OrderListDTO> beanList) {
		this.beanList = beanList;
	}
	public Pagination getPageBean() {
		return pageBean;
	}
	public void setPageBean(Pagination pageBean) {
		this.pageBean = pageBean;
	}
	
}
