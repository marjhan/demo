package biz.web.url;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * @author xuzc
 * @date 2017年12月28日 下午4:52:05
 * @version 1.0
 * @parameter
 * @since
 * @return
 */
public abstract class URLBrokerInitHelper {

	protected final Logger logger = LoggerFactory.getLogger(URLBrokerInitHelper.class);

	protected URLBroker[] brokers;

	public URLBroker[] getBrokers() {
		return brokers;
	}

	public void setBrokers(URLBroker[] brokers) {
		this.brokers = brokers;
	}

	public void setBroker(URLBroker broker) {
		this.brokers = new URLBroker[] { broker };
	}

}