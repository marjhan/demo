package biz.session.provider;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * 会话通道提供者接口类.
 */
public interface SessionProvider {
    /**
     * 存放指定KEY的值.
     *
     * @param request 请求对象
     * @param response 应答对象
     * @param key 键
     * @param value 值
     * @create: 2014-4-4 下午12:56:55 xuebj07252
     * @history:
     */
    public void setAttribute(HttpServletRequest request, HttpServletResponse response,String key, Object value);

    /**
     * 获取指定KEY的值.
     * @param request 请求参数
     * @param key 键
     * @create: 2014-4-4 下午1:50:17 xuebj07252
     * @history:
     * @return 值返回
     */
    public Object getAttribute(HttpServletRequest request,String key);

    /**
     * 移除某个值.
     * @param request 请求参数
     * @param response 应答参数
     * @param key 键
     * @create: 2014-4-4 下午12:57:12 xuebj07252
     * @history:
     */
    public void removeAttribute(HttpServletRequest request, HttpServletResponse response,String key);
}
