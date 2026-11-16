module.exports = (app, router) => {
    // 
    const { project: ProjectController } = app.controller;
    //用户输入http://IP：port/VIEW/PAGE1j就能渲染换出对应的页面
    router.get('/api/project/list', ProjectController.getList.bind(ProjectController));


}