package biz.action.common;

import java.security.KeyPair;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;

import biz.action.WebsiteBaseAction;
import biz.common.exception.BusinessException;
import biz.common.exception.exception.ExpConfig;
import biz.common.util.ErrcodeConstants;
import biz.common.util.ParamConstants;
import biz.common.util.RSAUtils;
import biz.session.provider.SessionProvider;

/**
 * 提供一些公共方法.
 * @author xuzc.
 * 
 */
public class CommonMethod extends WebsiteBaseAction{

	private static Logger logger = Logger.getLogger(CommonMethod.class);
	/**
	 * 对加密的密码进行解密.
	 * @param password 加密的密码.
	 * @return 解密后的密码.
	 */
	public static String getPassword(String password) {
		password = RSAUtils.decryptStringByJs(password);
		return password;
	}
	
	public static String getPassword(String password, HttpServletRequest request,HttpServletResponse response, SessionProvider sessionProvider) {
		KeyPair keyPair = (KeyPair)sessionProvider.getAttribute(request, ParamConstants.KEYPAIR);
		if(keyPair == null) {
			logger.info("会话中未取得秘钥信息");
			throw new BusinessException(ErrcodeConstants.ERROR_CODE_10109506, ExpConfig.getExpMsg(ErrcodeConstants.ERROR_CODE_10109506));
		}
		password = RSAUtils.decryptString(keyPair.getPrivate(), password);
		if(StringUtils.isNotBlank(password)) {
			password = StringUtils.reverse(password);
		}
		return password;
	}
}
