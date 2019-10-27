<?php

declare(strict_types=1);

namespace FELH;

class Items
{
    const ERROR_UNKNOWN_ITEM_ID = 40201;
    
   /**
    * @var Items_Folder[]
    */
    protected $folders = array();
    
   /**
    * @var Items_Item[]
    */
    protected $items = array();
    
   /**
    * @var Editor
    */
    protected $editor;
    
   /**
    * @var \AppUtils\Request
    */
    protected $request;
    
    public function __construct(Editor $editor)
    {
        $this->editor = $editor;
        $this->request = $editor->getSite()->getRequest();
    }
    
    public function addFolder(string $label, string $folder) : Items
    {
        $this->folders[] = new Items_Folder($label, $folder);
        return $this;
    }
 
    public function load() : void
    {
        foreach($this->folders as $folder)
        {
            $d = new \DirectoryIterator($folder->getPath());
            foreach($d as $item) 
            {
                if(!$item->isFile()) {
                    continue;
                }
                
                $ext = strtolower($item->getExtension());
                if($ext != 'xml') {
                    continue;
                }
                
                $f = fopen($item->getPathname(), 'r');
                $line = fgets($f); // xml declaration
                $seekMax = 10;
                
                for($i=0; $i < $seekMax; $i++) 
                {
                    $line = trim(fgets($f));
                    if(empty($line)) {
                        continue;
                    }
                    
                    if($line[0] == '<' && substr($line, 0, 4) != '<!--') {
                        break;
                    }
                }
                
                fclose($f);
                
                if(!stristr($line, 'GameItemTypes')) {
                    continue;
                }
                
                $reader = new Reader($this, $folder, $item->getPathname());
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
    
    public function getByID(string $id) : Items_Item
    {
        foreach($this->items as $item) {
            if($item->getID() === $id) {
                return $item;
            }
        }
        
        throw new Exception(
            'Unknown item ID',
            sprintf(
                'There is no item with the ID [%s] in the collection.',
                \AppUtils\parseVariable($id)->toString()    
            ),
            self::ERROR_UNKNOWN_ITEM_ID
        );
    }
    
    public function idExists(string $id) : bool
    {
        foreach($this->items as $item) {
            if($item->getID() === $id) {
                return true;
            }
        }
        
        return false;
    }
    
    public function getByRequest() : ?Items_Item
    {
        $id = $this->request->getParam('item_id');
        if(!empty($id) && $this->idExists($id)) {
            return $this->getByID($id);
        }
        
        return null; 
    }
    
    public function getURLList(array $params=array()) : string
    {
        $params['slug'] = 'Items';
        
        return $this->editor->getSite()->buildURL($params);
    }
}
