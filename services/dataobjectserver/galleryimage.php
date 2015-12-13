<?php
require_once dirname(__FILE__) . '/common/objectbase.php';
class galleryimage extends objectbase {
  public function Delete() {
    require_once dirname(__FILE__) . '/' . 'galleryimagecollection.php';
    $galleryimagecollection = new galleryimagecollection();
    foreach ($galleryimagecollection->Items as $item) {
      if ($item->position > $this->position) {
        $item->position -= 1;
        $item->Save();
      }
    }


    objectbase::Delete();
  }
  public function AddFile($direction,$application) {
    $retval = array();
		$retval['error'] = '';
		if ( 0 < $_FILES['file']['error'] ) {
				 $retval['error'] = $_FILES['file']['error'];
     }
     else {
       $uploadfilename = $_FILES['file']['name'];
       $uniqueappend = '';
       $counter = 0;
       while (sizeof(glob('../../images/' . pathinfo($uploadfilename)['filename'] . $uniqueappend . '.' . pathinfo($uploadfilename)['extension'])) > 0) {
         $counter += 1;
         $uniqueappend = '-' . $counter;
       }
       $uploadfilename = pathinfo($uploadfilename)['filename'] . $uniqueappend . '.' . pathinfo($uploadfilename)['extension'];
       move_uploaded_file($_FILES['file']['tmp_name'], '../../images/' . $uploadfilename);
       //now update the galleryimage table
       $newitem = new galleryimage(-1);
       $newitem->name = $uploadfilename;
       require_once dirname(__FILE__) . '/' . 'galleryimagecollection.php';
       if ($direction == 'after') {
         //current item position stays same
         //new item position is one greater than current item
         $newitem->position = $this->position + 1;
         //all items after the current item will have a position one greater than the new item
         $galleryimagecollection = new galleryimagecollection();
         foreach ($galleryimagecollection->Items as $item) {
           if ($item->position > $this->position) {
             $item->position += 1;
             $item->Save();
           }
         }
       }
       elseif ($direction == 'before') {
         //current item position stays same
         //new item position is one greater than current item
         $newitem->position = $this->position;
         //all items after the current item will have a position one greater than the new item
         $galleryimagecollection = new galleryimagecollection();
         foreach ($galleryimagecollection->Items as $item) {
           if ($item->position > $newitem->position-1) {
             $item->position += 1;
             $item->Save();
           }
         }
       }
       $newitem->Save();

      $sortby['position'] = 'asc';
      $items = $application->GetObjectsByClassName('galleryimage',$sortby);
      $retval['data'] = $items;
     }
     return $retval;
  }
}
?>
