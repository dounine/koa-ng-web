define(['angular'], function(angular) {
    "use strict";

    var app = angular.module(
        "app.service.index",//定义的模块名称
        [
            "ui.router",//依赖的模块
            "ngCookies"
        ]);
    app.factory("service",['$http', service]);
    app.factory("navService",['$http', navService]);

    app.constant("imgTypeIcos",
        [{suffixs: ["folder"]}
            , {suffixs: ["file"]}
            , {suffixs: ["png","jpg","gif","bmp","jpeg"]}
            , {suffixs: ["xls", "xlsx", "excel"]}
            , {suffixs: ["txt"]}]);

    function service($http) {
        var service = {
            need_captcha: need_captcha
        };
        return service;

        function need_captcha(account) {
            var postDat = {"account": account};
            return $http.post("admin/clouddisk/captcha/needCaptcha", postDat);//用户是否需要验证码http请求
        }
    }

    function navService() {
        var navs = [];
        var service = {
            addNav: addNav,
            getNavs: getNavs,
            removeNav:removeNav
        };
        return service;

        function addNav(nav) {
            if(nav.last){
                for(var i in navs){
                    if(navs[i].last){
                        navs[i].last = false;
                    }
                }
            }
            navs.push(nav);
        }

        function removeNav(index) {
            navs.splice(index,navs.length);
        }

        function getNavs() {
            return navs;
        }
    }
});