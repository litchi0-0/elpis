module.exports = (app) => {
    const BaseService = require('./base')(app);
    return class ProjectService extends BaseService {
        /*
        获取项目列表
        @param {Object} ctx - Koa 上下文
        */
        async getList() {
            // Implementation for fetching project list
            return [
                { name: 'Project 1', desc: '这是一个项目描述' },
                { name: 'Project 2', desc: '这是另一个项目描述' },
                { name: 'Project 3', desc: '这是第三个项目描述' },
            ];
        }
    };
}