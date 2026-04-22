module.exports = (app) => {
    // 获取环境变量并去除可能存在的引号
    const envStr = (process.env._ENV || 'local').replace(/['"]/g, '');

    return {
        // 判断是否本地环境
        isLocal() {
            return envStr === 'local';
        },

        // 判断是否测试环境
        isBeta() {
            return envStr === 'beta';
        },
        // 判断是否生产环境
        isProduction() {
            return envStr === 'production' || envStr === 'prod';
        },
        //获取当前环境
        getEnv() {
            return envStr;
        }
    }
}