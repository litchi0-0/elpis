const path = require('path');
const { sep } = path;


/*
*config loader
*@param {Object} app - Koa 实例
*
*配置加载区分 本地配置、测试配置、生产配置，通过env环境读取不同文件配置
*通过env.config 覆盖 default.config 加载到 app.config 中 
*目录下对应的config配置
*默认配置 config/config.default.js
*测试配置 config/config.beta.js
*生产配置 config/config.prod.js
*本地配置 config/config.local.js
*/



module.exports = (app) => {
    //找到config目录
    const configPath = path.resolve(app.baseDir, `.${sep}config`);

    //获取config.default.js
    let defaultConfig = {};
    try {
        defaultConfig = require(path.resolve(configPath, `.${sep}config.default.js`));
    } catch (e) {
        console.error('[exception] config.default.js not found');
    }

    //获取env.config
    let envConfig = {};
    try {
        if (app.env.isLocal()) {
            envConfig = require(path.resolve(configPath, `.${sep}config.local.js`));
        } else if (app.env.isBeta()) {
            envConfig = require(path.resolve(configPath, `.${sep}config.beta.js`));
        } else if (app.env.isProduction()) {
            envConfig = require(path.resolve(configPath, `.${sep}config.prod.js`));
        }
    } catch (e) {
        console.error('[exception] config.' + app.env.getEnv() + '.js not found');
    }

    //覆盖并加载config配置
    app.config = Object.assign({}, defaultConfig, envConfig);
    console.log(`[debug] app.config: ${JSON.stringify(app.config, null, 2)}`);

}
