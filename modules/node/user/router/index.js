const router = require('koa-router')();
const path = require('path');
const sendfile = require('koa-sendfile');
const service = require(path.resolve(__dirname, '..') + '/service/index.js');
const moduleName = path.basename(path.resolve(__dirname, '..'));
const paths = require(path.resolve('plugins/read-config.js'));
const common = require(path.resolve('plugins/common.js'));

module.exports = function (config) {
    router.get('/index', function *() {
        var status = yield (sendfile(this, common().getHtmlPath(moduleName, 'index.html')));
        if (!status) {
            this.throw(404);
        }
    }).get('/fun/list', function *() {
        var req = this.request.body;
        var $self = this;
        $self.body = {
            error:0,
            msg:null,
            data:[
                {
                    uuid:'432412343',
                    name:'功能1'
                },
                {
                    uuid:'432412344',
                    name:'功能2'
                },
                {
                    uuid:'432412345',
                    name:'功能3'
                },
                {
                    uuid:'432412346',
                    name:'功能4'
                }
            ]
        }
        // yield (service().funs(req)
        //     .then(function (parsedBody) {
        //         var responseText = JSON.parse(parsedBody);
        //         if (responseText['errno'] == 0) {
        //             var token = JSON.parse(responseText['data'])['token'];
        //             $self.body = responseText;
        //             $self.cookies.set('token', token);
        //         } else {
        //             $self.body = responseText;
        //         }
        //
        //     }).catch(function (error) {
        //         if (error.error && error.error.code && error.error.code == 'ETIMEDOUT') {//登录超时
        //             $self.body = {'msg': '登录超时,请尝试重新登录.', errno: 3};
        //         }
        //     }));
    }).get('/router/list', function *() {
        var req = this.request.body;
        var $self = this;
        $self.body = [
            {
                "name": "root",
                "url": "/",
                "parent": "",
                "abstract": true,
                "views": [
                    {"name": "header", "templateUrl": "/app/views/header.html"},
                    {"name" :"footer", "templateUrl": "/app/views/footer.html" }
                ]
            },
            {
                "name": "home",
                "url": "",
                "abstract" : false,
                "parent": "root",
                "views": [
                    {"name": "container@", "templateUrl": "/app/views/content1.html"},
                    {"name" :"left@", "templateUrl": "/app/views/left1.html" }
                ]
            },
            {
                "name": "about",
                "url": "/about",
                "abstract": false,
                "parent": "root",
                "views": [
                    {"name": "container@", "templateUrl": "/app/views/content2.html"},
                    {"name" :"left@", "templateUrl": "/app/views/left2.html" }
                ]
            }
        ]
    });

    return router;
};