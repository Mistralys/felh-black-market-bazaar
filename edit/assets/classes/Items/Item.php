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
        'ArtDef',
        'UsableInBattle',
        'UsableOnlyOnceInBattle',
        'HideInHiergamenon',
        'CustomizationPointCost'
    );
    
    protected $multipleValues = array(
        'Type'
    );
    
    protected $complexValues = array(
        'GameModifier' => 'GameModifier',
        'Prereq' => 'Prerequisites',
        'AIData' => 'AI',
        'GameItemTypeArtDef' => 'ArtDef',
        'ProductionRequirement' => 'ProductionRequirement'
    );
    
    public static $missing = array();
    
    public function __construct(Items $items, \DOMElement $node, Reader $reader)
    {
        $this->id = $node->getAttribute('InternalName');
        $this->node = $node;
        $this->sourceFile = $reader->getXMLPath();
        $this->items = $items;
        
        foreach($node->childNodes as $child) 
        {
            $name = $child->nodeName;
            
            if(in_array($name, $this->singleValues)) 
            {
                $this->data[$name] = $child->nodeValue;
                
                continue;
            }
            
            if(in_array($name, $this->multipleValues))
            {
                $this->initKey($name, array());
                $this->data[$name][] = $child->nodeValue;
                continue;
            }
            
            if(isset($this->complexValues[$name])) 
            {
                $this->initKey($name, array());
                $array = \AppUtils\XMLHelper::convertDOMElement($child)->toArray();

                $class = '\FELH\Items_Data_'.$this->complexValues[$name];
                $value = new $class($this, $array);
                
                $this->data[$name][] = $value;
                continue;
            }
            
            if(!isset(self::$missing[$name])) {
                self::$missing[$name] = htmlspecialchars($reader->getDOM()->saveXML($child));
            }
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
    
    public function hasGameModifiers() : bool
    {
        return $this->getKey('GameModifiers') !== null;
    }
    
   /**
    * Retrieves all game modifiers attached to the item.
    * @return Items_Data_GameModifier[]
    */
    public function getGameModifiers()
    {
        if($this->hasGameModifiers()) {
            return $this->getKey('GameModifiers');
        }
        
        return array();
    }
    
    public function hasAI() : bool
    {
        return $this->getKey('AIData') !== null;
    }
    
    public function getAI() : ?Items_Data_AI
    {
        if($this->hasAI()) {
            return $this->data['AIData'][0];
        }
        
        return null;
    }
    
    public function getRarity() : string
    {
        return $this->getKey('RarityDisplay', '');
    }
    
    public function getTypes() : array
    {
        return $this->getKey('Type', array());
    }
    
    public function getTypesString() : string
    {
        return implode(', ', $this->getTypes());
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
    
    protected function setKey($name, $value)
    {
        $this->data[$name] = $value;
    }
    
    protected function initKey($name, $value)
    {
        if(!isset($this->data[$name])) {
            $this->data[$name] = $value;
        }
    }
    
    protected function parse_Type(\DOMElement $node)
    {
        $this->initKey('Type', array());
        
        $this->data['Type'][] = $node->nodeValue;
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
