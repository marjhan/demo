package biz.common.util;

import javax.servlet.http.HttpServletRequest;

/**
 * requestUtil 处理request相关内容
 * Created by xuebj07252 on 2014/8/26.
 */
public abstract  class RequestUtil {

    /**
     * 判断是否是ajax请求
     *
     * @param request
     * @return
     */
    public static boolean isAjaxRequest(HttpServletRequest request) {
        if (request.getHeader("accept").indexOf("application/json") > -1) {
            return true;
        }
        if (request.getHeader("X-Requested-With") == null) {
            return false;
        }
        if (request.getHeader("X-Requested-With").indexOf("XMLHttpRequest") > -1) {
            return true;
        }
        return false;
    }

}
