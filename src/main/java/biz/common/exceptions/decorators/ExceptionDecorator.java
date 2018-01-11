package biz.common.exceptions.decorators;

import java.util.HashMap;
import java.util.Map;

import biz.common.util.ParamConstants;


/**
 * 通用异常解析器.
 * Created by .
 */
public class ExceptionDecorator extends BaseExceptionDecorator {
    /**
	 * .
	 */
	private static final long serialVersionUID = 1L;

	/**
	 * 异常对象.
	 */
	private Exception exception;
	/**
	 * 基础包.
	 */
    private String basePackage;

    /**
     * 构造函数.
     * @param exception 异常类.
     * @param basePackage 基础包.
     */
    public ExceptionDecorator(Exception exception,String basePackage) {
        this.exception = exception;
        this.basePackage =basePackage;
    }

    /**
     * 异常信息处理.
     * @param map 入参.
     */
    @Override
    protected void fillPackMap(Map<String, Object> map) {
    	Map<String,Object> exceptionMap = new HashMap<String, Object>();
    	exceptionMap.put("errorCode","");
        exceptionMap.put("errorMessage",exception.getMessage());
        map.put(DATA_KEY,exceptionMap);
        map.put(ParamConstants.RESPONSE_ERROR_NO, "");
        map.put(ParamConstants.RESPONSE_ERROR_INFO, exception.getMessage());
        map.put(ParamConstants.RESPONSE_ERROR_CODE, "");
        map.put(ParamConstants.RESPONSE_ERROR_EXTINFO, "");
    }

    /** 
     * 得到message.
     * @return 返回.
     */
    @Override
    public String getMessage() {
    	String errorMessage = getExceptionMessage(exception);
        return "".equals(errorMessage) ? exception.getMessage() : errorMessage;
    }


    /**
     * 找出错误根源.
     * @param e 入参.
     * @return 返回.
     */
    protected String getExceptionMessage(Throwable e) {
        String classCause ="";
        StackTraceElement el = e.getStackTrace()[0];
        if(el.getClassName().indexOf(basePackage)!= -1){
            classCause += getCauseInfoBySTElement(el);
        }
        Throwable cause = e.getCause();
        if(cause != null){
            classCause += getExceptionMessage(cause);
        }
        return classCause;

    }

    /**获取最终起因信息 java.io.FileOutputStream.open(原始方法).
     * @param el  StackTraceElement.
     * @return 返回最终起因信息.
     */
    private String getCauseInfoBySTElement(StackTraceElement el){
        String lineNum = el.getLineNumber()< 0? "原始方法":el.getFileName()+":"+el.getLineNumber();
        return (el.getClassName()+"."+el.getMethodName()+"("+lineNum+")");
    }
}
