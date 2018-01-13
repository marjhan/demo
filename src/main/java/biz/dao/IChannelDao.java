package biz.dao;

import java.util.List;

import biz.domain.Channel;

public interface IChannelDao {
    int deleteByPrimaryKey(Integer channelId);

    int insert(Channel record);

    int insertSelective(Channel record);

    Channel selectByPrimaryKey(Integer channelId);

    int updateByPrimaryKeySelective(Channel record);

    int updateByPrimaryKey(Channel record);
    
    List<Channel> queryChannelList();
}