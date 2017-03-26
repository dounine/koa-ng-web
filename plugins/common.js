const path = require('path');
const fs = require('fs');

module.exports = function () {

    this.getHtmlPath = function (moduleName, htmlPath) {
        return path.resolve('modules/static/' + moduleName + '/app/html/rev') + '/' + htmlPath;
    }

    this.isDirectory =
        function (dir) {
            try {
                const stats = fs.statSync(dir)
                return stats.isDirectory()
            } catch (err) {
                return false
            }
        }

    this.fileExist = function (path) {
        try {
            fs.accessSync(path, fs.F_OK);
        } catch (e) {
            return false;
        }
        return true;
    }

    return this;
}