(function() {
	// giscus 评论系统
	//// 若当前 mdbook 主题为 Light 或 Rust ，则将 giscus 主题设置为 light
	const getCurrentTheme = function () {
		var theme = "transparent_dark";
		const themeClass = document.getElementsByTagName("html")[0].className;
		if (themeClass.indexOf("light") != -1 || themeClass.indexOf("rust") != -1) {
			theme = "light";
		}
		return theme;
	}

	//// 获取用户使用的语种并转换为 giscus 可识别的标记
	const getCurrentLanguage = function () {
		var lang = translate.language.getCurrent();
		var giscus_lang = "zh-CN";
		switch (lang) {
			case "chinese_traditional":
				giscus_lang = "zh-TW";
				break;
			case "english":
				giscus_lang = "en";
				break;
			case "spanish":
				giscus_lang = "es";
				break;
			case "japanese":
				giscus_lang = "ja";
				break;
			case "korean":
				giscus_lang = "ko";
				break;
			case "french":
				giscus_lang = "fr";
				break;
			case "arabic":
				giscus_lang = "ar";
				break;
			default:
				giscus_lang = "zh-CN";
				break;
		}
		return giscus_lang;
	}

	var SetupGiscus = function (giscus_lang, theme) {
		if (document.getElementById("giscus-container") != null) {
			const script = document.createElement("script");
			script.type = "text/javascript";
			script.src = "https://giscus.app/client.js";


			script.setAttribute("data-repo", "Hamud-Lang/Hamud_Book");
			script.setAttribute("data-repo-id", "R_kgDOKAX-uw");
			script.setAttribute("data-category", "Announcements");
			script.setAttribute("data-category-id", "DIC_kwDOKAX-u84CYRSk");

			script.setAttribute("data-mapping", "title");
			script.setAttribute("data-strict", "1");
			script.setAttribute("data-reactions-enabled", "1");
			script.setAttribute("data-emit-metadata", "0");
			script.setAttribute("data-input-position", "top");
			script.setAttribute("data-theme", theme);
			script.setAttribute("data-lang", giscus_lang);

			script.crossOrigin = "anonymous";
			script.async = true;

			document.getElementById("giscus-container").appendChild(script);
		}
	}

	// translate-js 翻译系统
	function initTranslate() {
		try{
			translate.service.use('client.edge');
			translate.listener.start();
			translate.language.setLocal('chinese_simplified');
			translate.setAutoDiscriminateLocalLanguage();
			translate.language.setUrlParamControl();
			translate.ignore.class.push('notTranslate');
			translate.nomenclature.append('chinese_simplified','english',`
				哈姆语言之书=Hamud Book
				哈姆语=the language of Hamud
				哈姆德=the Hamud
				哈姆人=hamud
				哈姆=Hamud
				哈约·姆经=Hamud the Bible
				哈经·姆约=Hamud the Bible
				哈经=Hamud
				姆约=the Bible
				哈约=the Byble
			`);
			translate.execute();
		}
		catch(e){
			console.log('翻译系统出错：' + e);
		}
	}


	// PJAX 集成
	let pjax;
	//// 初始化 PJAX
	function initPjax(){
		try{
			const Pjax = window.Pjax || function() {};
			pjax = new Pjax({
				selectors: [
					"head title",
					"head meta",
					"script[data-pjax]",
					".chapter",
					".nav-chapters",
					"#search-wrapper",
					".content",
					".pjax-reload"
				]
			})
		}
		catch(e){
			console.log('PJAX 出错：' + e);
		}
	}


	// 初始化
	function initialize() {
		initPjax();	 //// 初始化 PJAX
		initTranslate();	//// 初始化页面翻译
		SetupGiscus(getCurrentLanguage(), getCurrentTheme());   //// 初始化评论系统
	}


	// 触发器
	//// 网页加载完毕后触发
	window.addEventListener('DOMContentLoaded', () => initialize());
	//// 翻译执行完成后触发
	translate.listener.renderTaskFinish = function() {
		SetupGiscus(getCurrentLanguage(), getCurrentTheme());
	}
	//// 监听 Pjax 完成后，重新加载上面的函数
	document.addEventListener("pjax:complete", function () {
		SetupGiscus(getCurrentLanguage(), getCurrentTheme());
	})
})();