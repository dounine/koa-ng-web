angular.module(
    "userSer", []).factory("userService", ['$http', function ($http) {
        var service = {
            test: test
        };
        return service;

        function test(account) {
            var postDat = {"account": account};
            return $http.post("admin/clouddisk/captcha/needCaptcha", postDat);//用户是否需要验证码http请求
        }
    }]
);

