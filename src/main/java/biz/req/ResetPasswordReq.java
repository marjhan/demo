package biz.req;

import org.hibernate.validator.constraints.NotEmpty;

/**
 * 找回密码请求.
 * @author xufy12864
 *
 */
public class ResetPasswordReq {
	
	/**
	 * 认证账户.
	 */
	private String auth_id;
	
	/**
	 * 电子邮件.
	 */
	private String email;
	
	/**
	 * 手机号码.
	 */
	private String mobile_tel;
	
	/**
	 * 新密码.
	 */
	@NotEmpty(message = "新密码不能为空")
	private String new_password;
	
	/**
	 * 认证校验编号.
	 */
	@NotEmpty(message = "认证校验编号不能为空")
	private String authcheck_id;

	/**
	 * 认证校验码.
	 */
	@NotEmpty(message = "认证校验码不能为空")
	private String auth_check_code;

	/**
	 * @return the auth_id
	 */
	public String getAuth_id() {
		return auth_id;
	}

	/**
	 * @param auth_id the auth_id to set
	 */
	public void setAuth_id(String auth_id) {
		this.auth_id = auth_id;
	}

	/**
	 * @return the email
	 */
	public String getEmail() {
		return email;
	}

	/**
	 * @param email the email to set
	 */
	public void setEmail(String email) {
		this.email = email;
	}

	/**
	 * @return the mobile_tel
	 */
	public String getMobile_tel() {
		return mobile_tel;
	}

	/**
	 * @param mobile_tel the mobile_tel to set
	 */
	public void setMobile_tel(String mobile_tel) {
		this.mobile_tel = mobile_tel;
	}

	/**
	 * @return the new_password
	 */
	public String getNew_password() {
		return new_password;
	}

	/**
	 * @param new_password the new_password to set
	 */
	public void setNew_password(String new_password) {
		this.new_password = new_password;
	}

	/**
	 * @return the authcheck_id
	 */
	public String getAuthcheck_id() {
		return authcheck_id;
	}

	/**
	 * @param authcheck_id the authcheck_id to set
	 */
	public void setAuthcheck_id(String authcheck_id) {
		this.authcheck_id = authcheck_id;
	}

	/**
	 * @return the auth_check_code
	 */
	public String getAuth_check_code() {
		return auth_check_code;
	}

	/**
	 * @param auth_check_code the auth_check_code to set
	 */
	public void setAuth_check_code(String auth_check_code) {
		this.auth_check_code = auth_check_code;
	}
	
}
