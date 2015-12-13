<?php
require_once dirname(__FILE__) . '/common/objectbase.php';
class pagebase extends objectbase {
  public function Save() {
    //manually set the page name
    //for now only set page name if this page has never been published
    //this implies that the user can keep changing the name but only as long as the page has never been published
    if ($this->publishdate == '' || !isset($this->publishdate) || is_null($this->publishdate)) {
      $this->pagename = str_replace(' ', '-', $this->title); // Replaces all spaces with hyphens.
      $this->pagename = preg_replace('/[^A-Za-z0-9\-]/', '', $this->pagename); // Removes special chars.
      $this->pagename = strtolower($this->pagename);
      $this->pagename .= '.php';
    }
    if (!$this->id) {
			$this->createdate = 'now()';
		}
		$this->modifieddate = 'now()';
    objectbase::Save();

  }
  public function Publish() {
    $file_contents = file_get_contents('templates/'. $this->pagetemplate[0]->template . '.template');
    $this->PutPublishFileDetails($file_contents);
    file_put_contents('../../' . $this->pagename,$file_contents);
    $this->publishdate = 'now()';
    $this->Save();
  }
  public function Unpublish() {
    $this->publishdate = '';
    $this->Save();
  }


}
?>
