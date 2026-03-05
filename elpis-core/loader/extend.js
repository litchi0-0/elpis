
const glob = require('glob');
const path = require('path');
const { sep } = path;



/*
*extend loader
*@param {Object} app - Koa 实例
*
*加载所有extend,可以通过‘app.extend.${目录}.${文件}’访问
*例子：
    app/extend
    |
    | -- custon-module
        |
        | -- custom-extend.js    

    =>app.extend.customMoudle.customExtend

*/
module.exports = (app) => {
    //读取app/extend/**/**.js文件 所有文件
    const extendPath = path.resolve(app.businessPath, `.${sep}extend`);
    const fileList = glob.sync(path.resolve(extendPath, `.${sep}**${sep}**.js`));

    //遍历所有文件目录，把内容加载到app.extend下
    fileList.forEach(file => {
        //提取文件名称
        let name = path.resolve(file);
        //截取路径,例如：app/extend/custom-module/custom-extend.js -> custom-module/custom-extend.js
        name = name.substring(name.lastIndexOf(`extend${sep}`) + `extend${sep}`.length, name.lastIndexOf('.'));
        //把‘-’统一改为驼峰式命名，例如：custom-module/custom-extend.js -> customModule.customExtend
        name = name.replace(/[_-][a-z]/ig, (s) => s.substring(1).toUpperCase());

        //过滤app已经存在的key
        for (const key in app) {
            if (key === name) {
                console.error(`[exception] extend ${name} already exists`);
                return;
            }
        }
        app[name] = require(path.resolve(file))(app);

    });

}
