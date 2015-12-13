'use strict';

/**
 * @ngdoc directive
 * @name peterbdotin.directive:eventPod
 * @description
 * # eventPod
 */
angular.module('ufesmMembersOnlyApp')
  .directive('pageTicker', function ($rootScope,serverFactory,util) {
    return {
      templateUrl: 'views/page-ticker.html',
      restrict: 'E',
      replace:true,
      link: function postLink(scope,element, attrs) {
        $rootScope.tickerWatch = 0;
        serverFactory.gettickeritems(scope);
        scope.gotTickerItems = function(data) {
          scope.tickeritems = data.Items;
        }
        $rootScope.$watch('tickerWatch',function (new_tickerWatch,old_tickerWatch){
          if (new_tickerWatch !== old_tickerWatch) {
            serverFactory.gettickeritems(scope);
          }
        });
      }
    };
  });
