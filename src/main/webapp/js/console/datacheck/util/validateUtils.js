/**
 * Created by dmb17192 on 17-08-05.
 */
!function(factory) {
    "function" == typeof define && define.amd ? 
    		define(["jquery", "jquery.validate"], factory) 
    		: "object" == typeof module && module.exports ? module.exports = factory(require("jquery")) : factory(jQuery)
} (function($) {
	$.validator.addMethod("chinese", function(value, element) {
		var chinese = /^[\u4e00-\u9fa5]+$/;
		return this.optional(element) || (chinese.test(value));
	}, "只能输入中文");
	
	$.validator.addMethod("isMobile", function(value, element) {
		var mobile = /^1[3|4|5|7|8][0-9]{9}/;
		return this.optional(element) || (mobile.test(value));
	}, "请输入正确手机号");

	$.validator.addMethod("idCard", function(value, element) {
		var chrnum = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
		return this.optional(element) || (chrnum.test(value));
	}, "身份证信息不正确");
	
	$.validator.addMethod("idBankCard", function(value, element) {
		var bc = /^\d{16,21}$/;
		return this.optional(element) || (bc.test(value));
	}, "银行卡号不正确");
	
	$.validator.addMethod("nameTooLen", function(value, element) {
		if(value){
			if(value.length && value.length > 255){
				return false;
			}
		}
		return true;
	}, "填入值太长");
	
	$.validator.addMethod("nameSymbol", function(value, element) {
		var patt1 = new RegExp("&");
		var result = patt1.test(value);
		if(result == true){
			return false;
		}
		return true;
	}, "不能包含字符&");
	
	
	
	
	
	
	
    return $.extend($.validator.messages, {
        required: "请输入必填字段",
        remote: "请修正此字段",
        email: "请输入有效的电子邮件地址",
        url: "请输入有效的网址",
        date: "请输入有效的日期",
        dateISO: "请输入有效的日期 (YYYY-MM-DD)",
        number: "请输入有效的数字",
        digits: "只能输入数字",
        creditcard: "请输入有效的信用卡号码",
        equalTo: "你的输入不相同",
        extension: "请输入有效的后缀",
        maxlength: $.validator.format("最多可以输入 {0} 个字符"),
        minlength: $.validator.format("最少要输入 {0} 个字符"),
        rangelength: $.validator.format("请输入长度在 {0} 到 {1} 之间的字符串"),
        range: $.validator.format("请输入范围在 {0} 到 {1} 之间的数值"),
        max: $.validator.format("请输入不大于 {0} 的数值"),
        min: $.validator.format("请输入不小于 {0} 的数值")
    }),
    $
});

