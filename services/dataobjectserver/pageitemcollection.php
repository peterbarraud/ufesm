<?php
require_once dirname(__FILE__) . '/common/collectionbase.php';
class pageitemcollection extends collectionbase {

  public function PublishAll(){
    foreach ($this->Items as $item) {
      if ($item->readonly != '1') {
        $item->Publish();        
      }
    }
  }


  public function MakePageMenu(){

    $menu = array();
    $menu_items = array();
    foreach ($this->Items as $item) {
      if (sizeof($item->pageitem)) {
        foreach ($item->pageitem as $pageitem){
          $array = array_key_exists ( $pageitem->id , $menu_items ) ? $menu_items[$pageitem->id] : array();
          array_push($array,$item);
          $menu_items[$pageitem->id] = $array;
        }
        $item->pageitem = array();
      }
      else {
        array_push($menu,$item);
      }
    }

    $this->Items = array();
    foreach ($menu as $item) {
      // $item->pageitem = ;
      // $item->pageitem = $menu_items[$item->id];
      if (array_key_exists($item->id,$menu_items)) {
        $item->pageitem = $menu_items[$item->id];
      }

      array_push($this->Items,$item);
    }
    $this->Length = sizeof($this->Items);


  }
}
?>
