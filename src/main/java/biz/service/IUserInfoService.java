package biz.service;

import biz.req.UserInfoGetReq;
import biz.res.UserInfoGetRes;

public interface IUserInfoService {
	
	public UserInfoGetRes getUserInfo(UserInfoGetReq userInfOGetReq);

}
