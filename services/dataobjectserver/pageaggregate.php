<?php
require_once dirname(__FILE__) . '/pagebase.php';
class pageaggregate extends pagebase {
  public function PutPublishFileDetails(&$file_contents){
    $file_contents = str_replace('[[page-title]]',$this->title,$file_contents);
    //now add each to the template
    for ($i=0;$i<4;$i++){
      $pos = $i+1;
      $file_contents = str_replace('[[story-'. $pos . '-title]]',$this->pageitem[$i]->title,$file_contents);
      $file_contents = str_replace('[[story-'. $pos . '-content]]',$this->pageitem[$i]->body,$file_contents);
      $file_contents = str_replace('[[story-'. $pos . '-pagename]]',$this->pageitem[$i]->pagename,$file_contents);

    }
  }
}
?>
