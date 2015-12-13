'use strict';

/**
 * @ngdoc directive
 * @name peterbdotin.directive:eventPod
 * @description
 * # eventPod
 */
angular.module('ufesmMembersOnlyApp')
  .directive('pagemanagerHelp', function ($rootScope,serverFactory,util) {
    return {
      templateUrl: 'views/page-manager-help.html',
      restrict: 'E',
      replace:true,
      link: function postLink(scope,element, attrs) {
        scope.showhelptab = function(tabid) {
          $('#' + tabid).tab('show')

        }
      }
    };
  });
