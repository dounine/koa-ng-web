const router = require('koa-router')();
const path = require('path');
const sendfile = require('koa-sendfile');
const service = require(path.resolve(__dirname, '..') + '/service/index.js');
const moduleName = path.basename(path.resolve(__dirname, '..'));
const paths = require(path.resolve('plugins/read-config.js'));
const common = require(path.resolve('plugins/common.js'))();
const fs = require('fs');

var routers = [];

module.exports = function (config) {

    function getFilenames(dir) {
        var files = []
        if (!common.isDirectory(dir)) {
            throw new Error(dir + ' is not a directory!')
        }
        fs.readdirSync(dir).forEach(function (filename) {
            var _dir = path.join(dir, filename, '/app/config/');
            if (isDirectory(_dir)) {
                var _files = getFilenames(_dir);
                for (var i in _files) {
                    var file = _files[i];
                    if (/.json$/.test(file) && common.fileExist(file)) {
                        files.push(file)
                    }
                }
            } else {
                const fullPath = path.join(dir, filename);
                if (/.json$/.test(fullPath) && common.fileExist(fullPath)) {
                    files.push(fullPath)
                }
            }
        });
        return files
    }

    getFilenames(path.resolve(__dirname, '../../../static')).forEach(function (file) {
        var rs = JSON.parse(fs.readFileSync(file));
        if (rs.length > 0) {
            routers.push.apply(routers, rs);
        }
    });

    router.get('/index', function *() {
        var status = yield (sendfile(this, common.getHtmlPath(moduleName, 'index.html')));
        if (!status) {
            this.throw(404);
        }
    }).get('/fun/list', function *() {
        var req = this.request.body;
        var $self = this;
        $self.body = {
            error: 0,
            msg: null,
            data: [
                {
                    uuid: 'user',
                    name: '用户模块'
                },
                {
                    uuid: 'bb',
                    name: '功能2'
                },
                {
                    uuid: 'aa',
                    name: '功能3'
                },
                {
                    uuid: 'dd',
                    name: '功能4'
                }
            ]
        }
    }).get('/router/list', function *() {
        var ros = [];
        getFilenames(path.resolve(__dirname, '../../../static')).forEach(function (file) {
            var rs = JSON.parse(fs.readFileSync(file));
            rs.forEach(function (value, key) {
                ros.push(value);
            });
        })
        ;
        this.body = ros;
    });
    ;

    return router;
};