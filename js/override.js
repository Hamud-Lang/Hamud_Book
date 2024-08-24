(function () {
    // Darkmode 集成
    let darkmode;
    //// 初始化 Darkmode
    function initDarkmode() {
        try {
            const Darkmode = window.Darkmode || function () { };
            darkmode = new Darkmode();
            darkmode.showWidget();
        }
        catch (e) {
            console.log('Darkmode 出错：' + e);
        }
    }

    // giscus 评论系统
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
            case "catalan":
                giscus_lang = "ca";
                break;
            case "danish":
                giscus_lang = "da";
                break;
            case "deutsch":
                giscus_lang = "de";
                break;
            case "persian":
                giscus_lang = "fa";
                break;
            case "greek":
                giscus_lang = "gr";
                break;
            case "serbian":
                giscus_lang = "hbs";
                break;
            case "hebrew":
                giscus_lang = "he";
                break;
            case "hungarian":
                giscus_lang = "hu";
                break;
            case "italian":
                giscus_lang = "it";
                break;
            default:
                giscus_lang = "zh-CN";
                break;
        }
        return giscus_lang;
    }

    var SetupGiscus = function (giscus_lang) {
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
            script.setAttribute("data-theme", 'light_high_contrast');
            script.setAttribute("data-lang", giscus_lang);

            script.crossOrigin = "anonymous";
            script.async = true;

            document.getElementById("giscus-container").appendChild(script);
        }
    }

    function includeHTML() {
        var elements = document.getElementsByTagName("include");
        for (var i = 0; i < elements.length; i++) {
            var element = elements[i];
            var file = element.getAttribute("src");
            if (file) {
                var xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange = function () {
                    if (this.readyState === 4 && this.status === 200) {
                        element.innerHTML = this.responseText;
                        // 执行加载的JavaScript代码
                        var scripts = element.getElementsByTagName("script");
                        for (var j = 0; j < scripts.length; j++) {
                            var script = document.createElement("script");
                            script.innerHTML = scripts[j].innerHTML;
                            document.body.appendChild(script);
                        }
                    }
                };
                xhttp.open("GET", file, true);
                xhttp.send();
            }
        }
    }

    // translate-js 翻译系统
    function initTranslate() {
        try {
            translate.service.use('client.edge');
            translate.listener.start();
            translate.language.setLocal('chinese_simplified');
            translate.setAutoDiscriminateLocalLanguage();
            translate.language.setUrlParamControl();
            translate.ignore.class.push('notTranslate');
            translate.nomenclature.append('chinese_simplified', 'english', `
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
        catch (e) {
            console.log('翻译系统出错：' + e);
        }
    }


    var loadingBar = document.querySelector(".loading-bar");
    var progress = document.querySelector(".loading-bar .progress");
    var timer = null;

    function initAni() {
        loadingBar = document.querySelector(".loading-bar");
        progress = document.querySelector(".loading-bar .progress");
    }

    function endLoad() {
        clearInterval(timer);
        progress.style.width = "100%";
        loadingBar.classList.remove("loading");

        setTimeout(function () {
            progress.style.width = 0;
        }, 400);
    }


    // PJAX 集成
    let pjax;
    //// 初始化 PJAX
    function initPjax() {
        try {
            const Pjax = window.Pjax || function () { };
            pjax = new Pjax({
                selectors: [
                    'head title',
                    '.container',
                    '[data-pjax]',
                    '.pjax-reload'
                ],
                cacheBust: false
            })
        }
        catch (e) {
            console.log('PJAX 出错：' + e);
        }
    }


    // 初始化
    function initialize() {
        initPjax();	 //// 初始化 PJAX
        initDarkmode();    //// 初始化 Darkmode
        includeHTML();    //// 引入
        initTranslate();	//// 初始化页面翻译
        initAni();    //// 初始化加载动画
        SetupGiscus(getCurrentLanguage());   //// 初始化评论系统
    }


    // 触发器
    //// 网页加载完毕后触发
    window.addEventListener('DOMContentLoaded', () => initialize());
    //// 翻译执行完成后触发
    translate.listener.renderTaskFinish = function () {
        SetupGiscus(getCurrentLanguage());
    }
    //// Pjax 开始时执行的函数
    document.addEventListener("pjax:send", function () {
        var loadingBarWidth = 20;
        var MAX_LOADING_WIDTH = 95;

        loadingBar.classList.add("loading");
        progress.style.width = loadingBarWidth + "%";

        clearInterval(timer);
        timer = setInterval(function () {
            loadingBarWidth += 3;

            if (loadingBarWidth > MAX_LOADING_WIDTH) {
                loadingBarWidth = MAX_LOADING_WIDTH;
            }

            progress.style.width = loadingBarWidth + "%";
        }, 500);
    });
    //// 监听 Pjax 完成后，重新加载的函数
    document.addEventListener("pjax:complete", function () {
        SetupGiscus(getCurrentLanguage());
        includeHTML();
        endLoad();
    })
})();
