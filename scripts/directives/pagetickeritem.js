'use strict';

/**
 * @ngdoc directive
 * @name peterbdotin.directive:eventPod
 * @description
 * # eventPod
 */
angular.module('ufesmMembersOnlyApp')
  .directive('pagetickerItem', function ($rootScope,serverFactory,util) {
    return {
      templateUrl: 'views/page-ticker-item.html',
      restrict: 'E',
      replace:true,
      link: function postLink(scope,element, attrs) {
        scope.tickeritem = JSON.parse(attrs.data);
        scope.tickeritem.currenttitle = scope.tickeritem.title;
        scope.ineditmode = 0;
        scope.edit = function() {
          scope.ineditmode = 1;

        }
        scope.save = function() {
          serverFactory.saveitemdetails(scope,scope.tickeritem,'tickeritem');
        }
        scope.undo = function() {
          scope.tickeritem.title = scope.tickeritem.currenttitle;
          scope.ineditmode = 0;
        }
        scope.remove = function() {
          if (confirm("Are you sure you want to delete the ticker item titled:\n" + scope.tickeritem.title)) {
            serverFactory.deleteitem(scope,scope.tickeritem,'tickeritem');
          }

        }
        scope.addnew = function() {
          serverFactory.getitem(-1,'tickeritem',scope,'showaddnewtickerModal');

          // serverFactory.addtickeratposition(scope);

        }
        scope.SaveTickerItem = function() {
          serverFactory.addtickeratposition(scope,$('#addnewtickerModal').attr('selectedItemPos'));

        }

        scope.move = function(direction) {
          serverFactory.movetickerposition(scope,direction);
        }

        //callbacks
        scope.managesaveitem = function(data) {
          scope.tickeritem.currenttitle = scope.tickeritem.title;
          $rootScope.tickerWatch += 1;
          scope.ineditmode = 0;
        }
        scope.managedeleteitem = function(data) {
          $rootScope.tickerWatch += 1;
        }
        scope.manageaddticker = function(data) {
          $rootScope.tickerWatch += 1;
        }


        scope.showaddnewtickerModal = function(data) {
          var newitemname = prompt('Enter the new ticker item text');
          if (newitemname){
            scope.newitem = data;
            scope.newitem.title = newitemname;
            serverFactory.addtickeratposition(scope,scope.tickeritem.position);
          }
        }
        scope.managemoveticker = function(data) {
          //refresh page
          $rootScope.tickerWatch += 1;
        }

      }
    };
  });
