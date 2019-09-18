<?php

declare(strict_types=1);

namespace FELH;

class Editor
{
   /**
    * @var Items
    */
    protected $items;
    
    public function __construct($webrootFolder)
    {
        $this->items = new Items();
        $this->items->addFolder($webrootFolder.'/../Black Market Bazaar');
        $this->items->load();
    }
    
    public function getItems()
    {
        return $this->items->getItems();
    }
}
