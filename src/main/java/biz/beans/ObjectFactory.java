package biz.beans;

/** 
* @author  xuzc
* @date 2017年12月28日 下午4:39:39 
* @version 1.0 
* @parameter  
* @since  
* @return  */
import java.util.List;
import java.util.Map;

/**
 * 
 * @author LeoHu copy sagahl
 * 
 */
public interface ObjectFactory {

	/**
	 * 创建bean
	 * 
	 * @param <T>
	 * @param beanClass
	 * @param dependencyCheck
	 * @return
	 */
	public <T> T createBean(Class<T> beanClass, boolean dependencyCheck);

	/**
	 * 装配属性bean
	 * 
	 * @param existingBean
	 */
	public void autowireBeanProperties(Object existingBean);

	/**
	 * 获取bean
	 * 
	 * @param <T>
	 * @param beanClass
	 * @return
	 */
	public <T> T getBean(Class<T> beanClass);

	/**
	 * 获取bean一map
	 * 
	 * @param <T>
	 * @param beanClass
	 * @return
	 */
	public <T> Map<String, T> getBeansOfType4Map(Class<T> beanClass);

	/**
	 * 获取bean一list
	 * 
	 * @param <T>
	 * @param beanClass
	 * @return
	 */
	public <T> List<T> getBeansOfType4List(Class<T> beanClass);

	/**
	 * 获取bean一bean数组
	 * 
	 * @param <T>
	 * @param beanClass
	 * @return
	 */
	public <T> T[] getBeansOfType4Array(Class<T> beanClass);

	/**
	 * 通过一个bean的name得到一个bean对象
	 * 
	 * @param name
	 * @return
	 */
	public Object getBean(String name);
}
