const path = require('path');

module.exports = (app) => {
    //配置新目录
    const koaStatic = require('koa-static');
    app.use(koaStatic(path.resolve(process.cwd(), './app/public')));


    const koaNunjucks2 = require('koa-nunjucks-2');

    app.use(koaNunjucks2({
        ext: 'tpl',
        path: path.resolve(process.cwd(), './app/public'),
        nunjucksConfig: {
            noCache: true,
            trimBlocks: true,
        },
    }));


    ///引用 ctx.body 解析中间件
    const bodyParser = require('koa-bodyparser');
    app.use(bodyParser({
        formLimit: '1000mb',    
        enableTypes: ['json', 'form', 'text'],
    }));
}