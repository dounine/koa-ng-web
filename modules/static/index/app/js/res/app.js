define(['angular', 'controller'], function (angular) {
    'use strict';
    var $stateProviderRef = null;
    var $urlRouterProviderRef = null;
    var app = angular.module("app", ["app.controller.index", "angular-loading-bar", "oc.lazyLoad", "ui.router"]);
    app.run(['$cookies', '$rootScope', appRun]);
    app.run(['$http', 'config',
        function ($http, config) {
            $urlRouterProviderRef.otherwise("/index");
            $.ajax({
                type: 'get',
                url: config.path + "/router/list",
                async: false,
                success: function (data) {
                    angular.forEach(data, function (value, key) {
                        var state = {
                            "url": value.url,
                            // "parent": value.parent,
                            // "abstract": value.abstract,
                            "views": {}
                        };
                        angular.forEach(value.views, function (view) {
                            state.views[view.name] = {
                                templateUrl: view.templateUrl,
                                controller: view.controller
                            };
                        });
                        if (value.resolve && value.resolve.loadFiles) {
                            state.resolve = {};
                            state.resolve.load = function ($ocLazyLoad) {
                                return $ocLazyLoad.load(value.resolve.loadFiles);
                            };
                        }
                        $stateProviderRef.state(value.name, state);
                    });
                }
            });
        }]);
    function appRun($cookies, $rootScope) {
        $cookies.clouddisk_account = "102535481@qq.com";
        $rootScope.ctx = document.body.getAttribute("ctx"); //项目根路径

    }

    app.config(['$httpProvider', '$stateProvider', '$urlRouterProvider', appConfig]);


    function appConfig($httpProvider, $stateProvider, $urlRouterProvider) {
        $stateProviderRef = $stateProvider;
        $urlRouterProviderRef = $urlRouterProvider;
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