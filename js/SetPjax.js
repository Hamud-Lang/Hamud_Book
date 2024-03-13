var pjax = new Pjax({
    selectors: [
        "head meta",
        "head title",
        ".container",
        ".pjax-reload"
    ],
});

function pjax_reload() {
    includeHTML();
}

document.addEventListener("pjax:complete", function () {
    pjax_reload();
});