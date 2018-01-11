package biz.common.exceptions.decorators;

import java.util.Map;

import biz.common.exception.exception.BaseRuntimeException;


/**
 * Created by.
 */
public class BaseRuntimeExceptionDecorator extends BaseExceptionDecorator {

    /**
	 * .
	 */
	private static final long serialVersionUID = 1L;
	/**
	 * 异常对象.
	 */
	protected BaseRuntimeException exception;

	/**
	 * 构造函数.
	 * @param exception 入参.
	 */
    public BaseRuntimeExceptionDecorator(BaseRuntimeException exception) {
        this.exception = exception;
    }

    /**
     * 异常信息处理.
     * @param map 入参.
     */
    @Override
    protected void fillPackMap(Map<String, Object> map) {
        map.put(DATA_KEY, baseException2Map(exception,map));
    }

    /**
     * 获取message.
     * @return 返回.
     */
    @Override
    public String getMessage() {
        return exception.getMessage();
    }
}
