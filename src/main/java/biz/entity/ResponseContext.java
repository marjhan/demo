package biz.entity;

/**
 * 统一返回内容.
 * @author luopeng12856.
 *
 */
public class ResponseContext {
/**
 * 统一返回内容.
 */
    private static ThreadLocal<ResponseEntity> context = new ThreadLocal<ResponseEntity>();
/**
 * 
 * @return 统一返回内容.
 */
    public static ResponseEntity getResponseEntity() {
        ResponseEntity responseEntity = getResponse();
        context.remove();
        return responseEntity;
    }
    /**
     * 
     * @param value 设置.
     * @return 统一返回内容.
     */
    public static ResponseEntity getResponseEntity(Object value) {
        setValue(value);
        return getResponseEntity();
    }
    /**
     * 
     * @return 统一返回内容.
     */
    private static ResponseEntity getResponse(){
        ResponseEntity responseEntity = context.get();
        if (responseEntity == null){
            responseEntity = new ResponseEntity(true,null);
            context.set(responseEntity);
        }
        return responseEntity;
    }

    /**
     * 
     * @param data 返回内容.
     */
    public static void setValue(Object data){
        getResponse().setSuc(true);
        getResponse().setData(data);
    }
/**
 * 统一返回.
 */
    public static void setValue(){
        getResponse().setSuc(false);
        getResponse().setData(null);
    }
    /**
     * 
     * @return  判断.
     */
    public static boolean isError(){
        return !getResponse().isSuccess();
    }
/**
 * 
 * @return 统一反返回.
 */
    public static ResponseEntity getResponsenull(){
    	 ResponseEntity responseEntity = new ResponseEntity(true, null);
    	return responseEntity;
    	
    }
}
