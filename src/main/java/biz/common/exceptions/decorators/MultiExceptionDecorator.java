package biz.common.exceptions.decorators;

import java.util.Map;

import biz.common.exception.MultiRuntimeException;
import biz.common.exception.exception.BaseRuntimeException;



/**
 * 多异常信息包装器.
 * Created by xuebj07252 on 2014/8/29.
 */
public class MultiExceptionDecorator extends BaseExceptionDecorator {

    /**
	 * .
	 */
	private static final long serialVersionUID = 1L;
	/**
	 * 异常对象.
	 */
	private MultiRuntimeException exception;

	/** 
	 * 构造函数.
	 * @param exception 入参.
	 */
    public MultiExceptionDecorator(MultiRuntimeException exception) {
        this.exception = exception;
    }

    /**
     * 异常信息处理,只返回第一条异常数据信息.
     * @param map 入参.
     */
    @Override
    protected void fillPackMap(Map<String, Object> map) {
        //List<Map<String,Object>> list = new ArrayList<Map<String,Object>>();
        for (BaseRuntimeException ex: exception.getExceptions()){
            //list.add(baseException2Map(ex));
        	 map.put("data",baseException2Map(ex,map));
        	 break;
        }
       // map.put("data",list);
    }

    /**
     * 返回message.
     * @return 返回异常信息.
     */
    @Override
    public String getMessage() {
        return exception.getMessage();
    }
}
