package biz.common.exceptions.decorators;

import java.util.HashMap;
import java.util.Map;

import biz.common.exception.exception.BaseRuntimeException;
import biz.common.util.JacksonUtils;
import biz.common.util.ParamConstants;



/**
 * 基本的异常修饰器，用于增加非标准的异常信息.
 * 处理.
 * 1、国际化问题.
 * 2、json返回时的格式及属性信息.
 */
public abstract class BaseExceptionDecorator extends RuntimeException{

    /**
	 * .
	 */
	private static final long serialVersionUID = 1L;
	/**
	 * 是否成功标志.
	 */
	protected Boolean success = Boolean.FALSE;

    /**
     * 返回json 数据部分可以值.
     */
    protected final String DATA_KEY = "data";

    /**
     * 获取success.
     * @return success.
     */
    public Boolean getSuccess() {
        return success;
    }

    /**
     * 转换成Json字符串.
     * @return 返回.
     */
    public String toJson (){
        Map<String,Object> map = new HashMap<String, Object>() ;
        map.put("success",success);
        fillPackMap(map);
        return JacksonUtils.toJsonString(map);
    }

    /**
     * 把BaseRuntime需要打包的字段设置到 打包Map中.
     * @param exception 异常.
     * @param map 入参.
     * @return 返回.
     */
    protected Map<String,Object> baseException2Map(BaseRuntimeException exception,Map<String,Object> map){
        Map<String,Object> exceptionMap = new HashMap<String, Object>();
        exceptionMap.put("errorCode",exception.getErrorCode());
        exceptionMap.put("errorMessage",exception.getErrorMessage());
        exceptionMap.put("extend",exception.getExtend());
//        if(exception instanceof TengException){
//        	map.put(ParamConstants.RESPONSE_ERROR_NO, ((TengException) exception).getError_no());
//        	map.put(ParamConstants.RESPONSE_ERROR_INFO, ((TengException) exception).getError_info());
//        	map.put(ParamConstants.RESPONSE_ERROR_CODE, ((TengException) exception).getError_code());
//        	map.put(ParamConstants.RESPONSE_ERROR_EXTINFO, ((TengException) exception).getError_extinfo());
//        }
//        else{
        	map.put(ParamConstants.RESPONSE_ERROR_NO, exception.getErrorCode());
        	map.put(ParamConstants.RESPONSE_ERROR_INFO, exception.getErrorMessage());
        	map.put(ParamConstants.RESPONSE_ERROR_CODE, exception.getErrorCode());
        	map.put(ParamConstants.RESPONSE_ERROR_EXTINFO, exception.getExtend());
//        }
        return exceptionMap;
    }

    /**
     * 子包装器实现 特殊字段添加.
     * @param map 入参.
     */
    protected abstract void fillPackMap(Map<String,Object> map);

    /**
     * 获取同步异常信息.
     * @return 返回字符串.
     */
    @Override
	public abstract String getMessage();
}
