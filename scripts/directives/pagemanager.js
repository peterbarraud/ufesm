'use strict';

/**
 * @ngdoc directive
 * @name peterbdotin.directive:eventPod
 * @description
 * # eventPod
 */
angular.module('ufesmMembersOnlyApp')
  .directive('pageManager', function ($rootScope,serverFactory,util) {
    return {
      templateUrl: 'views/page-manager.html',
      restrict: 'E',
      replace:true,
      link: function postLink(scope,element, attrs) {
      }
    };
  });
