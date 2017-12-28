package biz.domain;

public class LitsSource {
    /**
     * 名单来源id
     */
    private Integer listSourceId;

    /**
     * 名单来源
     */
    private String listSourceName;

    /**
     * 名单来源id
     * @return list_source_id 名单来源id
     */
    public Integer getListSourceId() {
        return listSourceId;
    }

    /**
     * 名单来源id
     * @param listSourceId 名单来源id
     */
    public void setListSourceId(Integer listSourceId) {
        this.listSourceId = listSourceId;
    }

    /**
     * 名单来源
     * @return list_source_name 名单来源
     */
    public String getListSourceName() {
        return listSourceName;
    }

    /**
     * 名单来源
     * @param listSourceName 名单来源
     */
    public void setListSourceName(String listSourceName) {
        this.listSourceName = listSourceName;
    }
}