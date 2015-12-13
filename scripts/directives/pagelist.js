'use strict';

/**
 * @ngdoc directive
 * @name peterbdotin.directive:eventPod
 * @description
 * # eventPod
 */
angular.module('ufesmMembersOnlyApp')
  .directive('pageList', function ($rootScope,serverFactory,util) {
    return {
      templateUrl: 'views/page-list.html',
      restrict: 'E',
      replace:true,
      link: function postLink(scope,element, attrs) {
        scope.menuissaving = false;
        scope.selectedTab = 'pagelist';
        $rootScope.listupdated = 0;
        serverFactory.listofpages(scope);
        serverFactory.getpagemenu(scope);
        scope.menuitemdetails = {
          selectedItem:null,
          addrelativelocation:'after',
        }

        scope.listofpages_callback = function(data) {
          scope.listofpages = data;
        }
        scope.showpage = function(id,pagetype) {
          $rootScope.selectedPageId = id;
          $rootScope.selectedPageType = pagetype;
        }
        $rootScope.$watch('listupdated',function (new_listupdated,old_listupdated){
          if (new_listupdated !== old_listupdated) {
            serverFactory.listofpages(scope);
          }
        });

        scope.managegetmenu = function (data) {
          scope.pagemenu = data;
          $('#list-of-items-for-menu').modal('hide');
        }
        scope.deletethisitem = function (id){
          var numberoftitlesleft = 0;
          var ismenutitle = false;
          angular.forEach(scope.pagemenu.Items,function(menuitem){
            //we will stop if the user tries to delete the last menu title
            if (parseInt(menuitem.level) === 0){
              numberoftitlesleft += 1;
              if (menuitem.id === id){
                ismenutitle = true;
              }
            }
          });
          if (numberoftitlesleft === 1 && ismenutitle){
            alert("You cannot delete the last title in the menu.\nIf you wish to delete this item, first create another item.\nIf you do not want a menu in your website, please contact the Web administrator.");
          }
          else {
            serverFactory.deletemenuitem(scope,id);
          }
        }
        scope.additem = function (menuitem,itemtype,addposition){
          scope.menuitemdetails.selectedItem = menuitem;
          scope.menuitemdetails.additemtype = itemtype;
          scope.menuitemdetails.addrelativelocation = addposition;
          serverFactory.getitem(-1,'menuitem',scope,'addnewmenutitle');
        }
        scope.addnewmenutitle = function (data){
          scope.newmenutitle = data;
          $('#list-of-items-for-menu').modal('show');
        }

        //user clicks the Add button on the page list dialog
        scope.addthisitemtomenu = function() {
          var newRadioItem = $("input[type='radio'][name='item-radio']:checked");
          if (newRadioItem.length === 1){
            var newItemType = newRadioItem.attr('newItemType');
            if (newItemType === 'title' && angular.isDefined(scope.newmenutitle.title) === false){
              alert('Please enter a title for the new menu.')
            }
            else {
              scope.menuissaving = true;
              var newItem = angular.fromJson(newRadioItem.attr('newItem'));
              if (newItemType === 'title'){
                scope.newmenutitle.pageid = null;
                scope.newmenutitle.pagename = null;
              }
              else {
                scope.newmenutitle.title = newItem.title;
                scope.newmenutitle.pagename = newItem.pagename;
                scope.newmenutitle.pageid = newItem.id;
              }
              scope.newmenutitle.level = scope.menuitemdetails.additemtype === 'title' ? 0 : 1;
              scope.newmenutitle.pagetype = newItemType;
              scope.newmenutitle.position = parseInt(scope.menuitemdetails.selectedItem.position) + 1;

              serverFactory.savemenuitem(scope);
            }

          }
          else {
            alert('Please select an item in the list to add to the menu. Or click Cancel to dismiss this dialog box.')

          }
        }
        $('#list-of-items-for-menu').on('hidden.bs.modal', function (e) {
          scope.menuissaving = false;
          // do something...
        })


      }
    };
  });
