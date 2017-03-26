angular.module(
    "userComModule",
    []
).controller("userComCtrl", ['$scope', '$state', 'userService', 'navService', function ($scope, $state, userService, navService) {


}]).controller("userComCtrl_add", ['$scope', function ($scope) {
    $scope.name = 'nihao';
}]).controller("userComCtrl_list", ['$scope', function ($scope) {
    $scope.name = 'nihao';
}]).controller("userComCtrl_edit", ['$scope', function ($scope) {
    $scope.name = 'nihao';
}]).controller("userComCtrl_del", ['$scope', '$stateParams', function ($scope, $stateParams) {
    $scope.name = 'nihao';
}]);