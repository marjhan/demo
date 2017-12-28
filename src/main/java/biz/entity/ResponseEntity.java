package biz.entity;

import java.io.Serializable;


/**
 *统一返回实体类
 */
public class ResponseEntity implements Serializable {

    /**
	 * 
	 */
	private static final long serialVersionUID = 1905122041950251207L;


	/**
	 * 
	 */


	public ResponseEntity(){

    }

    public ResponseEntity(boolean success,Object data){
        this.success = success;
        this.data = data;
    }

    private boolean success;

    private Object data;


    public boolean isSuccess() {
        return success;
    }

    public void setSuc(boolean success) {
        this.success = success;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }

}
