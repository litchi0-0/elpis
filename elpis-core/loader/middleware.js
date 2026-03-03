const glob = require('glob');
const path = require('path');
const { sep } = path;



/*
*middleware loader
*@param {Object} app - Koa 实例
*
*加载所有middleware,可以通过‘app.middleware.${目录}.${文件}’访问
*例子：
    app/middleware
    |
    | -- custon-module
        |
        | -- custom-middleware.js    

    =>app.middlewares.customMoudle.customMiddleware

*/
module.exports = (app) => {
    //读取app/middleware/**/**.js文件 所有文件
    const middlewarePath = path.resolve(app.businessPath, `.${sep}middleware`);
    const fileList = glob.sync(path.resolve(middlewarePath, `.${sep}**${sep}**.js`));

    //遍历所有文件目录，把内容加载到app.middlewares下
    const middlewares = {};
    fileList.forEach(file => {
        //提取文件名称
        let name = path.resolve(file);
        //截取路径,例如：app/middleware/custom-module/custom-middleware.js -> custom-module/custom-middleware.js
        name = name.substring(name.lastIndexOf(`middleware${sep}`) + `middleware${sep}`.length, name.lastIndexOf('.'));
        //把‘-’统一改为驼峰式命名，例如：custom-module/custom-middleware.js -> customModule.customMiddleware
        name = name.replace(/[_-][a-z]/ig, (s) => s.substring(1).toUpperCase());

        //挂载middleware到app.middlewares下
        let tempMiddleware = middlewares;
        const names = name.split(sep);
        for (let i = 0, len = names.length; i < len; ++i) {
            if (i === len - 1) {
                tempMiddleware[names[i]] = require(path.resolve(file))(app);
            } else {
                if (!tempMiddleware[names[i]]) {
                    tempMiddleware[names[i]] = {};
                }
                tempMiddleware = tempMiddleware[names[i]];
            }
        }

    });
    app.middlewares = middlewares;

}
