<?php
	//file_put_contents('getstarted.log',1);
  //VERY IMPORTANT
  //these services will NEVER error out.
  //at the service we will stop any errors and send back a good json but packaged with error information
	require_once 'Slim/Slim.php';
	require_once 'dataobjectserver/common/logger.php';
	use Slim\Slim;
	Slim::registerAutoloader();
	$app = new Slim();
	//a single rest API is self-sufficient - so how about the db connection is made at the API level
	//this connection object - held inside a global variable or something of that sort is then available to every method, object that is invokved from the API
	//this ensures that a single connection is opened for the entire duration of the API but no more
	//we can then also (brilliant, this one) make full use of db transactions - we can do a full commit / rollback of everything that happened for the duration of the API

	$app->get('/getitem/:itemtype/:itemid/',function($itemtype,$itemid) {
		require_once 'dataobjectserver/application.php';
		$application = Application::getinstance();
		$itemdetails = $application->GetObjectById($itemtype,$itemid,1);
		allow_cross_domain_calls();
		echo json_encode($itemdetails);
	});
	$app->get('/getitems/:itemtype/',function($itemtype) {
		require_once 'dataobjectserver/application.php';
		$application = Application::getinstance();
		$items = $application->GetObjectsByClassName($itemtype);
		allow_cross_domain_calls();
		echo json_encode($items);
	});
	$app->get('/getpagelist/',function() {
		require_once 'dataobjectserver/application.php';
		$application = Application::getinstance();
		$retval = array();
		$sortby['modifieddate'] = 'desc';
		$retval['pageitem'] = $application->GetObjectsByClassName('pageitem',$sortby);
		$sortby['modifieddate'] = 'desc';
		$retval['pageaggregate'] = $application->GetObjectsByClassName('pageaggregate',$sortby);
		allow_cross_domain_calls();
		echo json_encode($retval);
	});
	$app->get('/listofpublishedpages/',function() {
		require_once 'dataobjectserver/application.php';
		$application = Application::getinstance();
		$sortby['modifieddate'] = 'desc';
		$items = $application->GetObjectsByClassName('pageitem',$sortby);
		//this should be in the pageitem class and create a custom function to do this
		$retval = array();
		foreach ($items->Items as $item) {
			if (!is_null($item->publishdate)){
				array_push($retval,$item);
			}
		}
		allow_cross_domain_calls();
		echo json_encode($retval);
	});
	$app->get('/getpagemenu/',function() {
		require_once 'dataobjectserver/application.php';
		$application = Application::getinstance();
		$sortby['position'] = 'asc';
		$items = $application->GetObjectsByClassName('menuitem',$sortby);
		// $items->GetPageMenu();
		allow_cross_domain_calls();
		echo json_encode($items);
	});


	//picture gallery APIs
	$app->get('/getgallerydata/',function() {
		require_once 'dataobjectserver/application.php';
		$application = Application::getinstance();
		$sortby['position'] = 'asc';
		$items = $application->GetObjectsByClassName('galleryimage',$sortby);
		echo json_encode($items);
	});
	$app->get('/addgallerypicture/:pictureid/:direction/',function($pictureid,$direction) {
		require_once 'dataobjectserver/application.php';
		$application = Application::getinstance();
		$sortby['position'] = 'asc';
		$items = $application->GetObjectsByClassName('galleryimage',$sortby);
		echo json_encode($items);
	});
	$app->get('/removegallerypicture/:pictureid/',function($pictureid) {
		require_once 'dataobjectserver/application.php';
		$application = Application::getinstance();
		$itemdetails = $application->GetObjectById('galleryimage',$pictureid);
		$itemdetails->Delete();
		$sortby['position'] = 'asc';
		$items = $application->GetObjectsByClassName('galleryimage',$sortby);
		echo json_encode($items);
	});
	$app->get('/movegallerypicture/:pictureid/:direction/',function($pictureid,$direction) {
		require_once 'dataobjectserver/application.php';
		$application = Application::getinstance();
		$thisitem = $application->GetObjectById('galleryimage',$pictureid);
		if ($direction == 'right') {
			$thisitem->position += 1;
			$otheritemattrs['position'] = $thisitem->position;
			$otheritems = $application->GetObjectsByClassNameAndAttributes('galleryimage',$otheritemattrs);
			foreach ($otheritems->Items as $otheritem) {
				$otheritem->position -= 1;
				$thisitem->Save();
				$otheritem->Save();
			}
		}
		elseif ($direction == 'left') {
			$thisitem->position -= 1;
			$otheritemattrs['position'] = $thisitem->position;
			$otheritems = $application->GetObjectsByClassNameAndAttributes('galleryimage',$otheritemattrs);
			foreach ($otheritems->Items as $otheritem) {
				$otheritem->position += 1;
				$thisitem->Save();
				$otheritem->Save();
			}
		}

		$sortby['position'] = 'asc';
		$items = $application->GetObjectsByClassName('galleryimage',$sortby);
		echo json_encode($items);
	});



	$app->get('/gettickeritems/',function() {
		require_once 'dataobjectserver/application.php';
		$application = Application::getinstance();
		$sortby['position'] = 'asc';
		$items = $application->GetObjectsByClassName('tickeritem',$sortby);
		allow_cross_domain_calls();
		echo json_encode($items);
	});
	$app->get('/publish/:pageid/:itemtype/',function($pageid,$itemtype) {
		require_once 'dataobjectserver/application.php';
		$application = Application::getinstance();
		$page = $application->GetObjectById($itemtype,$pageid,1);
		$page->Publish();
		allow_cross_domain_calls();
		echo json_encode($page);
	});
	$app->get('/unpublish/:pageid/',function($pageid) {
		require_once 'dataobjectserver/application.php';
		$application = Application::getinstance();
		$pageitem = $application->GetObjectById('pageitem',$pageid);
		$pageitem->Unpublish();
		allow_cross_domain_calls();
		echo json_encode($pageitem);
	});
	$app->get('/publishall/',function() {
		require_once 'dataobjectserver/application.php';
		$application = Application::getinstance();
		$pageitemcollection = $application->GetObjectsByClassName('pageitem');
		$pageitemcollection->PublishAll();
		allow_cross_domain_calls();
		echo json_encode($pageitemcollection);
	});


	$app->get('/validateuser/:email/:password/',function($email,$password) {
		require_once 'dataobjectserver/application.php';
		$application = Application::getinstance();
		$classAttrs = array();
		$classAttrs['email'] = $email;
		$classAttrs['password'] = $password;
		$user = $application->GetObjectsByClassNameAndAttributes('registeredmember',$classAttrs,null,1);
		$ret_val = array();
		if ($user->Length == 1) {
			$ret_val['success'] = 1;
			$ret_val['error'] = '';
			$ret_val['userobject'] = $user->Items[0];
		}
		else {
			$ret_val['success'] = 0;
			$ret_val['error'] = 'Invalid user name and / or password. If you have forgotten your password, we will email it to you. If you don\'t have a login, sign up now';
		}
		allow_cross_domain_calls();
		echo json_encode($ret_val);
	});


	$app->post('/createnewuser/',function() use ($app) {
		require_once 'dataobjectserver/application.php';
		$retval = array();
		$application = Application::getinstance();
		$itemdetails = $application->GetObjectForJSON(json_decode($app->request->post('itemObject')),'registeredmember');
		//first check if a user with this email already exists
		$classAttrValuePairs['email'] = $itemdetails->email;
		$existingmembers = $application->GetObjectsByClassNameAndAttributes('registeredmember',$classAttrValuePairs);
		if ($existingmembers->Length == 1) {
			$retval['error'] = 'There already exists a user with the email ' . $itemdetails->email . '. If you already have an account with us, use the Forgot Password link and we will resend the password to your email address. Else, you will need to create an account with another email address.';
			//let's return back the object that we got. just that we'll remove the email. user will need to use another email address
			$itemdetails->email = '';
		}
		else {
			//cast the json object to a well formed php object based on the data object model
			$itemdetails = $application->GetObjectForJSON(json_decode($app->request->post('itemObject')),'registeredmember');
			if (!$itemdetails->id) {
				$itemdetails->createdate = 'now()';
			}
			$itemdetails->Save();
			$retval['error'] = '';
		}

		$retval['userobject'] = $itemdetails;
		allow_cross_domain_calls();
		echo json_encode($retval);
	});
	$app->post('/saveitem/:itemtype/',function($itemtype) use ($app) {
		require_once 'dataobjectserver/application.php';
		$application = Application::getinstance();
		// $logger = new Logger('saveitem');
		// $logger->AppendLine($app->request->post('itemObject'));
		// $logger->AppendLine($itemtype);
		//cast the json object to a well formed php object based on the data object model
		$itemdetails = $application->GetObjectForJSON(json_decode($app->request->post('itemObject')),$itemtype);
		$itemdetails->Save();
		allow_cross_domain_calls();
		echo json_encode($itemdetails);
	});
	$app->get('/testsave/',function() {
		$saveitemdetails = '{"ServerErr":"","ServerErrNo":0,"ServerErrType":"","id":"20","title":"abcde","subtitle":"efdddd\n","body":"<p>efddddkkkk</p>\n\n<p>sss</p>\n","titleimage":null,"publishdate":null,"pagename":"abcde.php","createdate":"2015-12-23 08:32:45","modifieddate":"2015-12-23 08:35:50","readonly":null,"pageaggregate":[],"pageitem":[],"pagetemplate":[{"ServerErr":"","ServerErrNo":0,"ServerErrType":"","id":"2","pagetype":"pageitem","description":"Use this template to create detail page that have content such as body text, images etc","title":"Content page","template":"content"}],"tag":[]}';
		$itemtype = 'pageitem';
		require_once 'dataobjectserver/application.php';
		$application = Application::getinstance();
		$itemdetails = $application->GetObjectForJSON(json_decode($saveitemdetails),$itemtype);
		$itemdetails->Save();
		echo $itemdetails;
	});

	$app->post('/executesqlquery/',function() use ($app) {
		require_once 'dataobjectserver/application.php';
		$application = Application::getinstance();
		//cast the json object to a well formed php object based on the data object model
		$sqlquery = $app->request->post('sqlquery');
		$object = $application->GetObjectById('menuitem',-1,0);
		$result = $object->ExecuteSQLQuery($sqlquery);
		allow_cross_domain_calls();
		echo json_encode($result);
	});


	$app->post('/savemenuitem/:selectedItemID/',function($selectedItemID) use ($app) {
		require_once 'dataobjectserver/application.php';
		$application = Application::getinstance();
		//cast the json object to a well formed php object based on the data object model
		$itemdetails = $application->GetObjectForJSON(json_decode($app->request->post('itemObject')),'menuitem');
		$itemdetails->SaveMenuItem($selectedItemID);
		$sortby['position'] = 'asc';
		$items = $application->GetObjectsByClassName('menuitem',$sortby);
		allow_cross_domain_calls();
		echo json_encode($items);
	});

	$app->get('/savemenuitemtest/:selectedItemID/',function($selectedItemID) {
		$itemObject = '{"ServerErr":"","ServerErrNo":0,"ServerErrType":"","id":null,"position":2,"level":0,"title":"t2","pagetype":"title","pagename":null,"pageid":null,"parentid":null}';

		require_once 'dataobjectserver/application.php';
		$application = Application::getinstance();
		//cast the json object to a well formed php object based on the data object model
		$itemdetails = $application->GetObjectForJSON(json_decode($itemObject),'menuitem');
		$itemdetails->SaveMenuItem($selectedItemID);

	});

	$app->get('/deletemenuitem/:menuid/',function($menuid) {
		require_once 'dataobjectserver/application.php';
		$application = Application::getinstance();
		$pageitem = $application->GetObjectById('menuitem',$menuid);
		$pageitem->DeleteMenuItem();
		$sortby['position'] = 'asc';
		$items = $application->GetObjectsByClassName('menuitem',$sortby);
		allow_cross_domain_calls();
		echo json_encode($items);
	});

	$app->get('/deletemenuitemtest/:menuid/',function($menuid) {
		require_once 'dataobjectserver/application.php';
		$application = Application::getinstance();
		$menuitem = $application->GetObjectById('menuitem',$menuid);
		$menuitem->DeleteMenuItem();
	});

	$app->post('/fileupload_lastknowngood/:itemtype/:currentitemid/:direction/',function($itemtype,$currentitemid,$direction) use ($app) {
		require_once 'dataobjectserver/application.php';
		$application = Application::getinstance();
		//get the currently selected image
		//we need to add the new image into the galleryimage table before or after the current image
		$itemdetails = $application->GetObjectById($itemtype,$currentitemid,1);
		$retval = array();
		$retval['error'] = '';
		if ( 0 < $_FILES['file']['error'] ) {
         echo 'Error: ' . $_FILES['file']['error'] . '<br>';
				 $retval['error'] = $_FILES['file']['error'];
     }
     else {
         move_uploaded_file($_FILES['file']['tmp_name'], '../../images/' . $_FILES['file']['name']);
				//TODO: this gallery image uplod-specific code. this should ideally be a generic file upload funcion

				$sortby['position'] = 'asc';
				$items = $application->GetObjectsByClassName('galleryimage',$sortby);
				$retval['data'] = $items;
     }
		// $itemdetails->Save();
		allow_cross_domain_calls();
		echo json_encode($retval);
	});

	$app->post('/fileupload/:itemtype/:currentitemid/:direction/',function($itemtype,$currentitemid,$direction) use ($app) {
		require_once 'dataobjectserver/application.php';
		$application = Application::getinstance();
		//get the currently selected image
		//we need to add the new image into the galleryimage table before or after the current image
		$itemdetails = $application->GetObjectById($itemtype,$currentitemid,1);
		$retval = $itemdetails->AddFile($direction,$application);
		// $itemdetails->Save();
		allow_cross_domain_calls();
		echo json_encode($retval);
	});

	$app->post('/deleteitem/:itemtype/',function($itemtype) use ($app) {

		require_once 'dataobjectserver/application.php';
		$application = Application::getinstance();
		//cast the json object to a well formed php object based on the data object model
		$itemdetails = $application->GetObjectForJSON(json_decode($app->request->post('itemObject')),$itemtype);
		$itemdetails->Delete();
		allow_cross_domain_calls();
		echo json_encode($itemdetails->id);
	});

	$app->post('/addtickeratposition/:currentitempos/',function($currentitempos) use ($app) {
		require_once 'dataobjectserver/application.php';
		$application = Application::getinstance();
		//cast the json object to a well formed php object based on the data object model
		$itemdetails = $application->GetObjectForJSON(json_decode($app->request->post('itemObject')),'tickeritem');
		$itemdetails->AddAtPosition($currentitempos);
		allow_cross_domain_calls();
		echo json_encode($itemdetails);
	});

	$app->post('/movetickerposition/:direction/',function($direction) use ($app) {
		require_once 'dataobjectserver/application.php';
		$application = Application::getinstance();
		//cast the json object to a well formed php object based on the data object model
		$itemdetails = $application->GetObjectForJSON(json_decode($app->request->post('itemObject')),'tickeritem');
		$itemdetails->Move($direction);
		allow_cross_domain_calls();
		echo json_encode($itemdetails);
	});
	$app->post('/movepage/:direction/',function($direction) use ($app) {
		require_once 'dataobjectserver/application.php';
		$application = Application::getinstance();
		//cast the json object to a well formed php object based on the data object model
		$itemdetails = $application->GetObjectForJSON(json_decode($app->request->post('itemObject')),'pageitem');
		$itemdetails->Move($direction);
		allow_cross_domain_calls();
		echo json_encode($itemdetails);
	});

	$app->run();


function allow_cross_domain_calls() {

    // Allow from any origin
    if (isset($_SERVER['HTTP_ORIGIN'])) {
        header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Max-Age: 86400');    // cache for 1 day
    }

    // Access-Control headers are received during OPTIONS requests
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
            header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
            header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

        exit(0);
    }

    //echo "You have CORS!";
}
?>
