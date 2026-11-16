module.exports = (app) => {
    return class ProjectController {
        /*
        获取项目列表
        @param {Object} ctx - Koa 上下文
        */
        async getList(ctx) {
            // Implementation for fetching project list
            const { project: projectService } = app.service;
            const res = await projectService.getList();
            ctx.status = 200;
            ctx.body = {
                success: true,
                data: res,
                metadata: {}
            };
        }
    };
}