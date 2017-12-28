package biz.beans;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.BeansException;
import org.springframework.beans.factory.NoSuchBeanDefinitionException;
import org.springframework.beans.factory.config.AutowireCapableBeanFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.core.OrderComparator;
import org.springframework.stereotype.Service;
/** 
* @author  xuzc
* @date 2017年12月29日 上午1:10:07 
* @version 1.0 
* @parameter  
* @since  
* @return  */
@Service
public class ObjectFactoryImpl implements ObjectFactory, ApplicationContextAware {
	private AutowireCapableBeanFactory autowireCapableBeanFactory;
	private ApplicationContext applicationContext;

	public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
		this.applicationContext = applicationContext;
		this.autowireCapableBeanFactory = applicationContext.getAutowireCapableBeanFactory();
	}

	public <T> T createBean(Class<T> beanClass, boolean dependencyCheck) {
		return (T) this.autowireCapableBeanFactory.createBean(beanClass, 1, dependencyCheck);
	}

	public void autowireBeanProperties(Object existingBean) {
		this.autowireCapableBeanFactory.autowireBeanProperties(existingBean, 1, false);
	}

	public <T> Map<String, T> getBeansOfType4Map(Class<T> beanClass) {
		return this.applicationContext.getBeansOfType(beanClass);
	}

	public <T> List<T> getBeansOfType4List(Class<T> beanClass) {
		Map map = getBeansOfType4Map(beanClass);
		if ((map != null) && (map.size() > 0)) {
			List list = new ArrayList(map.values());
			OrderComparator.sort(list);
			return list;
		}
		return null;
	}

	public Object getBean(String name) {
		try {
			return this.applicationContext.getBean(name);
		} catch (NoSuchBeanDefinitionException e) {
		}
		return null;
	}

	public <T> T getBean(Class<T> beanClass) {
		try {
			return this.applicationContext.getBean(beanClass);
		} catch (NoSuchBeanDefinitionException e) {
		}
		return null;
	}

	public <T> T[] getBeansOfType4Array(Class<T> beanClass) {
		Map<String, T> map = getBeansOfType4Map(beanClass);
		if ((map != null) && (map.size() > 0)) {
			Object[] result = (Object[]) (Object[]) Array.newInstance(beanClass, map.size());
			int n = 0;
			for (Map.Entry entry : map.entrySet()) {
				result[n] = entry.getValue();
				++n;
			}
			OrderComparator.sort(result);
			return (T[]) result;
		}
		return null;
	}
}