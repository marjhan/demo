package biz.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import biz.dao.IRoleDao;
import biz.domain.Role;
import biz.service.IRoleService;

/** 
* @author  xuzc
* @date 2018年5月1日 上午12:39:33 
* @version 1.0 
* @parameter  
* @since  
* @return  */
@Service
public class RoleServiceImpl implements IRoleService{

	/** 角色dao. */
	@Autowired
	private IRoleDao roleDao;

	@Override
	public List<Role> queryRoleList() {
		// TODO Auto-generated method stub
		return roleDao.queryRoleList();
	}

}
