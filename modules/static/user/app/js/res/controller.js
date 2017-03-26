angular.module(
    "userModule",
    [
        {
            name: "userSer",
            files: ["/user/app/js/rev/service.js"]
        }
    ]
).controller("userCtrl", ['$scope', '$state', 'userService', 'navService', function ($scope, $state, userService, navService) {
    $scope.name = 'nihao';
    $scope.navService = navService;
    $scope.navService.removeNav(1)
    $scope.navService.addNav({name: '用户功能', last: true});
    $scope.$on("uidChange",
        function (event, msg) {
            $scope.uid = msg;
        });

}]).controller("userCtrl_list", ['$scope', function ($scope) {
    $scope.name = 'nihao';
    $scope.click = function (item) {
        $scope.uid = "123456789";
        $scope.$emit("uidChange", $scope.uid);
    }
}]).controller("userCtrl_add", ['$scope', function ($scope) {
    $scope.name = 'nihao';
}]).controller("userCtrl_edit", ['$scope', function ($scope) {
    $scope.name = 'nihao';
}]).controller("userCtrl_del", ['$scope', '$stateParams', function ($scope, $stateParams) {
    $scope.name = 'nihao';
    console.info("要删除数据的ID为:"+$stateParams.uid);
}]);