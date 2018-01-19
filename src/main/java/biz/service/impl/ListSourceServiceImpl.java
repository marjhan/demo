package biz.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import biz.dao.IListSourceDao;
import biz.domain.ListSource;
import biz.service.IListSourceService;

/** 
* @author  xuzc
* @date 2018年1月14日 上午12:39:10 
* @version 1.0 
* @parameter  
* @since  
* @return  */
@Service
public class ListSourceServiceImpl implements IListSourceService{

	/** 名单来源信息dao. */
	@Autowired
	private IListSourceDao listSourceDao;

	@Override
	public List<ListSource> queryListSourceList() {
		return listSourceDao.queryListSourceList();
	}

	@Override
	public List<ListSource> queryAllListSourceList() {
		return listSourceDao.queryAllListSourceList();
	}

	@Override
	public int addListSource(ListSource listSource) {
		return listSourceDao.insertSelective(listSource);
	}

	@Override
	public int updateListSourceStatus(ListSource listSource) {
		return listSourceDao.updateByPrimaryKeySelective(listSource);
	}

}
