package biz.common.exceptions.decorators;

import java.util.HashMap;
import java.util.Map;

import biz.common.exception.BusinessException;
import biz.common.util.ParamConstants;


/**
 * teng异常修饰类.
 * @author xufy12864.
 */
public class BusinessExceptionDecorator  extends BaseExceptionDecorator {

	/**
	 * .
	 */
	private static final long serialVersionUID = 1L;
	/**
	 * 异常对象.
	 */
	protected BusinessException exception;

	/**
	 * 构造函数.
	 * @param exception 初始化入参.
	 */
	public BusinessExceptionDecorator(BusinessException exception) {
		super();
		this.exception = exception;
	}

	/**
	 * 异常信息处理.
	 * @param map 入参.
	 */
	@Override
	protected void fillPackMap(Map<String, Object> map) {
		// TODO Auto-generated method stub
		Map<String,Object> exceptionMap = new HashMap<String, Object>();
    	exceptionMap.put("errorCode",exception.getError_no());
        exceptionMap.put("errorMessage",exception.getMessage());
        exceptionMap.put("extend",exception.getError_extinfo());
        map.put(DATA_KEY,exceptionMap);
        map.put(ParamConstants.RESPONSE_ERROR_NO, exception.getError_no());
        map.put(ParamConstants.RESPONSE_ERROR_INFO, exception.getError_info());
        map.put(ParamConstants.RESPONSE_ERROR_CODE, exception.getError_code());
        map.put(ParamConstants.RESPONSE_ERROR_EXTINFO, exception.getError_extinfo());
	}

	/**
	 * 获取message.
	 * @return 返回.
	 */
	@Override
	public String getMessage() {
		// TODO Auto-generated method stub
		return exception.getError_info();
	}

}
