// TODO This factory is supposed to be customized once integrated
// into loggly. Currently it serves dummy data.

'use strict';

/**
 * @ngdoc service
 * @name peterbdotin.serverFactory
 * @description
 * # serverFactory
 * Factory in the peterbdotin.
 */
angular.module('ufesmMembersOnlyApp')
  .factory('serverFactory', function ($http,util,$location) {
	  var m_userObject = null;
	  var m_tickeritems = null;
    return {
		getUserObject : function () {
			return m_userObject;
		},
		destroyUserObject : function () {
			m_userObject = null;
		},
		isBadUser : function(sectionname) {
			var ret_val = true;
			if (m_userObject !== null) {
			  m_userObject.appsection.forEach (function(appSec) {
				  if (appSec.sectionname === sectionname) {
					  ret_val = false;
				  }
			  });
			}
			return ret_val;
		},


    checkusercredentials: function(scope) {
      $http.get('services/rest.api.php/validateuser/' + scope.loginguser.email + '/' + scope.loginguser.password).
        success(function(data, status, headers, config) {
          scope.manageuserlogin(data);
        }).
        error(function(data, status, headers, config) {
          scope.invalid_user_cred = data.error;
        });
    },

    //we are going to use scope callbacks to handle multiple directive calls to identical factory methods
    //the specific directive functionality should be handled in the directive itselt. not in the factory. (mostly thanks to Ed Seckler)
    getitem : function(itemid,itemtype,scope,callback) {
      $http.get(util.restAPIURL($location) + 'rest.api.php/getitem/' + itemtype + '/' + itemid).
      success(function(data, status, headers, config) {
        scope[callback](data);
        }).
      error(function(data, status, headers, config) {
        console.log(data);
        });
    },

    getitems : function(itemtype,scope,callback) {
      $http.get(util.restAPIURL($location) + 'rest.api.php/getitems/' + itemtype).
        success(function(data, status, headers, config) {
          scope[callback](data);
        }).
        error(function(data, status, headers, config) {
          console.log(data);
        });
    },

    getpagemenu_old : function(scope) {
      $http.get(util.restAPIURL($location) + 'rest.api.php/getpagemenu/').
        success(function(data, status, headers, config) {
          scope.managegetmenu(data);
        }).
        error(function(data, status, headers, config) {
          console.log(data);
        });
    },

    getpagemenu : function(scope) {
      $http.get(util.restAPIURL($location) + 'rest.api.php/getpagemenu/').
        success(function(data, status, headers, config) {
          scope.managegetmenu(data);
        }).
        error(function(data, status, headers, config) {
          console.log(data);
        });
    },
    contentpagelist: function (scope) {
      $http.get(util.restAPIURL($location) + 'rest.api.php/getitems/pageitem/').
        success(function(data, status, headers, config) {
          scope.contentpagelist_callback(data);
        }).
        error(function(data, status, headers, config) {
          console.log(data);
        });
    },


    listofpages : function(scope) {
      $http.get(util.restAPIURL($location) + 'rest.api.php/getpagelist/').
        success(function(data, status, headers, config) {
          scope.listofpages_callback(data);
        }).
        error(function(data, status, headers, config) {
          console.log(data);
        });
    },

    getgallerydata : function(scope) {
      $http.get(util.restAPIURL($location) + 'rest.api.php/getgallerydata/').
        success(function(data, status, headers, config) {
          scope.getgallerydata_callback(data);
        }).
        error(function(data, status, headers, config) {
          console.log('data');
          console.log(data);
        });
    },

    addgallerypicture : function(scope,direction) {
      $http.get(util.restAPIURL($location) + 'rest.api.php/addgallerypicture/' + scope.selectedImageID + '/' + direction + '/').
        success(function(data, status, headers, config) {
          scope.galleryupdate_callback(data);
        }).
        error(function(data, status, headers, config) {
          console.log(data);
        });
    },

    removegallerypicture : function(scope) {
      $http.get(util.restAPIURL($location) + 'rest.api.php/removegallerypicture/' + scope.selectedImageID + '/').
        success(function(data, status, headers, config) {
          scope.galleryupdate_callback(data);
        }).
        error(function(data, status, headers, config) {
          console.log(data);
        });
    },
    fileupload : function (scope,imgformid,direction){
      var file_data = $('#' + imgformid).prop('files')[0];
      if (angular.isDefined(file_data)){
        var form_data = new FormData();
        form_data.append('file', file_data);
        $.ajax({
          url: util.restAPIURL($location) + 'rest.api.php/fileupload/galleryimage/' + scope.selectedImageID + '/' + direction + '/', // point to server-side PHP script
          dataType: 'json',  // what to expect back from the PHP script, if anything
          cache: false,
          contentType: false,
          processData: false,
          data: form_data,
          type: 'post',
          success: function(data){
            scope.galleryupdate_callback(data.data);
          }
         });
      }
      else {
        alert('Please select a file to upload')
      }
    },

    movegallerypicture : function(scope,direction) {
      $http.get(util.restAPIURL($location) + 'rest.api.php/movegallerypicture/' + scope.selectedImageID + '/' + direction + '/').
        success(function(data, status, headers, config) {
          scope.galleryupdate_callback(data);
        }).
        error(function(data, status, headers, config) {
          console.log(data);
        });
    },

    listofpublishedpages : function(scope) {
      $http.get(util.restAPIURL($location) + 'rest.api.php/listofpublishedpages/').
        success(function(data, status, headers, config) {
          scope.listofpages_callback(data);
        }).
        error(function(data, status, headers, config) {
          console.log(data);
        });
    },

    gettickeritems : function(scope) {
      $http.get(util.restAPIURL($location) + 'rest.api.php/gettickeritems/').
        success(function(data, status, headers, config) {
          scope.gotTickerItems(data);
        }).
        error(function(data, status, headers, config) {
          console.log(data);
        });
    },

    publish : function(scope) {
      $http.get(util.restAPIURL($location) + 'rest.api.php/publish/' + scope.pagedetails.id + '/' + scope.pagedetails.pagetemplate[0].pagetype + '/').
        success(function(data, status, headers, config) {
          scope.managepublish(data);
        }).
        error(function(data, status, headers, config) {
          console.log(data);
        });
    },
    unpublish : function(scope) {
      $http.get(util.restAPIURL($location) + 'rest.api.php/unpublish/' + scope.pagedetails.id + '/' + scope.pagedetails.pagetemplate[0].pagetype + '/').
        success(function(data, status, headers, config) {
          scope.manageunpublish(data);
        }).
        error(function(data, status, headers, config) {
          console.log(data);
        });
    },
    publishall : function(scope) {
      $http.get(util.restAPIURL($location) + 'rest.api.php/publishall/').
        success(function(data, status, headers, config) {
          scope.managepublishall(data);
        }).
        error(function(data, status, headers, config) {
          console.log(data);
        });
    },
    // how about a getitemsbyattr to get a generic sorted list
    getitemsbydate : function(scope,itemtype,callback) {
      $http.get(util.restAPIURL($location) + 'rest.api.php/getitemsbydate/' + itemtype).
        success(function(data, status, headers, config) {
          scope[callback](data);
        }).
        error(function(data, status, headers, config) {
          console.log(data);
        });
    },

    saveitemdetails : function(scope,itemDetails,itemtype,callback) {
      var paramsObject = {itemObject:JSON.stringify(itemDetails)};
      var httpPostParams = [];
      for (var key in paramsObject) {
        httpPostParams.push(key + '=' + encodeURIComponent(paramsObject[key]));
      }
      httpPostParams = httpPostParams.join('&');
      $http({
        method: 'POST',
        url: util.restAPIURL($location) + 'rest.api.php/saveitem/' + itemtype + '/',
        data: httpPostParams,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).
      success(function(data, status, headers, config) {
        // actually the callback should not be predefined. but we're keeping this hack here for legacy
        if (angular.isDefined(callback)) {
          scope[callback](data);
        }
        else {
          scope.managesaveitem (data);          
        }
      }).
      error(function(data, status, headers, config) {
        console.log(data);
      });
    },

    executesqlquery : function(scope) {
      var paramsObject = {sqlquery:JSON.stringify(scope.dbquery.query)};
      var httpPostParams = [];
      for (var key in paramsObject) {
        httpPostParams.push(key + '=' + encodeURIComponent(paramsObject[key]));
      }
      httpPostParams = httpPostParams.join('&');
      $http({
        method: 'POST',
        url: util.restAPIURL($location) + 'rest.api.php/executesqlquery/',
        data: httpPostParams,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).
      success(function(data, status, headers, config) {
        scope.handlequeryresult (data);
      }).
      error(function(data, status, headers, config) {
        console.log(data);
      });
    },


    savemenuitem : function(scope) {
      var paramsObject = {itemObject:JSON.stringify(scope.newmenutitle)};
      var httpPostParams = [];
      for (var key in paramsObject) {
        httpPostParams.push(key + '=' + encodeURIComponent(paramsObject[key]));
      }
      httpPostParams = httpPostParams.join('&');
      $http({
        method: 'POST',
        url: util.restAPIURL($location) + 'rest.api.php/savemenuitem/' + scope.menuitemdetails.selectedItem.id + '/' ,
        data: httpPostParams,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).
      success(function(data, status, headers, config) {
        scope.managegetmenu (data);
      }).
      error(function(data, status, headers, config) {
        console.log(data);
      });
    },
    deletemenuitem : function(scope,itemid) {
      $http.get(util.restAPIURL($location) + 'rest.api.php/deletemenuitem/' + itemid).
        success(function(data, status, headers, config) {
          scope.managegetmenu (data);
        }).
        error(function(data, status, headers, config) {
          console.log(data);
        });
    },

    deleteitem : function(scope,itemDetails,itemtype) {
      var paramsObject = {itemObject:JSON.stringify(itemDetails)};
      var httpPostParams = [];
      for (var key in paramsObject) {
        httpPostParams.push(key + '=' + encodeURIComponent(paramsObject[key]));
      }
      httpPostParams = httpPostParams.join('&');
      $http({
        method: 'POST',
        url: util.restAPIURL($location) + 'rest.api.php/deleteitem/' + itemtype + '/',
        data: httpPostParams,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).
      success(function(data, status, headers, config) {
        scope.managedeleteitem (data);
      }).
      error(function(data, status, headers, config) {
        console.log(data);
      });
    },

    addtickeratposition : function(scope,currentitempos) {
      var paramsObject = {itemObject:JSON.stringify(scope.newitem)};
      var httpPostParams = [];
      for (var key in paramsObject) {
        httpPostParams.push(key + '=' + encodeURIComponent(paramsObject[key]));
      }
      httpPostParams = httpPostParams.join('&');
      $http({
        method: 'POST',
        url: util.restAPIURL($location) + 'rest.api.php/addtickeratposition/' + currentitempos + '/',
        data: httpPostParams,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).
      success(function(data, status, headers, config) {
        scope.manageaddticker();
      }).
      error(function(data, status, headers, config) {
        console.log(data);
      });
    },
    movetickerposition : function(scope,direction) {
      var paramsObject = {itemObject:JSON.stringify(scope.tickeritem)};
      var httpPostParams = [];
      for (var key in paramsObject) {
        httpPostParams.push(key + '=' + encodeURIComponent(paramsObject[key]));
      }
      httpPostParams = httpPostParams.join('&');
      $http({
        method: 'POST',
        url: util.restAPIURL($location) + 'rest.api.php/movetickerposition/' + direction + '/',
        data: httpPostParams,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).
      success(function(data, status, headers, config) {
        scope.managemoveticker();
      }).
      error(function(data, status, headers, config) {
        console.log(data);
      });
    },
    movepage : function(scope,direction,pagedetails) {
      var paramsObject = {itemObject:JSON.stringify(pagedetails)};
      var httpPostParams = [];
      for (var key in paramsObject) {
        httpPostParams.push(key + '=' + encodeURIComponent(paramsObject[key]));
      }
      httpPostParams = httpPostParams.join('&');
      $http({
        method: 'POST',
        url: util.restAPIURL($location) + 'rest.api.php/movepage/' + direction + '/',
        data: httpPostParams,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).
      success(function(data, status, headers, config) {
        scope.managemovepage(data);
      }).
      error(function(data, status, headers, config) {
        console.log(data);
      });
    },

    };
  });
