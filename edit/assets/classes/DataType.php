<?php

namespace FELH;

abstract class DataType
{
    const ERROR_INVALID_INSTANTIATION = 41201;
    
   /**
    * @var DataType
    */
    protected $parent;
    
   /**
    * @var string
    */
    protected $tagName;
    
   /**
    * @var DataType[]
    */
    protected $data = array();    

    protected $attributes = array();
    
    protected $value = null;
    
   /**
    * @var Items
    */
    protected $items;
    
    public static function fromNode(Items $items, string $tagName, \DOMElement $node, ?DataType $parent=null) : DataType
    {
        $class = get_called_class();
        return new $class($items, $tagName, $node, $parent);
    }
    
    public static function fromArray(Items $items, string $tagName, array $data, ?DataType $parent=null) : DataType
    {
        $class = get_called_class();
        return new $class($items, $tagName, $data, $parent);
    }
    
    protected function __construct(Items $items, string $tagName, $nodeOrData, ?DataType $parent=null)
    {
        $this->items = $items;
        $this->tagName = $tagName;
        $this->parent = $parent;
        
        if($nodeOrData instanceof \DOMElement)
        {
            $this->importNode($nodeOrData);
        }
        else if(is_array($nodeOrData))
        {
            $this->importArray($nodeOrData);
        }
        else
        {
            throw new Exception(
                'Invalid instantiation',
                null,
                self::ERROR_INVALID_INSTANTIATION
            );
        }
        
        $this->init();
    }
    
    protected function importNode(\DOMElement $node)
    {
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
                
                if(class_exists($className)) 
                {
                    $this->data[] = call_user_func(array($className, 'fromNode'), $this->items, $name, $child, $this);
                } 
                else 
                {
                    echo '<pre style="background:#fff;font-family:monospace;font-size:14px;color:#444;padding:16px;border:solid 1px #999;border-radius:4px;">';
                    print_r(array(
                        $name, 
                        $this->getFolder()->getPath(),
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
    }
    
    protected function importArray(array $data)
    {
        $this->tagName = $data['tag_name'];
        $this->value = $data['value'];
        $this->attributes = $data['attributes'];
        
        if($this->isContainer())
        {
            foreach($data['children'] as $childData)
            {
                $name = $childData['name'];
                
                $className = '\FELH\Types_'.$this->getFullName().'_'.$name;
                
                if(class_exists($className)) {
                    $this->data[] = call_user_func(array($className, 'fromArray'), $name, $childData, $this);
                }
            }
        }
    }
    
    public function toStorageArray()  : array
    {
        $data = array(
            'class' => get_class($this),
            'tag_name' => $this->tagName,
            'value' => $this->value,
            'attributes' => $this->attributes
        );
        
        if($this->isContainer()) 
        {
            $data['children'] = array();
            
            foreach($this->data as $child) 
            {
                $data['children'][] = $child->toStorageArray();
            }
        }
        
        return $data;
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
    
    public function isRoot() : bool
    {
        return false;
    }
     
    public function getName() : string
    {
        return $this->tagName;
    }
    
    public function getFullName() : string
    {
        if($this->parent !== null) {
            return $this->parent->getFullName().'_'.$this->tagName;
        }
        
        return $this->tagName;
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
    
    public function getFolder() : Items_Folder
    {
        return $this->getRootContainer()->getFolder();
    }
}