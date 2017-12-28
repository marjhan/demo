package biz.session.provider;
 
import javax.servlet.http.HttpSessionAttributeListener;
import javax.servlet.http.HttpSessionBindingEvent;
import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;

import org.apache.log4j.Logger;
 
/** 
* @author  xuzc
* @date 2017年12月28日 下午1:13:34 
* @version 1.0 
* @parameter  
* @since  
* @return  */
public class SessionListener implements HttpSessionListener, HttpSessionAttributeListener {
	
	/** 日志对象. */
	static Logger logger = Logger.getLogger(SessionListener.class);
     
    //属性添加时间
    private long addTime;
     
    public void sessionCreated(HttpSessionEvent event) {
//    	logger.info(event.getSession().getId()+"session 创建"	);
    }
 
    public void sessionDestroyed(HttpSessionEvent event) {
//    	logger.info(event.getSession().getId()+"session 销毁");
    }
 
    public void attributeAdded(HttpSessionBindingEvent event) {
//    	logger.info(event.getSession().getId()+"添加属性："+event.getName());
        //当属性保存的时候保存当前时间
        addTime = System.currentTimeMillis();
    }
 
    public void attributeRemoved(HttpSessionBindingEvent event) {
//    	logger.info(event.getSession().getId()+"移除属性："+event.getName());
        //当属性移除的时候计算属性保存时间
        long removeTime = System.currentTimeMillis();
        long t = (removeTime-addTime)/1000;
        System.out.println("数据保存时间："+t+"秒");
    }
 
    public void attributeReplaced(HttpSessionBindingEvent event) {
//    	logger.info(event.getSession().getId()+"更改属性："+event.getName());
    }
 
}
