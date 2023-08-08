// 若当前 mdbook 主题为 Light 或 Rust ，则将 giscuz 主题设置为 light
var theme = "transparent_dark";
const themeClass = document.getElementsByTagName("html")[0].className;
if (themeClass.indexOf("light") != -1 || themeClass.indexOf("rust") != -1) {
    theme = "light"
}

var giscus = function () {
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
	script.setAttribute("data-lang", "zh-CN");

	script.crossOrigin = "anonymous";
	script.async = true;
	document.getElementById("giscus-container").appendChild(script);
};

window.addEventListener('load', giscus);
