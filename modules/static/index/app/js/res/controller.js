define(['angular','service'], function(angular,config) {
    "use strict";

    var app = angular.module(
        "app.controller.index",//定义的模块名称
        [
            "app.service.index"
        ]);

    app.controller('index',['$scope','$rootScope','config','$http','$location','navService','$urlRouter','$ocLazyLoad',index]);
    app.controller('functions',['$scope','$rootScope','config','$http','$location','navService',functions]);
    app.controller('article',['$scope','$rootScope','config','$http','$location',article]);

    function index($scope, $rootScope,config,$http,$location,navService,$urlRouter,$ocLazyLoad) {
        var vm = $scope;
        vm.navService = navService;
        vm.navService.removeNav(0);
        vm.navService.addNav({name:'功能列表',last:true});
        vm.navs = vm.navService.getNavs();

        // $rootScope.$on('$locationChangeSuccess', function () {
        //
        //     if(!$location.path()) $location.path('/');
        //     var mod = $location.path().split('index')[1];
        //     var cc = mod.split('/');
        //     console.info(cc)
        //     // 路由路径按照 "模块/页面" 的方式配置，有两个好处：
        //     // 1. 避免不同模块的路径冲突
        //     // 2. 可以通过路径判断模块
        //     $ocLazyLoad.load("/"+cc[1]+"/app/html/rev/"+cc[2]+"/index.html").then(function () {
        //         $urlRouter.sync();
        //     });
        // });
        // $urlRouter.listen();
    }

    function functions($scope, $rootScope,config,$http,$location,navService) {
        var vm = $scope;
        vm.navService = navService;
        vm.navService.removeNav(0);
        vm.navService.addNav({name:'功能列表',last:true});
        vm.navs = vm.navService.getNavs();
        vm.list = function () {
            var data = {
                name:'funName',
                sort:'DESC'
            };

            vm.msg = null;//清空原错误信息
            $http.get(config.path+"/fun/list",data).then(function successCallback(response) {
                if(response.data.error==0){
                    vm.msg = null;
                    vm.funs = response.data.data;

                }else{
                    vm.msg = response.data.msg;
                }
            }, function errorCallback(response) {
                vm.msg = response.data.msg;
            });
        }
        vm.list()
    }

    function article($scope, $rootScope,config,$http,$location) {
        var vm = $scope;
        vm.sso = function () {
            var data = {
                username:vm.username,
                password:vm.password
            };

            vm.msg = null;//清空原错误信息
            $http.post(config.path+"/login",data).then(function successCallback(response) {
                if(response.data['errno']==0){
                    vm.msg = null;
                }else{
                    vm.msg = response.data.msg;
                    vm.password = null;
                }
            }, function errorCallback(response) {
                vm.msg = response.data.msg;
            });
        }
    }

});