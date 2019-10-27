<?php

declare(strict_types=1);

namespace FELH;

abstract class DataType_RootContainer extends DataType_Container
{
    protected $folder;
    
    public function __construct(string $name, \DOMElement $node, Items_Folder $folder)
    {
        $this->folder = $folder;
        
        parent::__construct($name, $node);
    }
    
    public function getFolder() : Items_Folder
    {
        return $this->folder;
    }
}