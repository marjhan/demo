package biz.common.exception;

/***
 * 
 * iTN网站 后台通用异常.
 * @author chenhl.
 * 
 */
public class BusinessException extends BaseException {
	/**
	 * .
	 */
    private static final long serialVersionUID = -3880057315966629842L;
    
    /**应答返回——错误编号,标志是正确应答还是错误应答.*/
    protected String error_no;
    /**应答返回——错误信息,对错误信息的描述.*/
    protected String error_info;
    /**应答返回——错误编号,具体系统定义错误码.*/
    protected String error_code;
    /**应答返回——系统辅助信息,用于排查定位问题.*/
    protected String error_extinfo;
    /**T2return_code.*/
    protected int return_code;
    
    /**
     * 构造函数.
     * @param error_no 错误代码 .	
     * @param error_info 错误信息.
     */
    public BusinessException(String error_no, String error_info) {
        super(error_no, error_info);
        this.error_no = error_no;
        this.error_info = error_info;
        this.error_code = error_no;
    }
    /**
     * 构造函数.
     * @param error_no 错误代码 .	
     * @param error_info 错误信息.
     * @param error_code 错误编号.
     */
	public BusinessException(String error_no, String error_info, String error_code) {
		super(error_no, error_info);
		this.error_no = error_no;
		this.error_info = error_info;
		this.error_code = error_code;
	}
	 /**
     * 构造函数.
     * @param error_no 错误代码 .	
     * @param error_info 错误信息.
     * @param error_code 错误编号.
     * @param error_extinfo 系统辅助信息.
     */
	public BusinessException(String error_no, String error_info, String error_code,
			String error_extinfo) {
		super(error_no, error_info);
		this.error_no = error_no;
		this.error_info = error_info;
		this.error_code = error_code;
		this.error_extinfo = error_extinfo;
	}

	 /**
     * 构造函数.
     * @param error_info 错误信息.
     * @param error_code 错误编号.
     * @param error_extinfo 系统辅助信息.
     * @param return_code T2.
     */
	public BusinessException(String error_info, String error_code,
			String error_extinfo, int return_code) {
		super(Integer.toString(return_code), error_info);
		this.error_no = Integer.toString(return_code);
		this.error_info = error_info;
		this.error_code = error_code;
		this.error_extinfo = error_extinfo;
		this.return_code = return_code;
	}
	/**
	 * @return the error_no.
	 */
	public String getError_no() {
		return error_no;
	}

	/**
	 * @param error_no the error_no to set.
	 */
	public void setError_no(String error_no) {
		this.error_no = error_no;
	}

	/**
	 * @return the error_info.
	 */
	public String getError_info() {
		return error_info;
	}

	/**
	 * @param error_info the error_info to set.
	 */
	public void setError_info(String error_info) {
		this.error_info = error_info;
	}

	/**
	 * @return the error_code.
	 */
	public String getError_code() {
		return error_code;
	}

	/**
	 * @param error_code the error_code to set.
	 */
	public void setError_code(String error_code) {
		this.error_code = error_code;
	}

	/**
	 * @return the error_extinfo.
	 */
	public String getError_extinfo() {
		return error_extinfo;
	}

	/**
	 * @param error_extinfo the error_extinfo to set.
	 */
	public void setError_extinfo(String error_extinfo) {
		this.error_extinfo = error_extinfo;
	}
	/**
	 * @return the return_code.
	 */
	public int getReturn_code() {
		return return_code;
	}
	/**
	 * @param return_code the return_code to set.
	 */
	public void setReturn_code(int return_code) {
		this.return_code = return_code;
	}

}
