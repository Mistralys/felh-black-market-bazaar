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
                
                if($name == '#text') {
                    continue;
                }
                
                $className = '\FELH\Types_'.$this->getFullName().'_'.$name;
                
                if(class_exists($className)) {
                    $this->data[] = new $className($name, $child, $this);
                } else {
                    echo '<pre style="background:#fff;font-family:monospace;font-size:14px;color:#444;padding:16px;border:solid 1px #999;border-radius:4px;">';
                    print_r(array(
                        $name, 
                        $this->getSourceFile(),
                        $this->getFullName()
                    ));
                    echo '</pre>';
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
    
    public function getDepth() : int
    {
        if(!$this->hasParent()) {
            return 0;
        }
        
        return $this->parent->getDepth() + 1;
    }
        
    public function hasParent() : bool
    {
        return isset($this->parent);
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
    
    abstract public function getLabel() : string;

    abstract public function toString() : string;
    
    abstract public function toHTML() : string;
    
    public function multipleAllowed() : bool
    {
        return false;
    }
    
    public function getRootContainer() : DataType_RootContainer
    {
        if($this instanceof DataType_RootContainer) {
            return $this;
        }
        
        return $this->parent->getRootContainer();
    }
    
    public function getSourceFile() : string
    {
        return $this->getRootContainer()->getSourceFile();
    }
}