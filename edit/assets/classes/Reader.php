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
    
   /**
    * @var Items_Folder
    */
    protected $folder;
    
    public function __construct(Items $items, Items_Folder $folder, string $xmlPath)
    {
        $this->xmlPath = $xmlPath;
        $this->items = $items;
        $this->folder = $folder;
    }
    
    public function getFolder() : Items_Folder
    {
        return $this->folder;
    }
    
    public function parse() : void
    {
        $this->dom = new \DomDocument();
        $this->dom->preserveWhiteSpace = false;
        
        $xml = file_get_contents($this->xmlPath);
        
        $result = array();
        preg_match_all('/<\?xml.*\?>/six', $xml, $result, PREG_PATTERN_ORDER);
        $xml = str_replace($result[0][0], $result[0][0].PHP_EOL.'<DummyRoot>', $xml).'</DummyRoot>';        
        
        $this->dom->loadXML($xml);
        
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
    