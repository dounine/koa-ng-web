require.config({
    baseUrl: './index',
    paths: {
        //配置
        'app': 'app/js/rev/app',
        'router': 'app/js/rev/router',
        'dataservice': 'app/js/rev/dataservice',
        'controller': 'app/js/rev/controller',
        'directive': 'app/js/rev/directive',
        'filter': 'app/js/rev/filter',
        'service': 'app/js/rev/service',
        'config': 'app/js/rev/_config-ng',
        'bootstrap': 'app/libs/bootstrap/dist/js/bootstrap.min',
        'tetherWrapper': '/common/js/require-wrapper/tw',

        'angular': '/common/libs/angular/angular.min',
        //配置
        'oclazyload': '/common/libs/oclazyload/dist/ocLazyLoad.min',
        'jquery': '/common/libs/jquery/dist/jquery.min',
        'css': '/common/libs/require-css/css',
        'tether': '/common/libs/tether/dist/js/tether.min',
        'angular-ui-route': '/common/libs/angular-ui-router/release/angular-ui-router.min',
        'angular-animate': '/common/libs/angular-animate/angular-animate.min',
        'angular-file-upload': '/common/libs/angular-file-upload/dist/angular-file-upload.min',
        'angular-loading-bar': '/common/libs/angular-loading-bar/build/loading-bar.min',
        'angular-cookies': '/common/libs/angular-cookies/angular-cookies.min'
    },
    shim: {
        'jquery': {
            'exports': '$'
        },
        'angular': {
            'deps': ['jquery'],
            'exports': 'angular'
        },
        'oclazyload':{
            'exports': '$ocLazyLoad',
            'deps': ['angular']
        },
        'angular-animate': {
            'deps': ['angular']
        },
        'bootstrap': {
            'deps': [
                'tetherWrapper',
                'jquery'
            ]
        },
        'angular-ui-route': {
            'deps': ['angular']
        },
        'angular-loading-bar': {
            'deps': [
                'angular'
            ]
        },
        'angular-file-upload': ['angular'],
        'angular-cookies': ['angular']
    },
    priority: [
        'angular'
    ],
    packages: [

    ],
    urlArgs: "_t=" + new Date().getTime() //防止读取缓存，调试用
});

//http://code.angularjs.org/1.2.1/docs/guide/bootstrap#overview_deferred-bootstrap
window.name = 'NG_DEFER_BOOTSTRAP!';

require([
    'angular',
    'config',
    'oclazyload',
    'app',
    'dataservice',
    'directive',
    'filter',
    'router',
    'bootstrap',
    'angular-ui-route',
    'angular-cookies',
    'angular-animate',
    'angular-loading-bar'
], function(angular, app) {
    'use strict';
    /* jshint ignore:start */
    var $html = angular.element(document.getElementsByTagName('html')[0]);
    /* jshint ignore:end */

    angular.element().ready(function() {
        angular.resumeBootstrap([app.name]);
    });

});