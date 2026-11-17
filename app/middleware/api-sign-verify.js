const md5 = require('md5');
/**
 * api签名验证中间件 
 *
 */

module.exports = (app) => {
    return async (ctx, next) => {
        //只处理API请求
        if (ctx.path.indexOf('/api/') < 0) {
            return await next();
        }
        const {path, method}= ctx;
        const {header}= ctx.request;
        const {s_sign:sSign,s_t:st}= header;

        const signKey = 'fdsafdsafaeadfaeghaogh';
        const signature = md5(`${signKey}_${st}`);
        app.logger.info(`[${method} ${path}] signature: ${signature}`);

        if(!sSign || !st || signature !== sSign.toLowerCase()|| (Date.now() - st) > 600 * 1000){
            

            ctx.status = 200;
            ctx.body = { 
                code: 445,
                success: false,
                message: 'Invalid signature' };
            return;
        }

        await next();
    }
}