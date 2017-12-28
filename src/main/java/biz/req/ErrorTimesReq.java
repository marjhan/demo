package biz.req;

import javax.validation.constraints.NotEmpty;

public class ErrorTimesReq {
	/**用户名.*/
	@NotEmpty(message = "用户名不能为空")
	private String user_name;

	public String getUser_name() {
		return user_name;
	}

	public void setUser_name(String user_name) {
		this.user_name = user_name;
	}
}
