'use strict';

define([
    'workspace/workspace.module',
    'text!user/user-profile/user-profile-template.html',
    'css!user/user-profile/user-profile.css'
], function(workspaceModule, UserProfileTemplate) {
    workspaceModule.component('userProfile', {
        template: UserProfileTemplate,
        // bdindings: {
        //     user: '<',          //从外部传递给组件的参数
        //     onUpdate: '&'       //派发给外部组件的事件
        // },
        controller: function($scope, $element, $attrs, $state) {
            //获取路由上的参数
            var userId = $state.params.userId;
            console.log(userId);

            var ctrl = this;
            ctrl.updateUserInfo = function() {
                ctrl.onUpdate({ userId: 1 });
            };

            ctrl.backToUserList = function() {
                $state.go('user');
            };
        }
    });
});
