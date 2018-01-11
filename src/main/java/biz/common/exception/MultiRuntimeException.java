package biz.common.exception;

import java.util.Collection;
import java.util.HashSet;

import biz.common.exception.exception.BaseRuntimeException;


/**
 * 多条异常信息组成
 * Created by xuebj07252 on 2014/8/28.
 */
public class MultiRuntimeException extends RuntimeException{

    private Collection<BaseRuntimeException> exceptions;

    public MultiRuntimeException(){

    }

    public MultiRuntimeException(BaseRuntimeException exception){
        getExceptions().add(exception);
    }

    public MultiRuntimeException (Collection<BaseRuntimeException> exceptions){
        this.exceptions = exceptions;
    }

    /**
     * 使用此方法，将重置exceptions
     * @param exceptions
     */
    public void setExceptions(Collection<BaseRuntimeException> exceptions) {
        this.exceptions = exceptions;
    }

    public void addException(BaseRuntimeException ... exceptions){
        for (BaseRuntimeException  exception :exceptions){
            getExceptions().add(exception);
        }
    }


    public Collection<BaseRuntimeException> getExceptions() {
        if(exceptions == null){
            exceptions = new HashSet<BaseRuntimeException>();
        }
        return exceptions;
    }

    /**
     * 覆盖父类中的错误信息
     * @return
     */
    @Override
	public String getMessage (){
        StringBuilder message = new StringBuilder();
        for (BaseRuntimeException exception: exceptions) {
            if(message.length() != 0){
                message.append("\n");
            }
            message.append(exception.getMessage());
        }
        return message.toString();
    }
}
