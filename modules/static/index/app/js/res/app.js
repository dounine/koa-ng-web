define(['angular', 'controller'], function (angular) {
    'use strict';
    var $stateProviderRef = null;
    var $urlRouterProviderRef = null;
    var app = angular.module("app", ["app.controller.index", "angular-loading-bar", "oc.lazyLoad", "ui.router"]);
    app.run(['$cookies', '$rootScope', appRun]);
    app.run(['$rootScope', '$state', '$http', 'config', '$urlRouter',
        function ($rootScope, $state, $http, config, $urlRouter, $urlRouterProvider) {
            // console.info($location)
            // $rootScope.$on('$locationChangeSuccess', function () {
            //     if(!$location.path()) $location.path('/');
            //     var mod = $location.path().split('/')[1]||'home';
            //     // 路由路径按照 "模块/页面" 的方式配置，有两个好处：
            //     // 1. 避免不同模块的路径冲突
            //     // 2. 可以通过路径判断模块
            //     $ocLazyLoad.load(mod).then(function () {
            //         $urlRouter.sync();
            //     });
            // });

            $urlRouterProviderRef.otherwise("/index");
            // $urlRouterProviderRef.deferIntercept();
            // $http.get('/router/list').then(function (data) {
            //
            //     angular.forEach(data.data, function (value, key) {
            //         var getExistingState = $state.get(value.name)
            //         if(getExistingState !== null){
            //             return;
            //         }
            //         var state = {
            //             "url": value.url,
            //             // "parent": value.parent,
            //             "abstract": value.abstract,
            //             "views": {}
            //         };
            //         angular.forEach(value.views, function (view) {
            //             state.views[view.name] = {
            //                 templateUrl: view.templateUrl,
            //                 controller: view.controller
            //             };
            //         });
            //         if (value.resolve && value.resolve.lazyLoad) {
            //             state.resolve = {};
            //             state.resolve.load = function ($ocLazyLoad) {
            //                 return $ocLazyLoad.load(value.resolve.lazyLoad);
            //             };
            //         }
            //
            //         $stateProviderRef.state(value.name, state);
            //
            //     });
            //
            //     $urlRouter.listen();
            //     $urlRouter.sync();
            //
            // })
            $.ajax({
                type: 'get',
                url: config.path + "/router/list",
                async: false,
                success: function (data) {
                    angular.forEach(data, function (value, key) {
                        var state = {
                            "url": value.url,
                            // "parent": value.parent,
                            "abstract": value.abstract,
                            "views": {}
                        };
                        angular.forEach(value.views, function (view) {
                            state.views[view.name] = {
                                templateUrl: view.templateUrl,
                                controller: view.controller
                            };
                        });
                        if (value.resolve && value.resolve.lazyLoad) {
                            state.resolve = {};
                            state.resolve.load = function ($ocLazyLoad) {
                                return $ocLazyLoad.load(value.resolve.lazyLoad);
                            };
                        }
                        $stateProviderRef.state(value.name, state);
                    });

                }
            });
            // $urlRouter.sync();
            // $urlRouter.listen();
        }]);
    function appRun($cookies, $rootScope) {
        $cookies.clouddisk_account = "102535481@qq.com";
        $rootScope.ctx = document.body.getAttribute("ctx"); //项目根路径

    }

    app.config(['$httpProvider', '$stateProvider', '$urlRouterProvider', appConfig]);
    // app.config(function ($provide) {
    //     $provide.decorator('$state', function($delegate, $ocLazyLoad) {
    //         var state = {};
    //         // // angular对象还是有些实用的方法的，深拷贝对象算是一个
    //         // // 这里做深拷贝不做浅拷贝是避免循环嵌套调用内存溢出
    //         angular.copy($delegate, state);
    //         $delegate.transitionTo = function (to) {
    //             // 跳转的时候有两种情况，一种是传入self对象，另一种是直接把state的id传进来
    //             if (to.self) {
    //                 // 当to为对象时，读取self.url属性获取路径，因为路径命名遵循"模块/页面"的方式，所以可以轻松判读取模块名
    //                 var mod = to.self.url.replace('main.', '').replace(/\/(.*)\/.*/, '$1');
    //                 if (!mod || '/' === mod) {
    //                     mod = 'home';
    //                 }
    //                 //模块加载完成后再调用默认的路由跳转函数
    //                 $ocLazyLoad.load(mod).then(function (){
    //                     state.transitionTo.apply(null, arguments);
    //                 });
    //             } else {
    //                 var id = to.replace('main.', '').replace(/(([a-z]*)[A-Z]{1})?.*/, '$2');
    //                 $ocLazyLoad.load(mnModule[id].name).then(function() {state.transitionTo.apply(null, arguments);});
    //             }
    //         }
    //         return $delegate;
    //     });
    // })

    function appConfig($httpProvider, $stateProvider, $urlRouterProvider) {
        $stateProviderRef = $stateProvider;
        $urlRouterProviderRef = $urlRouterProvider;
        // $urlRouterProvider.deferIntercept();

        $httpProvider.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded; charset=UTF-8";
        $httpProvider.defaults.transformRequest = function (data) {
            if (data === undefined) {
                return data;
            }
            return $.param(data);
        }
    }

    function routerConfig($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/index");
        $stateProvider.state("index", {
            url: "/index",
            views: {
                "": {
                    templateUrl: "index/app/html/rev/nav-list.html",
                    controller: "index"
                },
                "article@index": {
                    templateUrl: "index/app/html/rev/nav.html",
                    controller: "article"
                },
                "funs@index": {
                    templateUrl: "index/app/html/rev/list.html",
                    controller: "funs"
                }
            }
        }).state("index.fun", {
            url: "/fun/:uuid",
            views: {
                "funs@index": {
                    templateUrl: '/module/user',
                    controller: 'userCtrl',
                    resolve: {
                        load: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                '/user/app/js/rev/router.js',
                                '/user/app/js/rev/controller.js'
                            ]);
                        }]
                    }
                }
            }
        })
    }

    return app;
});