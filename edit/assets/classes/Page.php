<?php

namespace FELH;

abstract class Page extends \Microsite\Page
{
   /**
    * @var Site
    */
    protected $site;
    
    /**
     * @var Editor
     */
    protected $editor;
    
   /**
    * @var Items
    */
    protected $items;
    
    protected function init()
    {
        $this->editor = $this->site->createEditor();
        $this->items = $this->editor->getItems();
    }
}
