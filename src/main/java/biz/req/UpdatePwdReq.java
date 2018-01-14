package biz.req;

import org.hibernate.validator.constraints.NotEmpty;

/**
 * 修改密码请求.
 * 
 * @author xuzc
 *
 */
public class UpdatePwdReq {
	/**
	 * 用户id.
	 */
	//private String user_id;
	private	Integer userId;
	/**
	 * 旧密码.
	 */
	@NotEmpty(message = "旧密码不能为空")
	private String oldPwd;
	/**
	 * 新密码.
	 */
	@NotEmpty(message = "新密码不能为空")
	private String newPwd;
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
	 * @return the oldPwd
	 */
	public String getOldPwd() {
		return oldPwd;
	}
	/**
	 * @param oldPwd the oldPwd to set
	 */
	public void setOldPwd(String oldPwd) {
		this.oldPwd = oldPwd;
	}
	/**
	 * @return the newPwd
	 */
	public String getNewPwd() {
		return newPwd;
	}
	/**
	 * @param newPwd the newPwd to set
	 */
	public void setNewPwd(String newPwd) {
		this.newPwd = newPwd;
	}

	
}
