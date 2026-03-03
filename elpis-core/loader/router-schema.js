const glob = require('glob');
const path = require('path');
const { sep } = path;



/*
*router-schema loader
*@param {Object} app - Koa 实例
*
*通过 ’json-schema & ajv’对api规则进行约束，配合api-params-verify中间件使用
*例子
    app/router-schema/**.js 
    输出：
        app.rouSchema={
        '${api1}':{jsonSchema},
        '${api2}':{jsonSchema},
        '${api3}':{jsonSchema},
        '${api4}':{jsonSchema},
        }
*
*/
module.exports = (app) => {
    //读取app/router-schema/**/**.js文件 所有文件
    const routerSchemaPath = path.resolve(app.businessPath, `.${sep}router-schema`);
    const fileList = glob.sync(path.resolve(routerSchemaPath, `.${sep}**${sep}**.js`));

    //注册所有 routerSchema ,让‘app.routerSchema'可以访问
    let routerSchema = {};
    fileList.forEach(file => {
        routerSchema = {
            ...routerSchema,
            ...require(path.resolve(file))
        }
    })
    app.routerSchema = routerSchema;
}
