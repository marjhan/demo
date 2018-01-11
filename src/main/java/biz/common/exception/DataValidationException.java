package biz.common.exception;

import biz.common.exception.exception.BaseRuntimeException;

/**
 * 表单异常类，例如form表单数据验证
 * <p> 系统版本: v1.0。0</p><br>
 * 作者: xuebj07252 邮箱:xuebj07252@hundsun.com <br>
 * 创建时间: 2014-3-25 下午2:13:54<br>
 * 修改记录:
 * 修改日期            修改人员                     修改说明 <br>
 * ========    =======  ============================================
 * 
 * ========    =======  ============================================
 */

public class DataValidationException extends BaseRuntimeException {
    /**
     * 默认错误号
     */
    private static final String default_error_code = "D-100001";

    public DataValidationException (String fieldName,String errorMessage){
        super(default_error_code, errorMessage);
        this.extend = fieldName;
    }

}
