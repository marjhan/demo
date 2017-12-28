package biz.domain;

public class Channel {
    /**
     * 渠道id
     */
    private Integer channelId;

    /**
     * 渠道名称
     */
    private String channelName;

    /**
     * 渠道id
     * @return channel_id 渠道id
     */
    public Integer getChannelId() {
        return channelId;
    }

    /**
     * 渠道id
     * @param channelId 渠道id
     */
    public void setChannelId(Integer channelId) {
        this.channelId = channelId;
    }

    /**
     * 渠道名称
     * @return channel_name 渠道名称
     */
    public String getChannelName() {
        return channelName;
    }

    /**
     * 渠道名称
     * @param channelName 渠道名称
     */
    public void setChannelName(String channelName) {
        this.channelName = channelName;
    }
}