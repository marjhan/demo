/**
 *  create by wyy on 2017/8/22
 */
function validateRes(value,type){
	switch (type)
	{
	case 'nameLen':
	  return testNameLen(value);
	  //break;
	case 'idCard':
	  return testIdCard(value);
	  //break;
	case 'card':
	  return testCard(value);
	  break;
	case 'tel':
	  return testMoblie(value);
	  //break;
	case 'longName':
		return testLongName(value);
	}
}
//验证身份信息
function testIdCard(value){
	var chrnum = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
	if(value){
		if(chrnum.test(value)){
			return true;
		}else{
			return '身份证信息不正确';
		}	
	}else{
		return '不能为空'
	}
	
}
function testLongName(value){
	var isChese = /[\u4E00-\u9FA5]/g.test(value);
	var isEng = /^[A-Za-z\s]+$/g.test(value);
	if(value){
		if((!isChese&&!isEng)||(isChese && value.length>21)||(isEng && value.length>64)){
		return '只能填入中文1-21，英文1-64';
		}else{
			return true;
		}
	}else{
		return '不能为空';
	}
}
//验证姓名
function testNameLen(value){
	if(value){
		if(value.length && value.length > 100){
			return '填入值太长';
		}else{
			return true;
		}
	}else{
		return '不能为空'
	}
}
//测试银行卡号是否符合规范
function testCard(value){
	if(value){
		var yhk = /^\d{16,21}$/;
		if(yhk.test(value)){
			return true;
		}else{
			return '银行卡号不正确';
		}
	}else{
		return '不能为空'
	}	
}
//测试手机号是否符合规范
function testMoblie(value){
	if(value){
		var mobile = /^1[3|4|5|7|8][0-9]{9}/;
		if(mobile.test(value)){
			return true;
		}else{
			return '请输入正确手机号';
		}
	}else{
		return '不能为空'
	}	
}
//function showErrorTip(type){
//	debugger;
//	switch (type)
//	{
//	case 'nameLen':
//	  dom.text('填入值太长')
//	  //break;
//	case 'idCard':
//	  dom.text('身份证信息不正确')
//	  //break;
//	case 2:
//	  x="Today it's Tuesday";
//	  break;
//	case 3:
//	  x="Today it's Wednesday";
//	  break;
//	case 4:
//	  x="Today it's Thursday";
//	  break;
//	case 5:
//	  x="Today it's Friday";
//	  break;
//	case 6:
//	  x="Today it's Saturday";
//	  break;
//	}
//}