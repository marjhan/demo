package biz.common.exception;

import java.io.InputStream;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import org.apache.log4j.Logger;
import org.dom4j.Document;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;

/**
 * 异常管理器.
 * 
 * @author xuzc
 * @version 1.0 2014-3-11
 * @since 1.0
 */
public class ExpConfig {
	/**
	 * 日志.
	 */
	static Logger logger = Logger.getLogger(ExpConfig.class);
	/**
	 * .
	 */
	private static Map<String, String> expMap;
	/**
	 * .
	 */
	public static final String filePath1 = "/exceptionInfo.xml";
	/**
	 * 单例对象.
	 */
	private static ExpConfig config;

	/**
	 * 单例方法.
	 * 
	 * @return 返回
	 */
	public static ExpConfig getInstance() {
		if (config == null) {
			config = new ExpConfig();
		}
		return config;
	}

	static {
		if (expMap == null) {
			expMap = new HashMap<String, String>();
		}
	}

	/**
	 * 初始化.
	 */
	public void init() {
		initExpFile(filePath1);
	}

	/**
	 * 
	 * 初始化文件.
	 * 
	 * @param filePath
	 *            文件路径
	 */
	@SuppressWarnings("unchecked")
	private void initExpFile(String filePath) {
		try {
			InputStream input = this.getClass().getResourceAsStream(filePath);
			if (input != null) {
				SAXReader sa = new SAXReader();
				Document doc = sa.read(input);
				Element root = doc.getRootElement();
				Iterator<Element> iterModes = root.elementIterator(ExpConstants.EXCEPTION_MODEL);
				while (iterModes.hasNext()) {
					Element eleMode = (Element) iterModes.next();
					String errorCode = eleMode.attributeValue(ExpConstants.ERROR_CODE);
					String errorInfo = eleMode.attributeValue(ExpConstants.ERROR_INFO);
					expMap.put(errorCode, errorInfo);
				}
			}
		} catch (Exception e) {
			logger.error("初始化失败",e);
		}
	}

	/**
	 * 
	 * 获取异常信息.
	 * 
	 * @param name
	 *            key值
	 * @return 返回
	 */
	public static String getExpMsg(String name) {
		return expMap.get(name);
	}

}
