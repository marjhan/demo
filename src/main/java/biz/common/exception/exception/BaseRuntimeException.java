package biz.common.exception.exception;

import org.apache.commons.lang3.StringUtils;

import biz.common.exception.RemotingServiceException;

/**
 * 基本异常类，所有产生的异常最终都需要封装成此类 或其子类.
 * 自定义异常需要继承此异常类.
 * <p> 系统版本: v1.0。0</p><br>.
 * 作者: xuebj07252 邮箱:xuebj07252@hundsun.com <br>.
 * 创建时间: 2014-3-13 下午2:07:36<br>.
 * 修改记录:.
 * 修改日期            修改人员                     修改说明 <br>.
 * ========    =======  ============================================
 * 
 * ========    =======  ============================================
 */
public abstract class BaseRuntimeException extends RemotingServiceException {

    /**
	 * .
	 */
	private static final long serialVersionUID = 1L;

	/**
     * 错误号.
     */
    protected String errorCode;

    /**
     * 错误信息.
     */
    protected String errorMessage;

    /**
     * 扩展信息.
     */
    protected Object extend;

    /**
     * 构造函数.
     * @param errorCode 入参.
     * @param errorMessage 入参.
     */
    protected BaseRuntimeException(String errorCode, String errorMessage){
        super(errorCode,errorMessage);
        this.errorCode = errorCode;
        this.errorMessage = errorMessage;

    }

    /**
     * 构造函数.
     * @param errorCode 入参.
     * @param errorMessage 入参.
     * @param extend 入参.
     */
    protected BaseRuntimeException(String errorCode, String errorMessage, Object extend) {
        super(errorCode,errorMessage);
        this.errorCode = errorCode;
        this.errorMessage = errorMessage;
        this.extend = extend;
    }



    /**
     * 如果存在errorMessage 就覆盖父类异常信息.
     * @return 返回.
     */
    @Override
	public String getMessage (){
        return StringUtils.isBlank(errorMessage)? super.getMessage():errorMessage;
    }

    /**
     * 设置errorMessage.
     * @param errorMessage 入参.
     */
    public void setErrorMessage(String errorMessage) {
        this.errorMessage = errorMessage;
    }

    /**
     * 获取errorCode.
     * @return 返回.
     */
    public String getErrorCode() {
        return errorCode;
    }
    /**
     * 获取errorMessage.
     * @return 返回.
     */
    public String getErrorMessage() {
        return errorMessage;
    }
    /**
     * 获取extend.
     * @return 返回.
     */
    public Object getExtend() {
        return extend;
    }
}
