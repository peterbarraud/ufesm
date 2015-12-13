'use strict';

/**
 * @ngdoc directive
 * @name peterbdotin.directive:eventPod
 * @description
 * # eventPod
 */
angular.module('ufesmMembersOnlyApp')
  .directive('forgotLogin', function (serverFactory,util) {
    return {
      templateUrl: 'views/forgot-login.html',
      restrict: 'E',
      replace:true,
      link: function postLink(scope) {
        scope.openForgotLoginDialog = function(){
          serverFactory.getitem(-1,'registeredmember',scope,'forgotLoginCallback');
        };
        scope.forgotLoginCallback = function(data) {
          scope.forgotloginuserdetails = data;
          scope.errorMessage = '';
          $('#forgotModal').modal();
        };
        scope.forgotLogin = function() {
          if (util.isVallidEmail(scope.forgotloginuserdetails.email)) {
            scope.errorMessage = '';
            console.log (scope.forgotloginuserdetails);
          }
          else {
            scope.errorMessage = 'Please enter a valid email address. Something like myemail@server.com';
          }

        };
      }
    };
  });
