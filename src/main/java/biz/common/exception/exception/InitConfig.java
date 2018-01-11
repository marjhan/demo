package biz.common.exception.exception;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;

public class InitConfig extends HttpServlet {

	/**
	 * @Fields serialVersionUID : 
	 */
	private static final long serialVersionUID = 1L;

	public void init() throws ServletException {
		ExpConfig.getInstance().init();
	}

}
