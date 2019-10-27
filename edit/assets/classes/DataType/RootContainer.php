<?php

declare(strict_types=1);

namespace FELH;

abstract class DataType_RootContainer extends DataType_Container
{
    protected $sourceFile;
    
    public function __construct(string $name, \DOMElement $node, string $sourceFile)
    {
        $this->sourceFile = $sourceFile;
        
        parent::__construct($name, $node);
    }
    
    public function getSourceFile() : string
    {
        return $this->sourceFile;
    }
}