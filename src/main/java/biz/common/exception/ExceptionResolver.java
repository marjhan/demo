package biz.common.exception;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Locale;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.MessageSource;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.SimpleMappingExceptionResolver;
import org.springframework.web.servlet.support.RequestContextUtils;

import biz.common.exceptions.decorator.ExceptionDecoratorManager;
import biz.common.exceptions.decorator.ExceptionURLDecorator;
import biz.common.exceptions.decorators.BaseExceptionDecorator;
import biz.common.util.RequestUtil;


/**
 * 统一异常拦截器
 */

public class ExceptionResolver extends SimpleMappingExceptionResolver {
    private static final Logger logger = LoggerFactory
            .getLogger(ExceptionResolver.class);


    private MessageSource messageSource;

    private ExceptionDecoratorManager decoratorManager;

    @Override
    protected ModelAndView doResolveException(HttpServletRequest request,
                                              HttpServletResponse response, Object handler, Exception exception) {
        /** 修饰异常,返回装饰之后的异常装饰对象**/
        Locale locale = RequestContextUtils.getLocale(request);
        if(!(exception instanceof BusinessException)){
        	exception = new BusinessException("82", "网络异常");
        }
        BaseExceptionDecorator exceptionDecorator = decoratorManager.buildExceptionDecorator(exception, locale);
        /** 如果请求是ajax的，则将异常信息字符串直接输出 */
        if (RequestUtil.isAjaxRequest(request)) {
            return doResolveAjaxException(response, exceptionDecorator);
        }
        /** 使用spring mvc自带的异常处理 */
        ModelAndView modelAndView = super.doResolveException(request, response, handler, exceptionDecorator);
        //针对调整页面单独处理
        if(exceptionDecorator instanceof ExceptionURLDecorator){
            modelAndView.setViewName(((ExceptionURLDecorator) exceptionDecorator).getTarget());
        }
        return modelAndView;
    }

    /**
     * ajax时，写出异常信息到response中
     *
     * @param response
     * @param decorator
     */
    private ModelAndView doResolveAjaxException(HttpServletResponse response,
                                                BaseExceptionDecorator decorator) {
        setResponse(response);
        try {
            PrintWriter writer = response.getWriter();
            String jsonStr = decorator.toJson();
            if (StringUtils.isNotBlank(jsonStr)) {
                writer.write(jsonStr);
            }
            writer.flush();
        } catch (IOException e) {
            logger.error("处理ajax请求 返回异常信息失败:" + e);
        }
        return new ModelAndView();
    }

    /**
     * 设置response 编码及头信息
     *
     * @param response
     */
    private void setResponse(HttpServletResponse response) {
        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json;charset=UTF-8");
    }

    public ExceptionDecoratorManager getDecoratorManager() {
        return decoratorManager;
    }

    public void setDecoratorManager(ExceptionDecoratorManager decoratorManager) {
        this.decoratorManager = decoratorManager;
    }

    public MessageSource getMessageSource() {
        return messageSource;
    }

    public void setMessageSource(MessageSource messageSource) {
        this.messageSource = messageSource;
    }
}
