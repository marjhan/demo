package biz.common.exceptions.decorator;

import java.util.Locale;

import org.springframework.context.MessageSource;
import org.springframework.validation.BindException;
import org.springframework.validation.FieldError;

import biz.common.exception.BusinessException;
import biz.common.exception.DataValidationException;
import biz.common.exception.MultiRuntimeException;
import biz.common.exception.exception.BaseRuntimeException;
import biz.common.exceptions.config.ExceptionMapping;
import biz.common.exceptions.decorators.BaseExceptionDecorator;
import biz.common.exceptions.decorators.BaseRuntimeExceptionDecorator;
import biz.common.exceptions.decorators.BusinessExceptionDecorator;
import biz.common.exceptions.decorators.ExceptionDecorator;
import biz.common.exceptions.decorators.MultiExceptionDecorator;



/**
 * 异常管理器.
 * Created by. 
 */
public class ExceptionDecoratorManager {

    /**
     * 国际化信息.
     */
    private MessageSource messageSource;

    /**
     * 异常映射处理类.
     */
    private ExceptionMapping exceptionMapping;

    /**
     * 工程基础包路径.
     */
    private String basePackage = "net.hs";

    /**
     * 根据异常类型处理异常.
     * @param exception 异常.
     * @param locale 请求.
     * @return 返回.
     */
    public BaseExceptionDecorator buildExceptionDecorator(Exception exception,Locale locale){
        BaseExceptionDecorator decorator ;
        if (exception instanceof BindException) {//Spring 在数据绑定失败时会抛出的异常
            decorator = resolveBindException((BindException) exception);
        } else if (exception instanceof MultiRuntimeException) {//多种异常信息
            decorator =  resolveMultiRuntimeException((MultiRuntimeException) exception, locale);
        } else if (exception instanceof BaseRuntimeException) {//一般单条异常信息
            decorator = resolveBaseRuntimeException((BaseRuntimeException) exception,locale);
        } else if (exception instanceof BusinessException) {//teng异常信息
        	decorator = resolveBusinessException((BusinessException) exception);
        } else {//体系外的异常信息
            decorator =  resolveOtherException(exception);
        }
        return decorator;
    }


    /**
     * 解析 数据绑定异常类.
     * 转换成 MultiRuntimeException类型.
     *
     * @param exception 异常.
     * @return 返回.
     */
    private MultiExceptionDecorator resolveBindException(BindException exception) {
        MultiRuntimeException multiRuntimeException = new MultiRuntimeException();
        for (FieldError filed : exception.getFieldErrors()) {
            multiRuntimeException.addException(new DataValidationException(filed.getField(), filed.getDefaultMessage()));
        }
        return new MultiExceptionDecorator(multiRuntimeException);
    }

    /**
     * 解析多条异常信息，国际化错误信息.
     * @param exception 异常.
     * @param locale 入参.
     * @return 返回.
     */
    private MultiExceptionDecorator resolveMultiRuntimeException(MultiRuntimeException exception, Locale locale) {
        for (BaseRuntimeException ex : exception.getExceptions()) {
            ex.setErrorMessage(messageSource.getMessage(ex.getErrorCode(), null, ex.getErrorMessage(), locale));
        }
        return new MultiExceptionDecorator(exception);
    }

    /**
     * 解析单条异常信息，国际信息.
     * @param exception 异常.
     * @param locale 请求.
     * @return 返回.
     */
    private BaseRuntimeExceptionDecorator resolveBaseRuntimeException(BaseRuntimeException exception, Locale locale){
        exception.setErrorMessage(messageSource.getMessage(exception.getErrorCode(), null, exception.getErrorMessage(), locale));
        String className = exception.getClass().getSimpleName();
        if(exceptionMapping.contains(className)){
            return new ExceptionURLDecorator(exception,exceptionMapping.getUrl(className));
        }else{
            return new BaseRuntimeExceptionDecorator(exception);
        }
    }

    /**
     * 解决体系外的异常 封装成UIException.
     * @param exception 异常入参.
     * @return 返回.
     */
    private ExceptionDecorator resolveOtherException(Exception exception){
        ExceptionDecorator decorator = new ExceptionDecorator(exception,basePackage);
        return decorator;
    }

    /**
     * 解析Teng异常.
     * @param exception 异常入参.
     * @return 返回.
     */
    private BusinessExceptionDecorator resolveBusinessException(BusinessException exception){
    	BusinessExceptionDecorator decorator = new BusinessExceptionDecorator(exception);
    	return decorator;
    }

    /**
     * @return basePackage.
     */
    public String getBasePackage() {
        return basePackage;
    }

    /**
     * @param basePackage 入参.
     */
    public void setBasePackage(String basePackage) {
        this.basePackage = basePackage;
    }

    /**
     * @return exceptionMapping.
     */
    public ExceptionMapping getExceptionMapping() {
        return exceptionMapping;
    }

    /**
     * @param exceptionMapping 入参.
     */
    public void setExceptionMapping(ExceptionMapping exceptionMapping) {
        this.exceptionMapping = exceptionMapping;
    }

    /**
     * @return messageSource.
     */
    public MessageSource getMessageSource() {
        return messageSource;
    }

    /**
     * @param messageSource 请求.
     */
    public void setMessageSource(MessageSource messageSource) {
        this.messageSource = messageSource;
    }
}
