package biz.common.exceptions.decorator;

import java.util.Map;

import biz.common.exception.exception.BaseRuntimeException;
import biz.common.exceptions.decorators.BaseRuntimeExceptionDecorator;



/**
 * 给Exception增加URL 对象属性
 * Created by 
 */
public class ExceptionURLDecorator extends BaseRuntimeExceptionDecorator {

    /**
     * 目标URL
     */
    private String target;

    public ExceptionURLDecorator(BaseRuntimeException exception,String target) {
        super(exception);
        this.target = target;
    }


    @Override
    protected void fillPackMap(Map<String, Object> map) {
        super.fillPackMap(map);
        //json 打包时去掉 redirect及forward关键字
       target= target.replaceAll("redirect:","").replaceAll("forward:","");
        map.put("target",target);
    }

    public String getTarget() {
        return target;
    }
}
