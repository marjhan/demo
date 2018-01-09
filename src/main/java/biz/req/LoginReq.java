package biz.req;
/** 
* @author  xuzc
* @date 2017年12月28日 下午1:13:34 
* @version 1.0 
* @parameter  
* @since  
* @return  */
public class LoginReq {
	

	public Integer userId;

	public String userName;

	public String password;

	public String ip;

	/**
	 * @return the userId
	 */
	public Integer getUserId() {
		return userId;
	}

	/**
	 * @param userId the userId to set
	 */
	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	/**
	 * @return the userName
	 */
	public String getUserName() {
		return userName;
	}

	/**
	 * @param userName the userName to set
	 */
	public void setUserName(String userName) {
		this.userName = userName;
	}

	/**
	 * @return the passWord
	 */
	public String getPassword() {
		return password;
	}

	/**
	 * @param passWord the passWord to set
	 */
	public void setPassword(String password) {
		this.password = password;
	}

	/**
	 * @return the ip
	 */
	public String getIp() {
		return ip;
	}

	/**
	 * @param ip the ip to set
	 */
	public void setIp(String ip) {
		this.ip = ip;
	}
	
	
}
