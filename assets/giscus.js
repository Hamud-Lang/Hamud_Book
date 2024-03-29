// 若当前 mdbook 主题为 Light 或 Rust ，则将 giscus 主题设置为 light
const getCurrentTheme = function () {
	var theme = "transparent_dark";
	const themeClass = document.getElementsByTagName("html")[0].className;
	if (themeClass.indexOf("light") != -1 || themeClass.indexOf("rust") != -1) {
		theme = "light"
	}
	return theme;
}

// 获取用户使用的语种。
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
};

var SetupGiscus = function (giscus_lang, theme) {
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
	// script.setAttribute("data-loading", "lazy");

	script.crossOrigin = "anonymous";
	script.async = true;
	if (document.getElementById("giscus-container") != null) {
		document.getElementById("giscus-container").appendChild(script);
	}
};

window.addEventListener('load', () => SetupGiscus(getCurrentLanguage(), getCurrentTheme()));
