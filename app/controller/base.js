module.exports = (app) =>
    class BaseController {
        /**
         * controller基类
         * 统一处理controller的公共方法
         */

        constructor() {
            this.app = app;
            this.config = app.config;
        }
        /**
         *api  处理成功时统一返回结构
         * @param {Object} ctx - Koa 上下文
         * @param {Object} data - 返回数据
         * @param {Object} metadata - 元数据
         */
        success(ctx, data = {}, metadata = {}) {
            ctx.status = 200;
            ctx.body = {
                success: true,
                data,
                metadata
            }
        }

        /**
         * api  处理失败时统一返回结构
         * @param {Object} ctx - Koa 上下文
         * @param {Object} message - 错误信息
         * @param {Object} code - HTTP 状态码
         */
        fail(ctx, message, code) {
            ctx.body = {
                success: false,
                message,
                code
            }
        }
    }
