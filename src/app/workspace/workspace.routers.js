'use strict';
define([], function() {
    //工作空间路由定义
    return [{
        parent: 'workspace',
        name: 'user',
        url: '/user',
        component: 'userTable',
        authenticate: true,
        resolve: {
            lazyload: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({files: ['user/user-table/user-table-component'], cache: false}).then(function () {
                    $ocLazyLoad.inject('workspace.module');
                });
            }]
        }
    }, {
        parent: 'workspace',
        name: 'userprofile',
        url: '/userprofile/:userId',
        component: 'userProfile',
        authenticate: true,
        resolve: {
            lazyload: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({files: ['user/user-profile/user-profile-component'], cache: false}).then(function () {
                    $ocLazyLoad.inject('workspace.module');
                });
            }]
        }
    }, {
        parent: 'workspace',
        name: 'post',
        url: '/post',
        component: 'postTable',
        authenticate: true,
        resolve: {
            lazyload: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({files: ['post/post-table/post-table-component'], cache: false}).then(function () {
                    $ocLazyLoad.inject('workspace.module');
                });
            }]
        }
    }, {
        parent: 'workspace',
        name: 'writepost',
        url: '/writepost',
        component: 'writePost',
        authenticate: true,
        resolve: {
            lazyload: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({files: ['post/write-post/write-post-component'], cache: false}).then(function () {
                    $ocLazyLoad.inject('workspace.module');
                });
            }]
        }
    }, {
        parent: 'workspace',
        name: 'comment',
        url: '/comment',
        component: 'commentTable',
        authenticate: true,
        resolve: {
            lazyload: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({files: ['comment/comment-table/comment-table-component'], cache: false}).then(function () {
                    $ocLazyLoad.inject('workspace.module');
                });
            }]
        }
    }, {
        parent: 'workspace',
        name: 'org',
        url: '/org',
        component: 'orgMng',
        authenticate: true,
        resolve: {
            lazyload: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({files: ['org/org-component'], cache: false}).then(function () {
                    $ocLazyLoad.inject('workspace.module');
                });
            }]
        }
    }, {
        parent: 'workspace',
        name: 'echarts',
        url: '/echarts',
        component: 'echartsComp',
        authenticate: true,
        resolve: {
            lazyload: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({files: ['echarts/echarts-component'], cache: false}).then(function () {
                    $ocLazyLoad.inject('workspace.module');
                });
            }]
        }
    }];
});
