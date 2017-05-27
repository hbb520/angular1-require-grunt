'use strict';

define([
    'app.module'
], function() {
    //手动启动Angular应用
    angular.element(function() {
        angular.bootstrap(document, ['myRootModule']);
    });
});
