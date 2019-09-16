<?php

class Items_Item
{
    protected $id;
    
    protected $node;
    
    protected $data = array();
    
    protected $sourceFile;
    
    protected $singleValues = array(
        'DisplayName',
        'Description',
        'Type',
        'CanBeEquipped',
        'ShopValue',
        'IsAvailableForSovereignCustomization',
        'IsAvailableForUnitDesign',
        'Likelihood',
        'RarityDisplay',
        'HeroOnly',
        'ArtDef'
    );
    
    public function __construct(Items $items, DOMElement $node, Reader $reader)
    {
        $this->id = $node->getAttribute('InternalName');
        $this->node = $node;
        $this->sourceFile = $reader->getXMLPath();
        $this->items = $items;
        
        foreach($this->singleValues as $name) {
            $this->getSingleValue($name);
        }
        
        unset($this->node);
    }
    
    public function getID()
    {
        return $this->id;
    }
    
    public function getLabel()
    {
        return $this->data['DisplayName'];
    }
    
    public function getDescription()
    {
        return $this->data['Description'];
    }
    
    public function getSourceFile()
    {
        return $this->sourceFile;
    }
    
    protected function getSingleValue($name)
    {
        $result = $this->node->getElementsByTagName($name);
        $value = null;
        
        if($result->length > 0) {
            $value = $result->item(0)->nodeValue;
        }
        
        $this->data[$name] = $value;
    }
}
    