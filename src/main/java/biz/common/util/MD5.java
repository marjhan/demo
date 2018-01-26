package biz.common.util;

import java.math.BigInteger;
import java.security.MessageDigest;

public class MD5 {
    public static final String KEY_MD5 = "MD5";   
 
    public static  String  getResult(String inputStr) throws Exception
    {
        BigInteger bigInteger=null;
        
        String result = null;
 
        try {
         MessageDigest md = MessageDigest.getInstance(KEY_MD5);   
         byte[] inputData = inputStr.getBytes(); 
         md.update(inputData);   
         bigInteger = new BigInteger(md.digest());   
         result = BASE64.encryptBASE64(bigInteger.toString(16).getBytes()).replaceAll("\r\n", "");;
        } catch (Exception e) {e.printStackTrace();}   
        return result;
    }
 
    public static void main(String args[])
    {
        try {
             String inputStr = "000000";   
             String outputStr = getResult(inputStr);
             System.out.println(outputStr);
        } catch (Exception e) {
            e.printStackTrace();
        }
 
    }
 
}