// define(['angular', 'controller'], function(angular) {
//     'use strict';
//
//     var app = angular.module("app", ["app.controller.index", "angular-loading-bar","oc.lazyLoad"]);
//     app.run(['$cookies','$rootScope',appRun]);
//
//     function appRun($cookies, $rootScope) {
//         $cookies.clouddisk_account = "102535481@qq.com";
//         $rootScope.ctx = document.body.getAttribute("ctx"); //项目根路径
//     }
//
//     app.config(['$httpProvider','$stateProvider','$urlRouterProvider',appConfig]);
//
//     app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
//         $urlRouterProvider.otherwise("/index");
//         $stateProvider.state("index", {
//             url: "/index",
//             views: {
//                 "": {
//                     templateUrl: "index/app/html/rev/nav-list.html",
//                     controller: "index"
//                 },
//                 "article@index": {
//                     templateUrl: "index/app/html/rev/nav.html",
//                     controller: "article"
//                 },
//                 "funs@index": {
//                     templateUrl: "index/app/html/rev/list.html",
//                     controller: "funs"
//                 }
//             }
//         }).state("index.fun", {
//             url: "/fun/:uuid",
//             templateUrl: '/module/user',
//             controller: 'userCtrl',
//             resolve: {
//                 loadMyCtrl:['$ocLazyLoad',function($ocLazyLoad){
//                     console.info('in'+$ocLazyLoad);
//                     return $ocLazyLoad.load({
//                         name : module,
//                         cache: false,
//                         files:'/user/app/html/rev/nav-list.html'
//                     });
//                 }]
//             }
//         })
//     }])
//     function appConfig($httpProvider, $stateProvider, $urlRouterProvider) {
//         $httpProvider.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded; charset=UTF-8";
//         $httpProvider.defaults.transformRequest = function(data) {
//             if(data === undefined) {
//                 return data;
//             }
//             return $.param(data);
//         }
//     }
//     return app;
// });