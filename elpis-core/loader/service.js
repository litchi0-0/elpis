const glob = require('glob');
const path = require('path');
const { sep } = path;



/*
*service loader
*@param {Object} app - Koa 实例
*
*加载所有service,可以通过‘app.service.${目录}.${文件}’访问
*例子：
    app/service
    |
    | -- custon-module
        |
        | -- custom-service.js    

    =>app.service.customMoudle.customService

*/
module.exports = (app) => {
    //读取app/service/**/**.js文件 所有文件
    const servicePath = path.resolve(app.businessPath, `.${sep}service`);
    const fileList = glob.sync(path.resolve(servicePath, `.${sep}**${sep}**.js`));

    //遍历所有文件目录，把内容加载到app.service下
    const service = {};
    fileList.forEach(file => {
        //提取文件名称
        let name = path.resolve(file);
        //截取路径,例如：app/service/custom-module/custom-service.js -> custom-module/custom-service.js
        name = name.substring(name.lastIndexOf(`service${sep}`) + `service${sep}`.length, name.lastIndexOf('.'));
        //把‘-’统一改为驼峰式命名，例如：custom-module/custom-service.js -> customModule.customService
        name = name.replace(/[_-][a-z]/ig, (s) => s.substring(1).toUpperCase());

        //挂载service到app.service下
        let tempService = service;
        const names = name.split(sep);
        for (let i = 0, len = names.length; i < len; ++i) {
            if (i === len - 1) {
                const ServiceMoule = require(path.resolve(file))(app);
                tempService[names[i]] = new ServiceMoule();
            } else {
                if (!tempService[names[i]]) {
                    tempService[names[i]] = {};
                }
                tempService = tempService[names[i]];
            }
        }

    });
    app.service = service;

}
