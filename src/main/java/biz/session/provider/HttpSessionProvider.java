package biz.session.provider;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 * 使用HttpSession 管理会话信息.
 * 
 */
public class HttpSessionProvider implements SessionProvider {

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
    public void setAttribute(HttpServletRequest request, HttpServletResponse response, String key, Object value) {
            getSession(request,true).setAttribute(key,value);
    }

    /**
     * 获取指定KEY的值.
     * @param request 请求参数
     * @param key 键
     * @create: 2014-4-4 下午1:50:17 xuebj07252
     * @history:
     * @return 值返回
     */
    public Object getAttribute(HttpServletRequest request, String key) {
       return getSession(request,true).getAttribute(key);
    }

    /**
     * 移除某个值.
     * @param request 请求参数
     * @param response 应答参数
     * @param key 键
     * @create: 2014-4-4 下午12:57:12 xuebj07252
     * @history:
     */
    public void removeAttribute(HttpServletRequest request, HttpServletResponse response, String key) {
        HttpSession session = getSession(request,false);
        if(null != session){
            session.removeAttribute(key);
        }
    }


    /**
     * 获取Session.
     * @param request 请求对象.
     * @param create  不存在时,是否生成一个Session
     * @return 返回
     */
    private HttpSession getSession (HttpServletRequest request,boolean create){
        return request.getSession(create);
    }
}
