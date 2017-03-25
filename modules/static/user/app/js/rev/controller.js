angular.module(
    "userModule",
    [
        {
            name: "userSer",
            files: ["/user/app/js/rev/service.js"]
        }
    ]
).controller("userCtrl", ['$scope','userService',function ($scope, userService) {
    $scope.name = 'nihao';
    userService.test('nihao');
}]);