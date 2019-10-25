<?php

namespace FELH;

class Items_Item extends DataType_Container
{
    protected $id;
    
    protected $sourceFile;
    
    public function __construct(Items $items, \DOMElement $node, Reader $reader)
    {
        parent::__construct('GameItemType', $node);

        $this->sourceFile = $reader->getXMLPath();
        $this->items = $items;
    }
    
    public function getID()
    {
        return $this->getAttribute('InternalName');
    }
    
    protected function getKey($name, $default=null)
    {
        if(isset($this->data[$name])) {
            return $this->data[$name];
        }
        
        return $default;
    }
    
    protected function hasKey(string $name) : bool
    {
        return isset($this->data[$name]);
    }
    
    public function hasPrerequisites() : bool
    {
        return $this->hasKey('Prerequisites');
    }
    
   /**
    * Retrieves all prerequisites attached to the item.
    * @return Items_Data_Prerequisites[]
    */
    public function getPrerequities()
    {
        if($this->hasPrerequisites()) {
            return $this->getKey('Prerequisites');
        }
        
        return array();
    }
    
    
    public function hasGameModifiers() : bool
    {
        return $this->hasKey('GameModifier');
    }
    
   /**
    * Retrieves all game modifiers attached to the item.
    * @return Items_Data_GameModifier[]
    */
    public function getGameModifiers()
    {
        if($this->hasGameModifiers()) {
            return $this->getKey('GameModifier');
        }
        
        return array();
    }
    
    public function hasAI() : bool
    {
        return $this->hasChildName('AIData');
    }
    
    public function getRarity() : string
    {
        return $this->objRarityDisplay()->getTranslated();
    }
    
    public function getTypes() : array
    {
        return $this->getKey('Type', array());
    }
    
    public function getTypesString() : string
    {
        return implode(', ', $this->getTypes());
    }
    
    public function getShopPrice() : int
    {
        $price = $this->objShopPrice();
        if($price) {
            return $price->getValue();
        }
        
        return 0;
    }
    
    public function getSubtype() : string
    {
        return $this->getKey('Subtype', '');
    }
    
    public function getFullType() : string
    {
        $type = $this->getTypesString();
        $subtype = $this->getSubtype();
        
        if(!empty($subtype)) {
            $type .= ' - '.$subtype;
        }
        
        return $type;
    }
    
    public function getLabel() : string
    {
        return $this->objDisplayName()->getText();
    }

    public function getDescription() : string
    {
        if($this->hasChildName('Description')) {
            return $this->objDescription()->getText();
        }
        
        return '';
    }
    
    public function canBeEquipped() : bool
    {
        return $this->objCanBeEquipped()->getValue();
    }
    
    public function objAI() : ?Types_GameItemType_AIData
    {
        if($this->hasChildName('AIData')) {
            return $this->getChildByName('AIData');
        }
        
        return null;
    }
    
    public function objDisplayName() : Types_GameItemType_DisplayName
    {
        return $this->getChildByName('DisplayName');
    }
    
    public function objRarityDisplay() : Types_GameItemType_RarityDisplay
    {
        return $this->getChildByName('RarityDisplay');
    }
    
    public function objShopPrice() : ?Types_GameItemType_ShopValue
    {
        return $this->getChildByName('ShopValue');
    }
    
    public function objDescription() : ?Types_GameItemType_Description
    {
        return $this->getChildByName('Description');
    }
    
    public function objAvailableForSovereign() : ?Types_GameItemType_IsAvailableForSovereignCustomization
    {
        return $this->getChildByName('IsAvailableForSovereignCustomization');
    }
    
    public function objCanBeEquipped() : Types_GameItemType_CanBeEquipped
    {
        return $this->getChildByName('CanBeEquipped');
    }
    
    public function objType() : Types_GameItemType_Type
    {
        return $this->getChildByName('Type');
    }
    
    public function objLikelihood() : Types_GameItemType_Likelihood
    {
        return $this->getChildByName('Likelihood');
    }
     
    public function getSourceFile()
    {
        return $this->sourceFile;
    }
    
    public function getURLEdit(array $params=array())
    {
        $params['slug'] = 'Items.Edit';
        return $this->getURL($params);
    }
    
    public function getURLView(array $params=array())
    {
        $params['slug'] = 'Items.View';
        return $this->getURL($params);
    }
    
    public function getURL(array $params=array())
    {
        $params['item_id'] = $this->getID();
        
        return '?'.http_build_query($params);
    }
}

