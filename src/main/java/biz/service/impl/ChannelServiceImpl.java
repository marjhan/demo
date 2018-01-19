package biz.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import biz.dao.IChannelDao;
import biz.domain.Channel;
import biz.service.IChannelService;

/** 
* @author  xuzc
* @date 2018年1月14日 上午12:39:10 
* @version 1.0 
* @parameter  
* @since  
* @return  */
@Service
public class ChannelServiceImpl implements IChannelService{

	/** 渠道信息dao. */
	@Autowired
	private IChannelDao channelDao;

	@Override
	public List<Channel> queryChannelList() {
		return channelDao.queryChannelList();
	}

	@Override
	public List<Channel> queryAllChannelList() {
		return channelDao.queryAllChannelList();
	}

	@Override
	public int addChannel(Channel channel) {
		return channelDao.insertSelective(channel);
	}

	@Override
	public int updateChannelStatus(Channel channel) {
		return channelDao.updateByPrimaryKeySelective(channel);
	}

}
