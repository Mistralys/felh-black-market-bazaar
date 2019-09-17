<?php

declare(strict_types=1);

namespace FELH;

require_once 'Items.php';
require_once 'Reader.php';

class Editor
{
    protected $items;
    
    protected $page = 'list';
    
    public function __construct()
    {
        $this->items = new Items();
        $this->items->addFolder(APP_ROOT.'/../Black Market Bazaar');
        $this->items->load();
    }
    
    public function display()
    {
        $items = $this->items->getItems();
        
        foreach($items as $item)
        {
            echo $item->getLabel().'<br>';
        }
    }
}
