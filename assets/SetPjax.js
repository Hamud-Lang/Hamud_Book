var pjax = new Pjax({
    selectors: [
        "head title",
        "head meta",
        "script[data-pjax]",
        ".chapter",
        "#search-wrapper",
        ".content",
        ".pjax-reload"
    ]
});

// 包含一些 Pjax 加载后需要重新执行的函数
function pjax_reload() {
    SetupGiscus(getCurrentLanguage(), getCurrentTheme());
}

// 监听 Pjax 完成后，重新加载上面的函数
document.addEventListener("pjax:complete", function () {
    pjax_reload();
});