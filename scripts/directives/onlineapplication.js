'use strict';

/**
 * @ngdoc directive
 * @name peterbdotin.directive:eventPod
 * @description
 * # eventPod
 */
angular.module('ufesmMembersOnlyApp')
  .directive('onlineApplication', function (serverFactory,util) {
    return {
      templateUrl: 'views/online-application.html',
      restrict: 'E',
      replace:true,
      link: function postLink(scope,element, attrs) {

      }
    };
  });
