<?php
require_once dirname(__FILE__) . '/common/objectbase.php';
class menuitem extends objectbase {
  //this will save the current item but it will also bump up the position of all subsequent items
  public function SaveMenuItem_old(){
    $application = Application::getinstance();
    $items = $application->GetObjectsByClassName('menuitem');
    foreach ($items->Items as $item) {
      if ($item->position >= $this->position){
        $item->position += 1;
        $item->Save();
      }
    }
    $this->Save();
  }
  public function SaveMenuItem($selectedItemID){
    $application = Application::getinstance();
    $items = $application->GetObjectsByClassName('menuitem');
    $selecteditem = $application->GetObjectById('menuitem',$selectedItemID,0);
    $bumpup_after = -1;
    // either if this is a page or if it is a title that cannot have children
    if ($this->level == 1 || !is_null($selecteditem->pageid)){
      if ($this->level == 1){
        $this->parentid = $selecteditem->level == 0 ? $selecteditem->id : $selecteditem->parentid;
      }
      $this->position = $selecteditem->position + 1;
      $bumpup_after = $selecteditem->position;
    }
    else {
      $attr['parentid'] = $selectedItemID;
      $children = $application->GetObjectsByClassNameAndAttributes('menuitem',$attr,0);
      $maxchildpos = -1;
      foreach ($children->Items as $child) {
        $maxchildpos = $child->position ?: $child->position > $maxchildpos;  //if else super shortcut
      }
      if ($maxchildpos == -1){  //the case were an empty title exists (probably temporarily)
        $this->position = $selecteditem->position + 1;
        $bumpup_after = $selecteditem->position;
      }
      else {
        $this->position = $maxchildpos + 1;
        $bumpup_after = $maxchildpos;
      }
    }
    foreach ($items->Items as $item) {
      if ($item->position > $bumpup_after){
        $item->position += 1;
        $item->Save();
      }
    }
    $this->Save();
  }
  public function DeleteMenuItem(){
    $application = Application::getinstance();
    $items = $application->GetObjectsByClassName('menuitem');
    $start_at = $this->position;
    $end_at = $this->position;
    foreach ($items->Items as $item) {
      if ($item->parentid == $this->id){
        $end_at = $item->position > $end_at ? $item->position : $end_at;
        $item->Delete();
      }
    }
    foreach ($items->Items as $item) {
      if ($item->position >  $end_at){
        $item->position = $item->position - ($end_at - $start_at + 1);
        $item->Save();
      }
    }
    $this->Delete();
  }
}
?>
