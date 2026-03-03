const Koa = require('koa');
const console = require('node:console');

//Koa 实例
const app = new Koa();

//启动服务
try {
    const port = process.env.PORT || 8080;
    const host = process.env.IP || '0.0.0.0';
    app.listen(port, host);
    // 使用反引号 `
    console.log(`Server running on port: ${port}`);
} catch (e) {
    console.error(e);
}
