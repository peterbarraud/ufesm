'use strict';

/**
 * @ngdoc directive
 * @name peterbdotin.directive:eventPod
 * @description
 * # eventPod
 */
angular.module('ufesmMembersOnlyApp')
  .directive('signUp', function (serverFactory,util) {
    return {
      templateUrl: 'views/sign-up.html',
      restrict: 'E',
      replace:true,
      link: function postLink(scope,element, attrs) {
        scope.openSignUpDialog = function(){
          serverFactory.getitem(-1,'registeredmember',scope,'signUpCallback');
        };
        scope.signUpCallback = function(data) {
          scope.signupuserdetails = data;
          scope.signupuserdetails.reenterpassword = '';
          //let's default this to male to ensure that the corresponding radio is selected, by default
          scope.signupuserdetails.sex = 'male';
          scope.errorMessage = '';
          scope.isValidName = true;
          scope.isValidEmail = true;
          scope.isValidPassword = true;
          scope.isValidRePassword = true;
          scope.signupdone = false;
          $('#signupModal').modal();
        };
        scope.signUp = function() {
          scope.isValidName = angular.isDefined(scope.signupuserdetails.name) && scope.signupuserdetails.name !== null && scope.signupuserdetails.name !== '';
          scope.isValidEmail = util.isVallidEmail(scope.signupuserdetails.email);
          scope.isValidPassword = angular.isDefined(scope.signupuserdetails.password) && scope.signupuserdetails.password !== null && scope.signupuserdetails.password !== '' && scope.signupuserdetails.password.length > 4;
          scope.isValidRePassword = scope.isValidPassword && scope.signupuserdetails.reenterpassword === scope.signupuserdetails.password;
          if (scope.isValidName && scope.isValidEmail && scope.isValidPassword && scope.isValidRePassword) {
            serverFactory.saveitemdetails(scope,scope.signupuserdetails,'registeredmember');
          }
        };
        scope.managesaveitem = function (data) {
          if (data.error === ''){
            scope.signupdone = true;
          }
          else {
            scope.errorMessage = data.error;
            scope.signupuserdetails = data.userobject;
          }
        }
      }
    };
  });
