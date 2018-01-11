package biz.common.exceptions.config;

import java.util.Properties;

/**
 * 定义异常和跳转URL映射关系
 * Created by 
 */
public class ExceptionMapping {

    private Properties mappings;

    public Properties getExceptionMappings() {
        return mappings;
    }

    public void setExceptionMappings(Properties mappings) {
        this.mappings = mappings;
    }

    /**
     * 是否包含此异常信息
     * @param exceptionType
     * @return
     */
    public Boolean contains(String exceptionType){
        String value = mappings.getProperty(exceptionType);
        return null == value ? Boolean.FALSE:Boolean.TRUE;
    }

    /**
     * 获取指定URL
     * @param exceptionType
     * @return
     */
    public String getUrl(String exceptionType){
        return mappings.getProperty(exceptionType);
    }
}
