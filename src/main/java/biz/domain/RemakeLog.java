package biz.domain;

import java.util.Date;

public class RemakeLog {
    /**
     * 备注修改日志id
     */
    private Integer remakeLogId;

    /**
     * 备注修改日志
     */
    private String remakeLog;

    /**
     * 创建时间
     */
    private Date createTime;

    /**
     * 修改时间
     */
    private Date motifyTime;

    /**
     * 备注修改日志id
     * @return remake_log_id 备注修改日志id
     */
    public Integer getRemakeLogId() {
        return remakeLogId;
    }

    /**
     * 备注修改日志id
     * @param remakeLogId 备注修改日志id
     */
    public void setRemakeLogId(Integer remakeLogId) {
        this.remakeLogId = remakeLogId;
    }

    /**
     * 备注修改日志
     * @return remake_log 备注修改日志
     */
    public String getRemakeLog() {
        return remakeLog;
    }

    /**
     * 备注修改日志
     * @param remakeLog 备注修改日志
     */
    public void setRemakeLog(String remakeLog) {
        this.remakeLog = remakeLog;
    }

    /**
     * 创建时间
     * @return create_time 创建时间
     */
    public Date getCreateTime() {
        return createTime;
    }

    /**
     * 创建时间
     * @param createTime 创建时间
     */
    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    /**
     * 修改时间
     * @return motify_time 修改时间
     */
    public Date getMotifyTime() {
        return motifyTime;
    }

    /**
     * 修改时间
     * @param motifyTime 修改时间
     */
    public void setMotifyTime(Date motifyTime) {
        this.motifyTime = motifyTime;
    }
}