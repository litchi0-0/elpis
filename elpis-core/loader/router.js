const KoaRouter = require('koa-router');
const glob = require('glob');
const path = require('path');
const { sep } = path;


/*
*router loader
*@param {Object} app - Koa 实例
*
*解析所有 app/router-schema/*.js 文件，加载到KoaRouter实例中
*/





module.exports = (app) => {
    //找到路由文件路径
    const routerPath = path.resolve(app.businessPath, `.${sep}router`);
    //实例化KOaRouter
    const router = new KoaRouter();
    //注册所有路由
    const fileList = glob.sync(path.resolve(routerPath, `.${sep}**${sep}*.js`));
    fileList.forEach(file => {
        require(path.resolve(file))(app, router);
    });
    //路由兜底（健壮性）— 非根路径才重定向，避免死循环
    router.get('*', async (ctx, next) => {
        const home = app?.options?.homePage || '/';
        if (ctx.path !== '/' && ctx.path !== home) {
            ctx.status = 302;
            ctx.redirect(home);
        }
    });
    //路由注册到app上
    app.use(router.routes());
    app.use(router.allowedMethods());
}
