<?php
require_once dirname(__FILE__) . '/common/objectbase.php';
class tickeritem extends objectbase {
  public function AddAtPosition($currentitempos) {
    require_once dirname(__FILE__) . '/' . 'tickeritemcollection.php';
    //first: place the new item at one position after the current item
    $this->position = $currentitempos + 1;
    $tickeritemcollection = new tickeritemcollection();
    //next: for every item that has a position greater than the current Items
    //move those items one position down
    foreach ($tickeritemcollection->Items as $tickeritem) {
      if ($tickeritem->position > $currentitempos) {
        $tickeritem->position = $tickeritem->position + 1;
        $tickeritem->Save();
      }
    }
    $this->Save();
    // objectbase::Save();
  }
  //we are overriding Delete because we want to handle postion attr on delete
  public function Delete() {
    require_once dirname(__FILE__) . '/' . 'tickeritemcollection.php';
    $tickeritemcollection = new tickeritemcollection();
    foreach ($tickeritemcollection->Items as $tickeritem) {
      if ($tickeritem->position > $this->position) {
        $tickeritem->position = $tickeritem->position - 1;
        $tickeritem->Save();
      }
    }
    objectbase::Delete();
  }
  public function Move($direction) {
    require_once dirname(__FILE__) . '/' . 'tickeritemcollection.php';
    //the method we're going to use is to swap the postion attrs:
    //of the selected item and the next or previous item
    $currentitempos = $this->position;
    //if direction = up: place the selected item at position one less than current
    $this->position = $direction == 'up' ? $currentitempos - 1 : $currentitempos + 1;
    $attrs['position'] = $direction == 'up' ? $currentitempos - 1 : $currentitempos + 1;
    $tickeritemcollection = new tickeritemcollection($attrs);
    if ($tickeritemcollection->Length == 1) {
      $tickeritemcollection->Items[0]->position = $direction == 'up' ? $tickeritemcollection->Items[0]->position + 1 : $tickeritemcollection->Items[0]->position - 1;
      $tickeritemcollection->Items[0]->Save();
      objectbase::Save();
    }

  }

}
?>
