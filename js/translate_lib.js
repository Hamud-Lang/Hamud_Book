function initTranslate() {
    try{
        translate.service.use('client.edge');
        translate.listener.start();
        translate.setAutoDiscriminateLocalLanguage();
        translate.language.setUrlParamControl();
        translate.ignore.class.push('notTranslate');
        translate.execute();
    }
    catch(e){console.log('翻译系统出错：' + e);}
}

window.addEventListener('load', initTranslate);