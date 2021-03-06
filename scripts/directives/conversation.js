'use strict';

/**
 * @ngdoc directive
 * @name peterbdotin.directive:eventPod
 * @description
 * # eventPod
 */
angular.module('ufesmMembersOnlyApp')
  .directive('memberConversation', function (serverFactory,util) {
    return {
      templateUrl: 'views/member-conversation.html',
      restrict: 'E',
      replace:true,
      link: function postLink(scope,element, attrs) {
        scope.toggleConversationDisplay = function(id){
          //first collapse available
          $('[role="tabpanel"]').collapse('hide');
          $('#' + id).collapse('toggle');
        }
        scope.startNewConversation = function() {
          $('#startNewConversationModal').modal();
        }
      }
    };
  });
