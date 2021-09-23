<?php

declare(strict_types=1);

namespace FELH;

use DOMDocument;

class Reader
{
   /**
    * @var string
    */
    protected $xmlPath;
    
   /**
    * @var Items
    */
    protected Items $items;
    
   /**
    * @var DOMDocument
    */
    protected $dom;
    
   /**
    * @var Items_Folder
    */
    protected Items_Folder $folder;
    
   /**
    * The tags that were detected in the file.
    * @var Items_XMLTag[]
    */
    protected $tags;
    
    public function __construct(Items $items, Items_Folder $folder, string $xmlPath, array $tags)
    {
        $this->xmlPath = $xmlPath;
        $this->items = $items;
        $this->folder = $folder;
        $this->tags = $tags;
    }
    
    public function getFolder() : Items_Folder
    {
        return $this->folder;
    }
    
    public function parse() : void
    {
        $this->dom = new DomDocument();
        $this->dom->preserveWhiteSpace = false;
        
        $xml = file_get_contents($this->xmlPath);
        
        $result = array();
        preg_match_all('/<\?xml.*\?>/six', $xml, $result, PREG_PATTERN_ORDER);
        $xml = str_replace($result[0][0], $result[0][0].PHP_EOL.'<DummyRoot>', $xml).'</DummyRoot>';        
        
        $this->dom->loadXML($xml);
        
        foreach($this->tags as $tag)
        {
            $nodes = $this->dom->getElementsByTagName($tag->getName());
    
            foreach($nodes as $node) 
            {
                $this->items->addFromNode($tag, $node, $this->xmlPath, $this->folder);
            }
        }
    }
    
    public function getDOM() : DOMDocument
    {
        return $this->dom;
    }
    
    public function getXMLPath() : string
    {
        return $this->xmlPath;
    }
}
    