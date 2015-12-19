'use strict';

/**
 * @ngdoc directive
 * @name peterbdotin.directive:eventPod
 * @description
 * # eventPod
 */
angular.module('ufesmMembersOnlyApp')
  .directive('dbManager', function (serverFactory,util) {
    return {
      templateUrl: 'views/db-manager.html',
      restrict: 'E',
      replace:true,
      link: function postLink(scope,element, attrs) {
        scope.dbquery = {
          query:null,
        }
        scope.executequery = function(){
          serverFactory.executesqlquery(scope);
        }
        scope.handlequeryresult = function (data){
          console.log(data);
        }
      }
    };
  });
