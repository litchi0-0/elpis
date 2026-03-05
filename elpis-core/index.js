const Koa = require('koa');
const path = require('path');
const { sep } = path;
const env = require('./env');

const middlewareLoader = require('./loader/middleware');
const routerLoader = require('./loader/router');
const routerSchemaLoader = require('./loader/router-schema');
const controllerLoader = require('./loader/controller');
const serviceLoader = require('./loader/service');
const configLoader = require('./loader/config');
const extendLoader = require('./loader/extend');

module.exports = {
    /**
     * 启动服务
     * @param {Object} options - 服务配置
     * @param {number} options.port - 服务端口
     * @param {string} options.host - 服务主机
     */
    start(options = {}) {
        //Koa 实例
        const app = new Koa();

        //配置
        app.options = options;

        //环境
        app.env = env();
        console.log(`--[start] env:${app.env.getEnv()}--`);

        //基础路径
        app.baseDir = process.cwd();

        //业务路径
        app.businessPath = path.resolve(app.baseDir, `.${sep}app`);

        //加载中间件
        middlewareLoader(app);
        console.log(`--[start] middlewareLoader--`);

        //加载路由schema
        routerSchemaLoader(app);
        console.log(`--[start] routerSchemaLoader--`);


        //加载控制器
        controllerLoader(app);
        console.log(`--[start] controllerLoader--`);


        //加载服务
        serviceLoader(app);
        console.log(`--[start] serviceLoader--`);

        //加载配置
        configLoader(app);
        console.log(`--[start] configLoader--`);

        //加载扩展  
        extendLoader(app);
        console.log(`--[start] extendLoader--`);

        //注册中间件
        try {
            require(`${app.businessPath}${sep}middleware.js`)(app);
            console.log(`--[start] load global middleware.js done--`);
        } catch (error) {
            console.error(`[exception] global middleware.js not found`);
        }



        //注册路由
        routerLoader(app);
        console.log(`--[start] routerLoader--`);

        //启动服务
        try {
            const port = process.env.PORT || 8080;
            const host = process.env.IP || '0.0.0.0';
            app.listen(port, host);
            // 使用反引号 `
            console.log(`Server running on port: ${port}`);
        } catch (e) {
            console.error(e);
        }

    }
}





