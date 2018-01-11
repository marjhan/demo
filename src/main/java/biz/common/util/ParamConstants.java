package biz.common.util;
/** 
* @author  xuzc
* @date 2017年12月28日 下午1:16:15 
* @version 1.0 
* @parameter  
* @since  
* @return  */
public class ParamConstants {
	
	/**用户ID.*/
	public static String USER_ID = "user_id";
	
	/**秘钥对.*/
	public static final String KEYPAIR = "KeyPair";
	
	//session拦截处理异常未登录或者session过期
	/**
	 * .
	 */
	public static final String INTERCEPTOR_NO_LOGIN = "291";
	
	
	//public static final String COMPANY_ID_VALUE9100 =  "91000";
    // 2 协议必须字段缺失 报文中协议规范规定的字段缺失
	/**
	 * .
	 */
    public static final String ERROR_NO_2 = "2";
	
	/**应答返回——错误编号,标志是正确应答还是错误应答.*/
	public static final String RESPONSE_ERROR_NO = "error_no";
	/**应答返回——错误信息,对错误信息的描述.*/
	public static final String RESPONSE_ERROR_INFO = "error_info";
	/**应答返回——错误编号,具体系统定义错误码.*/
	public static final String RESPONSE_ERROR_CODE = "error_code";
	/**应答返回——系统辅助信息,用于排查定位问题.*/
	public static final String RESPONSE_ERROR_EXTINFO = "error_extinfo";
}
