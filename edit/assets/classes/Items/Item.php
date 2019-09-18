<?php

namespace FELH;

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
    
    public function __construct(Items $items, \DOMElement $node, Reader $reader)
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
    
    protected function getKey($name, $default=null)
    {
        if(isset($this->data[$name])) {
            return $this->data[$name];
        }
        
        return $default;
    }
    
    public function getType() : string
    {
        return $this->getKey('Type', '');
    }
    
    public function getShopPrice()
    {
        return $this->getKey('ShopValue');
    }
    
    public function getLabel() : string
    {
        return $this->getKey('DisplayName', '');
    }
    
    public function getDescription() : string
    {
        return $this->getKey('Description', '');
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
    