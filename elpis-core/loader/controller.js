const glob = require('glob');
const path = require('path');
const { sep } = path;



/*
*controller loader
*@param {Object} app - Koa 实例
*
*加载所有controller,可以通过‘app.controller.${目录}.${文件}’访问
*例子：
    app/controller
    |
    | -- custon-module
        |
        | -- custom-controller.js    

    =>app.controller.customMoudle.customController

*/
module.exports = (app) => {
    //读取app/controller/**/**.js文件 所有文件
    const controllerPath = path.resolve(app.businessPath, `.${sep}controller`);
    const fileList = glob.sync(path.resolve(controllerPath, `.${sep}**${sep}**.js`));

    //遍历所有文件目录，把内容加载到app.controller下
    const controller = {};
    fileList.forEach(file => {
        //提取文件名称
        let name = path.resolve(file);
        //截取路径,例如：app/controller/custom-module/custom-controller.js -> custom-module/custom-controller.js
        name = name.substring(name.lastIndexOf(`controller${sep}`) + `controller${sep}`.length, name.lastIndexOf('.'));
        //把‘-’统一改为驼峰式命名，例如：custom-module/custom-controller.js -> customModule.customController
        name = name.replace(/[_-][a-z]/ig, (s) => s.substring(1).toUpperCase());

        //挂载controller到app.controller下
        let tempController = controller;
        const names = name.split(sep);
        for (let i = 0, len = names.length; i < len; ++i) {
            if (i === len - 1) {
                const ControllerMoule = require(path.resolve(file))(app);
                tempController[names[i]] = new ControllerMoule();
            } else {
                if (!tempController[names[i]]) {
                    tempController[names[i]] = {};
                }
                tempController = tempController[names[i]];
            }
        }

    });
    console.log(controller)
    app.controller = controller;

}
