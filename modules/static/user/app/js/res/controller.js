angular.module(
    "userModule",
    [
        {
            name: "userSer",
            files: ["/user/app/js/rev/service.js"]
        }
    ]
).controller("userCtrl", ['$scope','userService','navService',function ($scope, userService,navService) {
    $scope.name = 'nihao';
    $scope.navService = navService;
    $scope.navService.removeNav(1)
    $scope.navService.addNav({name:'user功能',last:true});
    // userService.test('nihao');
}]);