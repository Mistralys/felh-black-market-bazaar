<?php

declare(strict_types=1);

namespace FELH;

class Items
{
    protected $folders = array();
    
   /**
    * @var Items_Item[]
    */
    protected $items = array();
    
    public function __construct()
    {
        
    }
    
    public function addFolder(string $folder) : Items
    {
        $this->folders[] = $folder;
        
        return $this;
    }
 
    public function load() : void
    {
        foreach($this->folders as $folder)
        {
            $d = new \DirectoryIterator($folder);
            foreach($d as $item) 
            {
                if(!$item->isFile()) {
                    continue;
                }
                
                $ext = strtolower($item->getExtension());
                if($ext != 'xml') {
                    continue;
                }
                
                $reader = new Reader($this, $item->getPathname());
                $reader->parse();
            }
        }
        
        usort(
            $this->items, 
            function(Items_Item $a, Items_Item $b) {
                return strnatcasecmp($a->getLabel(), $b->getLabel());
            }
        );
    }
    
    public function addItem(\DOMElement $itemNode, Reader $reader)
    {
        $this->items[] = new Items_Item($this, $itemNode, $reader);
    }
    
   /**
    * Retrieves all items, sorted by label.
    * @return Items_Item[]
    */
    public function getItems()
    {
        return $this->items;
    }
}
