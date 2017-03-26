const router = require('koa-router')();
const path = require('path');
const sendfile = require('koa-sendfile');
const service = require(path.resolve(__dirname, '..') + '/service/index.js');
const moduleName = path.basename(path.resolve(__dirname, '..'));
const paths = require(path.resolve('plugins/read-config.js'));
const common = require(path.resolve('plugins/common.js'));
const fs = require('fs');

var routers = [];

module.exports = function (config) {
    function isDirectory(dir) {
        try {
            const stats = fs.statSync(dir)
            return stats.isDirectory()
        } catch (err) {
            return false
        }
    }

    function fsExistsSync(path) {
        try {
            fs.accessSync(path, fs.F_OK);
        } catch (e) {
            return false;
        }
        return true;
    }

    function getFilenames(dir) {
        var files = []
        if (!isDirectory(dir)) throw new Error(dir + ' is not a directory!')
        fs.readdirSync(dir).forEach((filename) => {
            const fullPath = path.join(dir, filename, '/app/js/res/router.json');
            console.info(fullPath);
            if (/.json$/.test(fullPath)&&fsExistsSync(fullPath)) {
                console.info('true');
                files.push(fullPath)
            }
        });
        return files
    }

    getFilenames(path.resolve(__dirname, '../../../static')).forEach((file) => {
        var rs = JSON.parse(fs.readFileSync(file));
        rs.forEach(function (value, key) {
            routers.push(value);
        });
    });

    router.get('/index', function *() {
        var status = yield (sendfile(this, common().getHtmlPath(moduleName, 'index.html')));
        if (!status) {
            this.throw(404);
        }
    }).get('/module1/:name', function *() {
        var status = yield (sendfile(this, path.resolve('modules/static/' + this.params.name + '/app/html/rev')+ '/index.html'));
        if (!status) {
            this.throw(404);
        }
    }).get('/module/:cname/:name', function *() {
        var status = yield (sendfile(this, path.resolve('modules/static/' + this.params.cname + '/app/html/rev')+'/'+this.params.name + '/index.html'));
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
        getFilenames(path.resolve(__dirname, '../../../static')).forEach((file) => {
            var rs = JSON.parse(fs.readFileSync(file));
            rs.forEach(function (value, key) {
                ros.push(value);
            });
        });
        this.body = ros;
    });
    ;

    return router;
};