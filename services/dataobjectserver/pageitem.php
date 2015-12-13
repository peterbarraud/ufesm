<?php
require_once dirname(__FILE__) . '/pagebase.php';
class pageitem extends pagebase {
  public function PutPublishFileDetails(&$file_contents){
    $file_contents = str_replace('[[page-title]]',$this->title,$file_contents);
    $file_contents = str_replace('[[page-content]]',$this->body,$file_contents);
  }
  public function Save() {
    $this->subtitle = substr( strip_tags($this->body),0,220);
    parent::Save();
  }
}
?>
