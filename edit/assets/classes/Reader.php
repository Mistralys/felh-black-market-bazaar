<?php

declare(strict_types=1);

namespace FELH;

class Reader
{
   /**
    * @var string
    */
    protected $xmlPath;
    
   /**
    * @var Items
    */
    protected $items;
    
    public function __construct(Items $items, string $xmlPath)
    {
        $this->xmlPath = $xmlPath;
        $this->items = $items;
    }
    
    public function parse() : void
    {
        $dom = new \DomDocument();
        $dom->load($this->xmlPath);
        
        $nodes = $dom->getElementsByTagName('GameItemType');

        foreach($nodes as $node) 
        {
            $this->items->addItem($node, $this);
        }
    }
    
    public function getXMLPath() : string
    {
        return $this->xmlPath;
    }
}
    