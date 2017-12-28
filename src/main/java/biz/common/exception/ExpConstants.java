package biz.common.exception;

/**
 * 异常编码定义.
 * 
 * @author chenhl
 * @version 1.0 2014-3-11
 * @since 1.0
 */
public class ExpConstants {
	/** 异常配置文常量 start */
	/**
	 * .
	 */
	public static final String EXCEPTION_MODEL = "exception";
	/**
	 * .
	 */
	public static final String ERROR_CODE = "errorCode";
	/**
	 * .
	 */
	public static final String ERROR_INFO = "errorInfo";
	/** 异常配置文常量 end */

	
	/**
	 * 
	 * user用户中心 101 
	 * order 102 
	 * product 103 
	 * clearing 104 
	 * cooper 105 
	 * charing 106
	 * game 107 
	 * analyze 108 
	 * score 109
	 * 
	 * 第4、5位代表业务对象
	 *  第6位代表操作类型：1-增、2-删、3-改、4-查
	 *  第7位第8位:序号
	 *  业务对象说明： 例用户中心，可分为用户01、发票02、地址03等
	 *  例： 密码错误 可定义错误号 101（模块编号）01（业务对象）4（操作类型）01（序号）
	 *  
	 * 控台： boss-console 201
	 * 爱腾网接入 ： itn-teng-front 202
	 * 决战股海接入 ： stockwin-front 203
	 *    
	 */
	
	/**
	 *   20300000公用
	 */
	/**
	 * 匿名码格式不合法
	 */
	public static final String Formatnotvalid = "20300001";
	

	/**
	 *  20301000 front 层游戏
	 */
	/*
	 * 无法获取用户信息
	 */
	public static final String UserNotFind = "20301000";

	/*
	 * 必须先开始游戏
	 */
	public static final String MUSTBEGIN = "20301001";
	
	/**
	 * 生命值不足
	 */
	public static final String LifeNotHave = "20301002";
	
	/**
	 * 后台数据异常
	 */
	public static final String GameDateNull = "20301003";
	
	/**
	 *  20302000 front 层 积分
	 */
	
	/**
	 * 积分不足
	 */
	public static final String Lackofintegral = "20302000";
	/**
	 * 无法获取奖品信息.
	 */
	public static final String PrizeNotfind = "20302001";
	
	
	/**
	 * 手机号码格式不正确.
	 */
	public static final String Mobile_Format_Wrong = "20302002";
	
	/**
	 * prize_id参数异常
	 */
	
	public static final String parameter_Format_Wrong = "20302005";
	
	
	/**
	 * 你还没有获取手机验证码
	 */
	
	public static final String nothaveget = "20302003";
	
	/**
	 * 图片验证失败
	 */
	
	public static final String imageiserror = "20302004";
}
