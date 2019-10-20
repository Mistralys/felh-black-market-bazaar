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
    
   /**
    * @var \DOMDocument
    */
    protected $dom;
    
    public function __construct(Items $items, string $xmlPath)
    {
        $this->xmlPath = $xmlPath;
        $this->items = $items;
    }
    
    public function parse() : void
    {
        $this->dom = new \DomDocument();
        $this->dom->preserveWhiteSpace = false;
        
        $this->dom->load($this->xmlPath);
        
        $nodes = $this->dom->getElementsByTagName('GameItemType');

        foreach($nodes as $node) 
        {
            $this->items->addItem($node, $this);
        }
    }
    
    public function getDOM() : \DOMDocument
    {
        return $this->dom;
    }
    
    public function getXMLPath() : string
    {
        return $this->xmlPath;
    }
}
    