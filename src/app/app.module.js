'use strict';

define([
    'app.routers',
    'workspace/workspace.routers',
    'workspace/workspace.module',
], function(appRouters, workspaceRouters) {
    //配置路由规则
    function configRouter(ngModule, routersConfig) {
        ngModule.config(['$stateProvider','$locationProvider', '$ocLazyLoadProvider', function($stateProvider, $locationProvider, $ocLazyLoadProvider) {
            $locationProvider.hashPrefix('');//去除浏览器url地址中的!
            $ocLazyLoadProvider.config({
                'debug': true, // For debugging 'true/false'
                'events': true // For Event 'true/false'
            });
            for (var i = 0; i < routersConfig.length; i++) {
                $stateProvider.state(routersConfig[i]);
            }
        }]);
    }

    //根模块
    var rootModule = angular.module('myRootModule', ['ui.router', 'oc.lazyLoad', 'workspace.module']);
    configRouter(rootModule, appRouters);
    configRouter(rootModule, workspaceRouters);
    rootModule.run(['$transitions', '$ocLazyLoad', function ($transitions, $ocLazyLoad) {
        $transitions.onStart({}, function(trans) {
         trans.router.stateService.target('workspace');
        });
    }]);
    return rootModule;
});
