angular.module(
    "userVipModule",
    []
).controller("userVipCtrl", ['$scope', '$state', 'userService', 'navService', function ($scope, $state, userService, navService) {


}]).controller("userVipCtrl_add", ['$scope', function ($scope) {
    $scope.name = 'nihao';
}]).controller("userVipCtrl_list", ['$scope', function ($scope) {
    $scope.name = 'nihao';
}]).controller("userVipCtrl_edit", ['$scope', function ($scope) {
    $scope.name = 'nihao';
}]).controller("userVipCtrl_del", ['$scope', '$stateParams', function ($scope, $stateParams) {
    $scope.name = 'nihao';
}]);