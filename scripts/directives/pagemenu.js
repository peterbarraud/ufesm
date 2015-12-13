'use strict';

/**
 * @ngdoc directive
 * @name peterbdotin.directive:eventPod
 * @description
 * # eventPod
 */
angular.module('ufesmMembersOnlyApp')
  .directive('pageMenu', function (serverFactory,util) {
    return {
      templateUrl: 'views/page-menu.html',
      restrict: 'E',
      replace:true,
      link: function postLink(scope,element, attrs) {
        scope.selectedID = -1;
        serverFactory.getpagemenu(scope);
        scope.selectedModalID = '';
        serverFactory.listofpublishedpages(scope);
        scope.listofpages_callback = function(data) {
          scope.listofpages = data;
        }
        scope.managegetmenu = function (data) {
          scope.menu = data;
        }
        scope.save = function() {
          serverFactory.setpagemenu(scope);
        }
        scope.save_callback = function (data) {
          // alert('Menu changes saved successfully');
        }
        scope.opencommandsdialog = function(diloagid,itemid) {
          scope.selectedID = itemid;
          scope.selectedModalID = diloagid;
          $('#' + scope.selectedModalID).modal('show');
        }

        scope.move = function(direction){
          $('#' + scope.selectedModalID).modal('hide');
          for (var i=0;i<scope.menu.length;i++) {
            var title = scope.menu[i];
            if (title.id === scope.selectedID) {  //must ONLY be move left or right
              if (direction === 'right') {
                if (angular.isDefined(scope.menu[i+1])){  //so this is NOT the last title
                  var next_title = scope.menu[i+1];
                  scope.menu[i] = next_title;
                  scope.menu[i+1] = title;
                  serverFactory.setpagemenu(scope);
                  return;
                }
              }
              else if (direction === 'left') {
                if (angular.isDefined(scope.menu[i-1])){  //so this is NOT the first title
                  var prev_title = scope.menu[i-1];
                  scope.menu[i] = prev_title;
                  scope.menu[i-1] = title;
                  serverFactory.setpagemenu(scope);
                  return;
                }

              }
            }
            for (var j=0;j<title.items.length;j++) {
              var item = title.items[j];
              if (item.id === scope.selectedID) {  //must ONLY be move up or down
                if (direction === 'down') {
                  if (angular.isDefined(title.items[j+1])){  //so this is NOT the last item
                    var next_item = title.items[j+1];
                    title.items[j] = next_item;
                    title.items[j+1] = item;
                    serverFactory.setpagemenu(scope);
                    return;
                  }
                }
                else if (direction === 'up') {
                  if (angular.isDefined(title.items[j-1])){  //so this is NOT the first item
                    var prev_item = title.items[j-1];
                    title.items[j] = prev_item;
                    title.items[j-1] = item;
                    serverFactory.setpagemenu(scope);
                    return;
                  }
                }
              }
            }
          }
        }
        scope.opendialogtoaddtitle = function(itemid) {
          scope.selectedID = itemid;
          $('#list-of-pages-for-title').modal('show');
        }
        scope.opendialogtoadditem = function(itemid) {
          scope.selectedID = itemid;
          $('#list-of-pages-for-menu').modal('show');
        }
        scope.opendialogtoadditemfortitle = function(itemid) {
          scope.selectedID = itemid;
          $('#list-of-pages-for-first-menu-in-title').modal('show');
        }
        scope.addmenutitle = function() {
          var radiotitles = $('input[name=title-radio]');
          var nothingselected = true;
          var gotit = false;
          var new_insert_menu = {};
          angular.forEach (radiotitles, function (radiotitle, key){
            if (radiotitle.checked) {
              nothingselected = false;
              angular.forEach ($(radiotitle).siblings(), function (sibling, key){
                if (sibling.type === "text") {
                  if (sibling.value.trim() === "") {
                    alert("Please enter a title for the menu");
                    nothingselected = true;
                  }
                  else {
                    if (!gotit) {
                      gotit = true;
                      new_insert_menu = {id:1,title:sibling.value.trim(),pagename:$(sibling).attr('pagename'),pageid:$(sibling).attr('pageid'),items:[]};
                      $('#list-of-pages-for-title').modal('hide');
                    }
                  }
                }

              });
            }
          });
          if (nothingselected) {
            alert('Either choose a title to add to the menu or click Close to dismiss this dialog.')
          }
          else{
            var selectedTitleIndex = 0;
            new_insert_menu.id = util.getUniqueMenuID(scope.menu);
            for (var i=0;i<scope.menu.length;i++) {
              if (scope.menu[i].id === scope.selectedID) {
                selectedTitleIndex = i+1;
              }
            }
            scope.menu.splice(selectedTitleIndex,0,new_insert_menu);
          }
          serverFactory.setpagemenu(scope);
        }
        scope.addmenuitem = function() {
          var radioitems = $('input[name=item-radio]');
          var nothingselected = true;
          var new_item = {};
          var gotit = false;
          angular.forEach (radioitems, function (radioitem, key){
            if (radioitem.checked) {
              nothingselected = false;
              angular.forEach ($(radioitem).siblings(), function (sibling, key){
                if (sibling.type === "text") {
                  var new_item_title = sibling.value.trim();
                  if (new_item_title === "") {
                    alert("Please enter a title for the menu item");
                  }
                  else {
                    if (gotit === false){
                      new_item = {title:new_item_title,pagename:$(sibling).attr('pagename'),pageid:$(sibling).attr('pageid')};
                      $('#list-of-pages-for-menu').modal('hide');
                      gotit = true;
                    }
                  }
                }
              });
            }
          });
          if (nothingselected) {
            alert('Either choose an item to add to the menu title or click Close to dismiss this dialog.')
          }
          else{
            for (var i=0;i<scope.menu.length;i++) {
              for (var j=0;j<scope.menu[i].items.length;j++) {
                if (scope.menu[i].items[j].id === scope.selectedID) {
                  scope.menu[i].items.splice(j+1,0,new_item);
                  break;
                }
              }
            }
          }
          serverFactory.setpagemenu(scope);
        }

        scope.addmenuitematfirst = function() {
          var radioitems = $('input[name=item-radio]');
          var nothingselected = true;
          var new_item = {};
          var new_item_title = '';
          var gotit = false;
          angular.forEach (radioitems, function (radioitem, key){
            if (radioitem.checked) {
              nothingselected = false;
              angular.forEach ($(radioitem).siblings(), function (sibling, key){
                if (sibling.type === "text") {
                  new_item_title = sibling.value.trim();
                  if (new_item_title === "") {
                    alert("Please enter a title for the menu item");
                  }
                  else {
                    if (gotit === false){
                      new_item = {title:new_item_title,pagename:$(sibling).attr('pagename'),pageid:$(sibling).attr('pageid')};
                      $('#list-of-pages-for-first-menu-in-title').modal('hide');
                      gotit = true;
                    }
                  }
                }

              });
            }
          });
          if (nothingselected) {
            alert('Either choose an item to add to the menu title or click Close to dismiss this dialog.')
          }
          else{
            for (var i=0;i<scope.menu.length;i++) {
              if (scope.menu[i].id === scope.selectedID){
                new_item.id = new_item.id = util.getUniqueMenuID(scope.menu);
                scope.menu[i].items.push (new_item);
              }
            }
          }
          serverFactory.setpagemenu(scope);
        }

        scope.delete = function() {
          $('#' + scope.selectedModalID).modal('hide');
          var new_menu = [];
          for (var i=0;i<scope.menu.length;i++) {
            var title = scope.menu[i];
            var new_title = {title:title.title,id:title.id,pagename:title.pagename,items:[]};
            for (var j=0;j<title.items.length;j++) {
              var item = title.items[j];
              if (item.id !== scope.selectedID) {
                new_title.items.push(item)
              }
            }
            if (title.id !== scope.selectedID) {
              new_menu.push(new_title);
            }
          }
          scope.menu = new_menu;
          serverFactory.setpagemenu(scope);
        }
      }
    };
  });
