require.config({
	baseUrl: "/skyjoy",
	paths: {
		jquery: "js/vendor/jquery/jquery",
		jquery1: "js/console/datacheck/jquery-1.9.1.min",
		"jquery.cookie": "js/vendor/jquery/jquery.cookie",
		ajaxfileupload: "js/vendor/ajaxfileupload",
		pager: "js/vendor/pager/avalon.pager",
		avalon: "js/vendor/avalon/avalon.shim",
		avalon2: "js/vendor/avalon/avalon",
		validation: "js/vendor/avalon/avalon.validation",
		mmPromise: "js/vendor/avalon/mmPromise/mmPromise",
		mmRouter: "js/vendor/avalon/mmRouter",
		mmHistory: "js/vendor/avalon/mmHistory",
		text: "js/vendor/require/text",
		domReady: "js/vendor/require/domReady",
		css: "js/vendor/require/css",
		"jquery.easing": "js/vendor/jquery/jquery.easing.min",
		"jquery.fullPage": "js/vendor/jquery/jquery.fullPage.min",
		"jquery.blockUI": "js/vendor/jquery/jquery.blockUI.min",
		bcss:"cssmin/vendor/bootstrap/bootstrap.min.css",
		header: "js/common/header",
		marketHeader: "js/common/marketHeader",
		SuperSlide211:"js/vendor/superslide/jquery.SuperSlide.2.1.1",
		zclip:"js/vendor/zeroclipboard/jquery.zclip.min",
		commona: "common/methods_",
		stickUp: "js/doc/stickUp.min",
		bootstrap: "js/vendor/bootstrap/bootstrap.min",
		apiMenu: "js/common/apiMenu",
		stickUp: "js/doc/stickUp.min",
		echarts:"js/vendor/echarts/echarts",
		"jquery.validate":"js/console/datacheck/jquery-validate/jquery.validate",
		"jquery.actual":"js/vendor/jquery/jquery.actual",
		"common.validate":"js/console/datacheck/util/validateUtils",
		createTabUtils:"js/console/datacheck/util/createTabUtils",
		pagination:"js/console/datacheck/util/pagination",
		datePicker:"js/vendor/My97DatePicker/WdatePicker",
		IE7:"js/vendor/avalon/IE7",
		IE9:"js/vendor/avalon/IE9",
		json3:"js/vendor/avalon/json3",
		promise_avalon:"js/vendor/avalon/promise",
		modernizr_custom:"js/vendor/timeHover/modernizr-custom",
		mislider:"js/vendor/timeHover/mislider",
		validateRes:"js/console/datacheck/util/validateRes"
	},
	priority: ["text", "css"],
	shim: {
		jquery: {
			exports: "jQuery"
		},
		ajaxfileupload: {
			deps: ["jquery"],
			exports: "ajaxfileupload"
		},
		pager: {
			deps: ["avalon"],
			exports: "pager"
		},
		avalon: {
			exports: "avalon"
		},
		mmHistory: {
			exports: "mmHistory"
		},
		mmRouter: {
			exports: "mmRouter"
		},
		header: {
			exports: "header"
		},
		SuperSlide211:{
			deps: ['jquery'],
			exports: "SuperSlide211"
		},
		zclip:{
			deps: ['jquery'],
			exports: "zclip"
		}
	}
});