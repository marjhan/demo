package biz.domain;

public class Role {
    /**
     * 角色id
     */
    private Integer roleId;

    /**
     * 角色
     */
    private String roleName;

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

    /**
     * 角色
     * @return role_name 角色
     */
    public String getRoleName() {
        return roleName;
    }

    /**
     * 角色
     * @param roleName 角色
     */
    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }
}