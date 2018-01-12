package biz.domain;

/**
 * @author za
 * time：2017年9月26日 下午2:58:22
 */
public class ConsoleOperationDTO {
	
	/**
	 * 操作员id.
	 */
	private String operator_no;
	
	/**
	 * 操作员名称.
	 */
	private String operator_name;


	/**
	 * @return the operator_no
	 */
	public String getOperator_no() {
		return operator_no;
	}

	/**
	 * @param operator_no the operator_no to set
	 */
	public void setOperator_no(String operator_no) {
		this.operator_no = operator_no;
	}

	/**
	 * @return the operator_name
	 */
	public String getOperator_name() {
		return operator_name;
	}

	/**
	 * @param operator_name the operator_name to set
	 */
	public void setOperator_name(String operator_name) {
		this.operator_name = operator_name;
	}


}
