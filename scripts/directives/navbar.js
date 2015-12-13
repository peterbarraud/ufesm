'use strict';

/**
 * @ngdoc directive
 * @name peterbdotin.directive:eventPod
 * @description
 * # eventPod
 */
angular.module('ufesmMembersOnlyApp')
  .directive('navBar', function (util,serverFactory,$location) {
    return {
      templateUrl: 'views/nav-bar.html',
      restrict: 'E',
      replace:true,
      link: function postLink(scope,element, attrs) {
  		  // scope.navItemList = serverFactory.getUserObject().appsection;

  		  scope.navigateto = function(whereto,endsession) {
  			  if (endsession) {
  				  serverFactory.destroyUserObject();
  			  }
  			  $location.path( "/" + whereto );
  		  }
        scope.getClass = function(sectionname) {
          return $location.$$path === '/' + sectionname ? 'ufesm-active' : 'ufesm-not-active'
        }
        scope.isCurrent = function(sectionname) {
          return $location.$$path === '/' + sectionname;
        }
      }
    };
  });
