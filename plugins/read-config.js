var config = require('../paths.json');

module.exports = function (getPro) {
    if(getPro){//是否获取判断是否是生产环境
        return config['isPro'];
    }
    return config[config['isPro']?'pro':'dev'];
}