<?php

namespace FELH;

abstract class DataType
{
   /**
    * @var DataType
    */
    protected $parent;
    
   /**
    * @var string
    */
    protected $name;
    
   /**
    * @var DataType[]
    */
    protected $data = array();    

    protected $attributes = array();
    
    protected $value = null;
    
    public function __construct(string $name, \DOMElement $node, ?DataType $parent=null)
    {
        $this->name = $name;
        $this->parent = $parent;
        
        foreach($node->attributes as $attribute)
        {
            $this->attributes[$attribute->nodeName] = $attribute->nodeValue;
        }
        
        if($this->isContainer()) 
        {
            foreach($node->childNodes as $child) 
            {
                $name = $child->nodeName;
                
                $className = '\FELH\Types_'.$this->getFullName().'_'.$name;
                
                if(class_exists($className)) {
                    $this->data[] = new $className($name, $child, $this);
                }
            }
        }
        else
        {
            $this->value = $node->nodeValue;
        }
        
        $this->init();
    }
    
    protected function init()
    {
        
    }
    
    public function isContainer() : bool
    {
        return false;
    }
    
    public function getName() : string
    {
        return $this->name;
    }
    
    public function getFullName()
    {
        if($this->parent !== null) {
            return $this->parent->getFullName().'_'.$this->name;
        }
        
        return $this->name;
    }
    
    public function getAttribute(string $name) : string
    {
        if(isset($this->attributes[$name])) {
            return $this->attributes[$name];
        }
        
        return '';
    }
    
    protected function hasChildName(string $name) : bool
    {
        foreach($this->data as $type)
        {
            if($type->getName() === $name) {
                return true;
            }
        }
        
        return false;
    }
    
    protected function getChildByName(string $name) : ? DataType
    {
        foreach($this->data as $type) 
        {
            if($type->getName() === $name) {
                return $type;
            }
        }
        
        return null;
    }
    
    protected function getChildrenByName(string $name)
    {
        $result = array();
        
        foreach($this->data as $type) 
        {
            if($type->getName() === $name) {
                $result[] = $type;
            }
        }
        
        return $result;
    }
}