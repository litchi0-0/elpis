module.exports = (app, router) => {
    // 
    const { view: ViewController } = app.controller;
    //用户输入http://IP：port/VIEW/PAGE1j就能渲染换出对应的页面
    router.get('/view/:page', ViewController.renderPage.bind(ViewController));


}