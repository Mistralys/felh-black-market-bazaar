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
        'Type', // MULTIPLE
        'Subtype',
        'AdditionalTrainingTurns',
        'WeaponType',
        'WeaponUpgradeType',
        'TacticalRange',
        'CanBeEquipped',
        'ShopValue',
        'IsAvailableForSovereignCustomization',
        'IsAvailableForUnitDesign',
        'Likelihood',
        'RarityDisplay',
        'IsUsable',
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
    
    public function getRarity() : string
    {
        return $this->getKey('RarityDisplay', '');
    }
    
    public function getType() : string
    {
        return $this->getKey('Type', '');
    }
    
    public function getSubtype() : string
    {
        return $this->getKey('Subtype', '');
    }
    
    public function getFullType() : string
    {
        $type = $this->getType();
        $subtype = $this->getSubtype();
        
        if(!empty($subtype)) {
            $type .= ' - '.$subtype;
        }
        
        return $type;
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
        
        if($result->length == 1) {
            $value = $result->item(0)->nodeValue;
        }
        
        $this->data[$name] = $value;
    }
}
    