package biz.service;

import java.util.List;

import biz.domain.User;
import biz.req.UserInfoGetReq;
import biz.res.UserInfoGetRes;

public interface IUserInfoService {
	
	public UserInfoGetRes getUserInfo(UserInfoGetReq userInfOGetReq);
	
	public List<User> queryUserInfoList();

}
