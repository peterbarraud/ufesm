'use strict';

/**
 * @ngdoc overview
 * @name ufesmMembersOnlyApp
 * @description
 * # ufesmMembersOnlyApp
 *
 * Main module of the application.
 */
angular
  .module('ufesmMembersOnlyApp', [
    'ngRoute','ngCkeditor'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        template: '<log-in></log-in>',
        controller: 'loginCtrl'
      })
      .when('/conversation', {
        template: '<nav-bar></nav-bar><member-conversation></member-conversation>'
        // controller: 'conversationCtrl'
      })
      .when('/onlineapplication', {
        template: '<nav-bar></nav-bar><online-application></online-application>'
        // controller: 'conversationCtrl'
      })
      .when('/pageticker', {
        template: '<nav-bar></nav-bar><page-ticker></page-ticker>'
        // controller: 'conversationCtrl'
      })
      .when('/pagemanager', {
        template: '<nav-bar></nav-bar><page-manager></page-manager>'
        // controller: 'conversationCtrl'
      })
      .when('/sitemenu', {
        template: '<nav-bar></nav-bar><page-menu></page-menu>'
        // controller: 'conversationCtrl'
      })
      .when('/gallerymanager', {
        template: '<nav-bar></nav-bar><gallery-manager></gallery-manager>'
        // controller: 'conversationCtrl'
      })
      .when('/myprofile', {
        template: '<nav-bar></nav-bar><my-profile></my-profile>'
        // controller: 'conversationCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
