<?php

declare(strict_types=1);

namespace FELH;

abstract class DataType_File extends DataType
{
    public function getPath() : string
    {
        return $this->value;
    }
    
    public function toString() : string
    {
        return $this->getPath();
    }
    
    public function toHTML() : string
    {
        return $this->toString();
    }
}