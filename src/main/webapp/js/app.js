require.config({
	baseUrl: "/",
	paths: {
		jquery: "js/vendor/jquery/jquery",
		"jquery.cookie": "js/vendor/jquery/jquery.cookie",
		ajaxfileupload: "js/vendor/ajaxfileupload",
		pager: "js/vendor/pager/avalon.pager",
		avalon: "js/vendor/avalon/avalon.shim",
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
		kindeditor: "js/vendor/kindeditor/kindeditor-min",
		zh_CN: "js/vendor/kindeditor/lang/zh_CN",
		datePicker:"js/vendor/My97DatePicker/WdatePicker"
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
		zh_CN: {
			deps: ["kindeditor"],
			exports: "zh_CN"
		},
		pager: {
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
		datePicker: {
			deps: ["jquery"],
			exports: "datePicker"
		}
	}
});