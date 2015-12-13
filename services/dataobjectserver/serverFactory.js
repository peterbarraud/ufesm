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
angular.module('peterbdotin')
  .factory('serverFactory', function ($http,util) {
	  var m_userObject = null;
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
		
      checkusercredentials: function(scope,location) {
        $http.get('services/in.thecorrespondent.restapi.php/validateuser/' + scope.email + '/' + scope.password).
          success(function(data, status, headers, config) {
			  if (data.success) {
				  var startlocation = null;				  
				  data.userobject.appsection.forEach (function(appSec) {
					  if (appSec.sectionname === 'storyadmin') {
						  startlocation = 'storyadmin';
					  }
						  
				  });
				  if (startlocation === null) {
					  startlocation = data.userobject.appsection[0].sectionname;
				  }
				  m_userObject = data.userobject;
				  location.path( "/" +  startlocation);
			  }
			  else {
				  scope.invalid_user_cred = data.error;
			  }
          }).
          error(function(data, status, headers, config) {
			  scope.invalid_user_cred = data.error;
          });        
      },
      //we are going to use scope callbacks to handle multiple directive calls to identical factory methods
      //the specific directive functionality should be handled in the directive itselt. not in the factory. (mostly thanks to Ed Seckler)
      getitem : function(itemid,itemtype,scope) {
        $http.get('services/in.thecorrespondent.restapi.php/getitem/' + itemtype + '/' + itemid).
          success(function(data, status, headers, config) {
			  scope.manageitem(data);
          }).
          error(function(data, status, headers, config) {
            console.log(data);
          });        
      },

      getitems : function(itemtype,scope,callback) {
        $http.get('services/in.thecorrespondent.restapi.php/getitems/' + itemtype).
          success(function(data, status, headers, config) {
			  var dyn_functions = [];
			  scope[callback](data);
          }).
          error(function(data, status, headers, config) {
            console.log(data);
          });        
      },
      getitemsbydate : function(scope,itemtype,callback) {
        $http.get('services/in.thecorrespondent.restapi.php/getitemsbydate/' + itemtype).
          success(function(data, status, headers, config) {
			  scope[callback](data);
          }).
          error(function(data, status, headers, config) {
            console.log(data);
          });        
      },
      getcategoryitems : function(scope,callback) {
        $http.get('services/in.thecorrespondent.restapi.php/getitemsbydate').
          success(function(data, status, headers, config) {
			  scope[callback](data);
          }).
          error(function(data, status, headers, config) {
            console.log(data);
          });        
      },
      
      
      

      saveitemdetails : function(scope,itemtype) {
        var paramsObject = {itemObject:JSON.stringify(scope.itemDetails)};
        var httpPostParams = [];
        for (var key in paramsObject) {
          httpPostParams.push(key + '=' + encodeURIComponent(paramsObject[key]));
        }
        httpPostParams = httpPostParams.join('&');
        $http({
          method: 'POST',
          url: 'services/in.thecorrespondent.restapi.php/saveitem/' + itemtype,
          data: httpPostParams,
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).
        success(function(data, status, headers, config) {
			scope.managesaveitem (data);
        }).
        error(function(data, status, headers, config) {
          console.log(data);
        });
        //util.httpPost(paramsObject,$http,);
      },

      publishitem : function(itemid,itemtype,scope) {
        $http.get('services/in.thecorrespondent.restapi.php/publishitem/' + itemtype + '/' + itemid).
          success(function(data, status, headers, config) {
			  scope.managepublisheditem(data);
          }).
          error(function(data, status, headers, config) {
            console.log(data);
          });        
      },
    };   
  });
