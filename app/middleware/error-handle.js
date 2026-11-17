/**
 * 运行时异常错误处理，兜底所有异常
 * @param {object} app - Koa实例
 */
module.exports = (app) => {
    return async (ctx, next) => {
        try {
            await next();
        } catch (err) {
            // 记录异常日志
            const{status,message,detail}= err;

            app.logger.info(JSON.stringify(err));
            app.logger.error('[--expection--',err);
            app.logger.error('[--expection--',status,message,detail);

            if(message&&message.includes('template not found') > 1 ){
                //页面重定向
                ctx.status = 302;//临时重定向
                ctx.redirect(`${app.options?.homePage}`);
                return;
            }


            const resBody={
                success:false,
                code:50000,
                message:'网络异常'
            }
            ctx.body = resBody;
            ctx.status = 200;
        }
    }


}