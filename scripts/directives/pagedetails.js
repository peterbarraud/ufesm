'use strict';

/**
 * @ngdoc directive
 * @name peterbdotin.directive:eventPod
 * @description
 * # eventPod
 */
angular.module('ufesmMembersOnlyApp')
  .directive('pageDetails', function ($rootScope,serverFactory,util) {
    return {
      templateUrl: 'views/page-details.html',
      restrict: 'E',
      replace:true,
      link: function postLink(scope,element, attrs) {
        //default mode when the page manager loads, we want the help page to show up
        scope.mode = 'help';
        scope.pagedetails = null;
        scope.ckeditorIsReady = true;
        scope.waiting = false;
        scope.frmpagedetails.$setPristine();
        serverFactory.contentpagelist(scope);
        serverFactory.getitems('pagetemplate',scope,'getpagetemplates');
        scope.$on("ckeditor.ready", function( event ) {scope.ckeditorIsReady = true;});
        // serverFactory.getitems('pageitem',scope,'listofpages_callback');
        scope.getaggregatepagecolstyle = function (index){
          if (angular.isDefined(scope.pagedetails) && scope.pagedetails !== null && angular.isDefined(scope.pagedetails.pagetemplate)){
            return scope.pagedetails.pagetemplate[index].template === 'aggregate' ? 'col-xs-6' : 'col-xs-4';

          }
        }
        scope.new = function () {
          $('#pagetemplateModal').modal('show');
          // serverFactory.getitem(-1,'pageitem',scope,'new_callback');
        };
        scope.getpagetemplates = function (data) {
          scope.pagetemplates = data.Items;
        }
        scope.usethistemplate = function () {
          var selectedPageTemplateID = $('input[name=pagetemplatetype]:checked').val();
          angular.forEach (scope.pagetemplates,function(pagetemplate){
            if (pagetemplate.id === selectedPageTemplateID){
              scope.selectedPageTemplate = pagetemplate;
            }
          });
          serverFactory.getitem(-1,scope.selectedPageTemplate.pagetype,scope,'usethistemplate_callback');
          scope.mode = 'new';
        }
        scope.usethistemplate_callback = function(data){
          scope.mode = 'new';
          scope.pagedetails = data;
          scope.pagedetails.pagetemplate.push(scope.selectedPageTemplate);
        }
        scope.contentpagelist_callback = function (data) {
          scope.contentpages = data.Items;
        }
        scope.openchoosestorydialog = function(pageindex) {
          //user MUST add items no necessarily in a sequence but cannot leave spaces in between
          if (pageindex > scope.pagedetails.pageitem.length){
            alert('There are empty boxes still not filled between the page you have chosen and the previous selected page. Please fill in the empty spaces in between. You can leave empty spaces at the end.')

          }
          else {
            scope.selectedPageIndex = pageindex;
            $('#contentpagelistModal').modal('show');

          }

        }
        scope.addchosenpage = function(contentpage){
          scope.pagedetails.pageitem[scope.selectedPageIndex] = contentpage;
        }



        scope.save = function () {
          if (scope.pagedetails.title === null) {
            alert('Please enter a title for the page.')
          }
          else {
            //commenting out the next line. TODO: not too sure why that was done
            // scope.pagedetails.pageitem = [];
            $('#statusBoxTitle').text('Save');
            $('#statusBoxMessage').text('Saving the current page...');
            $('#statusBox').modal('show');
            serverFactory.saveitemdetails(scope,scope.pagedetails,scope.pagedetails.pagetemplate[0].pagetype);
          }

        }


        scope.publish = function () {
          //only publish if the page is not dirty and it at least has a title
          if (scope.frmpagedetails.$dirty === false && scope.pagedetails.title !== null) {
            serverFactory.publish(scope);
          }
          else {
            alert('There are some unsaved changes on this page. Please click Save and then come back and publish the page.');
          }
        }
        scope.unpublish = function () {
          serverFactory.unpublish(scope);
        }
        scope.publishall = function () {
          if (confirm("Are you sure you want to republish all aritcles?")) {
            serverFactory.publishall(scope);
          }
        }
        scope.new_callback = function (data){
          scope.mode = 'new';
          scope.pagedetails = data;
        }
        scope.edit_callback = function (data){
          scope.mode = data.readonly === "1" ? 'readonly' : 'edit';
          scope.pagedetails = data;
          scope.waiting = false;
        }
        scope.listofpages_callback = function(data) {
          scope.listofpages = data;
        }
        scope.managepublish = function(data) {
          alert('Publish successful');
        }
        scope.managepublishall = function(data) {
          alert('Publish All successful');
        }
        scope.manageunpublish = function(data) {
          alert('Unpublish All successful');
        }
        scope.managesaveitem = function (data){
          //finally update the page list
          $rootScope.listupdated += 1;
          scope.mode = 'new';
          scope.pagedetails = data;
          scope.frmpagedetails.$setPristine();
          $('#statusBoxMessage').text('Saved succesfully!. Please close this dialog to continue');
        }
        $rootScope.$watch('selectedPageId',function (new_selectedPageId,old_selectedPageId){
          if (new_selectedPageId !== old_selectedPageId) {
            scope.waiting = true;
            serverFactory.getitem(new_selectedPageId,$rootScope.selectedPageType,scope,'edit_callback');
          }
        });
      }
    };
  });
