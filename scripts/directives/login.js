'use strict';

/**
 * @ngdoc directive
 * @name peterbdotin.directive:eventPod
 * @description
 * # eventPod
 */
angular.module('ufesmMembersOnlyApp')
  .directive('logIn', function (serverFactory,util,$location) {
    return {
      templateUrl: 'views/log-in.html',
      restrict: 'E',
      replace:true,
      link: function postLink(scope,element, attrs) {
        scope.checkusercredentials = function () {
          serverFactory.checkusercredentials(scope);
        };
        scope.manageuserlogin = function(data){
          if (data.success) {
            var startlocation = null;
            data.userobject.appsection.forEach (function(appSec) {
              if (appSec.sectionname === 'storyadmin') {
                startlocation = 'storyadmin';
              }
            });
            $location.path( "/pagemanager");
          }
          else {
            scope.invalid_user_cred = data.error;
          }

        }
        scope.displayErrorMsg = function(){
          return util.isEmptyString(scope.invalid_user_cred) === false;
        }
      }
    };
  });
