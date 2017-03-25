define(['angular','service'], function(angular,config) {
    "use strict";

    var app = angular.module(
        "app.controller.index",//定义的模块名称
        [
            "app.service.index"
        ]);

    app.controller('index',['$scope','$rootScope','config','$http','$location',index]);
    app.controller('funs',['$scope','$rootScope','config','$http','$location',funs]);
    app.controller('article',['$scope','$rootScope','config','$http','$location',article]);

    function index($scope, $rootScope,config,$http,$location) {
        var vm = $scope;
    }

    function funs($scope, $rootScope,config,$http,$location) {
        var vm = $scope;

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