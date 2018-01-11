package biz.common.exception;

public class RemotingServiceException extends BaseException {
	private static final long serialVersionUID = 1L;
	private String errorPathInfo;

	public RemotingServiceException(String errorNo, String errorInfo) {
		super(errorNo);
		this.setErrorMessage(errorInfo);
	}

	public RemotingServiceException(int returnCode, String errorNo, String errorInfo) {
		super(errorNo);
		this.setErrorMessage(errorInfo);
	}

	public RemotingServiceException(String errorNo, String errorInfo, String errorPathInfo) {
		super(errorNo);
		this.setErrorMessage(errorInfo);
		this.errorPathInfo = errorPathInfo;
	}

	public RemotingServiceException(int returnCode, String errorNo, String errorInfo, String errorPathInfo) {
		super(errorNo);
		this.setErrorMessage(errorInfo);
		this.errorPathInfo = errorPathInfo;
	}

	public String getErrorInfo() {
		return this.getMessage();
	}

	public String getErrorMessage() {
		return this.getMessage();
	}

	public String getErrorNo() {
		return this.getErrorCode();
	}

	public String getErrorPathInfo() {
		return this.errorPathInfo;
	}
}