const superagent = require('superagent');
module.exports = (app) => class BaseService {
    /*
    基础服务类
    @param {Object} app - 应用实例
    */
    constructor() {
        this.app = app;
        this.config = app.config;
        this.curl = superagent;
    }
};