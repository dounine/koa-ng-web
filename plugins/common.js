const path = require('path');

module.exports = function () {

    this.getHtmlPath = function (moduleName,htmlPath) {
        return path.resolve('modules/static/' + moduleName + '/app/html/rev') +'/'+ htmlPath;
    }

    return this;
}