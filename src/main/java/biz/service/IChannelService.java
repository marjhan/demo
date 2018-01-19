package biz.service;

import java.util.List;

import biz.domain.Channel;

/** 
* @author  xuzc
* @date 2018年1月14日 上午12:37:59 
* @version 1.0 
* @parameter  
* @since  
* @return  */
public interface IChannelService {
	
	List<Channel> queryChannelList();
	
	List<Channel> queryAllChannelList();
	
	int addChannel(Channel channel);
	
	int updateChannelStatus(Channel channel);

}
