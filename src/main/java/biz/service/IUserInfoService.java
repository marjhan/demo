package biz.service;

import biz.req.UserGetReq;
import biz.res.UserGetRes;

public interface IUserInfoService {
	
	public UserGetRes getUserInfo(UserGetReq userGetReq);

}
