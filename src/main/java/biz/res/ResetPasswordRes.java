package biz.res;

/**
 * 找回密码返回.
 * @author xufy12864
 *
 */
public class ResetPasswordRes {

	/**
	 * 认证账户.
	 */
	private String auth_id;

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
}
