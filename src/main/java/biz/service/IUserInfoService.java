package biz.service;

import java.util.List;

import biz.domain.User;
import biz.req.UpdatePwdReq;
import biz.req.UserInfoGetReq;
import biz.res.UserInfoGetRes;

public interface IUserInfoService {
	
	public UserInfoGetRes getUserInfo(UserInfoGetReq userInfOGetReq);
	
	public void updateUserInfo(UpdatePwdReq updatePwdReq);
	
	public List<User> queryUserInfoList();

}
