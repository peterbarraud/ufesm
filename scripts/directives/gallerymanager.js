'use strict';

/**
 * @ngdoc directive
 * @name peterbdotin.directive:eventPod
 * @description
 * # eventPod
 */
angular.module('ufesmMembersOnlyApp')
  .directive('galleryManager', function (serverFactory,util) {
    return {
      templateUrl: 'views/gallery-manager.html',
      restrict: 'E',
      replace:true,
      link: function postLink(scope,element, attrs) {
        serverFactory.getgallerydata(scope);
        scope.getimagedetails = function(id){
          scope.selectedImageID = id;
          scope.galleryupdatecomplete = true;
          scope.showfileuploader = false;
          $('#galleryimageModal').modal('show');
        }
        scope.getgallerydata_callback = function(data) {
          scope.galleryimages = data.Items;
        }
        scope.addgallerypicture = function(){
          scope.showfileuploader = true;
        }
        scope.uploadthepicture = function(direction){
          serverFactory.fileupload(scope,'uploadgallerypicture',direction)
          // serverFactory.addgallerypicture(scope,'before');
        }
        scope.remove = function(){
          //we will not allow delete of the last item
          if (scope.galleryimages.length > 1) {
            scope.galleryupdatecomplete = false;
            serverFactory.removegallerypicture(scope);
          }
          else {
            alert('You cannot delete the last gallery picture. Add at least one more picture if you want to delete this picture.')
          }
        }
        scope.moveleft = function(){
          scope.galleryupdatecomplete = false;
          serverFactory.movegallerypicture(scope,'left');
        }
        scope.moveright = function(){
          scope.galleryupdatecomplete = false;
          serverFactory.movegallerypicture(scope,'right');
        }
        scope.galleryupdate_callback = function(data){
          scope.galleryimages = data.Items;
          $('#galleryimageModal').modal('hide');
        }
      }
    };
  });
