package biz.domain;

import java.util.Date;

public class User {
    /**
     * 用户id
     */
    private Integer userId;

    /**
     * 用户名
     */
    private String userName;

    /**
     * 密码
     */
    private String passWord;

    /**
     * 真实姓名
     */
    private String realName;

    /**
     * 创建时间
     */
    private Date createTime;

    /**
     * 修改时间
     */
    private Date motifyTime;

    /**
     * 用户状态
     */
    private String userStatus;

    /**
     * 角色id
     */
    private Integer roleId;

    /**
     * 用户id
     * @return user_id 用户id
     */
    public Integer getUserId() {
        return userId;
    }

    /**
     * 用户id
     * @param userId 用户id
     */
    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    /**
     * 用户名
     * @return user_name 用户名
     */
    public String getUserName() {
        return userName;
    }

    /**
     * 用户名
     * @param userName 用户名
     */
    public void setUserName(String userName) {
        this.userName = userName;
    }

    /**
     * 密码
     * @return password 密码
     */
    public String getPassWord() {
        return passWord;
    }

    /**
     * 密码
     * @param password 密码
     */
    public void setPassWord(String passWord) {
        this.passWord = passWord;
    }

    /**
     * 真实姓名
     * @return real_name 真实姓名
     */
    public String getRealName() {
        return realName;
    }

    /**
     * 真实姓名
     * @param realName 真实姓名
     */
    public void setRealName(String realName) {
        this.realName = realName;
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

    /**
     * 用户状态
     * @return user_status 用户状态
     */
    public String getUserStatus() {
        return userStatus;
    }

    /**
     * 用户状态
     * @param userStatus 用户状态
     */
    public void setUserStatus(String userStatus) {
        this.userStatus = userStatus;
    }

    /**
     * 角色id
     * @return role_id 角色id
     */
    public Integer getRoleId() {
        return roleId;
    }

    /**
     * 角色id
     * @param roleId 角色id
     */
    public void setRoleId(Integer roleId) {
        this.roleId = roleId;
    }
}