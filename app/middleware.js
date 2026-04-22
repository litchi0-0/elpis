const path = require('path');

module.exports = (app) => {
    const koaNunjucks2 = require('koa-nunjucks-2');

    app.use(koaNunjucks2({
        ext: 'tpl',
        path: path.resolve(process.cwd(), './app/public'),
        nunjucksConfig: {
            noCache: true,
            trimBlocks: true,
        },
    }));
}