'use strict';

/**
 * @ngdoc directive
 * @name peterbdotin.directive:eventPod
 * @description
 * # eventPod
 */
angular.module('ufesmMembersOnlyApp')
  .directive('myProfile', function (serverFactory,util) {
    return {
      templateUrl: 'views/my-profile.html',
      restrict: 'E',
      replace:true,
      link: function postLink(scope,element, attrs) {

      }
    };
  });
