package biz.common.util;
import sun.misc.BASE64Decoder;
import sun.misc.BASE64Encoder;

public class BASE64 {
    /**  
     * BASE64解密  
     *   
     * @param key  
     * @return  
     * @throws Exception  
     */  
    @SuppressWarnings("restriction")
	public static byte[] decryptBASE64(String key) throws Exception {   
        return (new BASE64Decoder()).decodeBuffer(key);   
    }   
 
    /**  
     * BASE64加密  
     *   
     * @param key  
     * @return  
     * @throws Exception  
     */  
    @SuppressWarnings("restriction")
	public static String encryptBASE64(byte[] key) throws Exception {   
        return (new BASE64Encoder()).encodeBuffer(key);   
    }  
 
}