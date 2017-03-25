const app = require('koa')();//koa web应用
const path = require('path');//路径
const router = require("koa-router")();//路由中间件
const session = require('koa-session');//cookie
const koaBody = require('koa-body');
const staticCache = require('koa-static-cache');
const config = require(path.resolve('plugins/read-config.js'));
const routersPath = '/modules/node/';
const port = 8888;

app.keys = ['issp-node'];//session加密值
app.use(session(app));//使用cookie
app.use(koaBody());//必需要路由用之前使用,不然获取不到表单
router.get('/', function *(next) {//根路由
    this.redirect('/index');//重写向到首页
    this.status = 301;
});

//============路由===========
app.use(require(path.join(__dirname,routersPath,'index/router/index.js'))().routes());//登录路由
app.use(router.routes());

//============静态文件资源===========
app.use(staticCache(path.join(__dirname, 'modules/static'), {
    maxAge: 365 * 24 * 60 * 60
}))

app.use(function *(next){
    var start = new Date;
    yield next;
    var ms = new Date - start;
    console.log('%s %s - %s', this.method, this.url, ms);
});
app.on('error', function(err){
    log.error('server error', err);
});
app.listen(port, function () {
    console.log('koa server listening on port ' + port);
});