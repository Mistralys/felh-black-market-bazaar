<?php

declare(strict_types=1);

namespace FELH;

abstract class DataType_String extends DataType
{
    public function getText() : string
    {
        return $this->value;
    }
    
    public function toString() : string
    {
        return $this->getText();
    }
    
    public function toHTML() : string
    {
        return $this->toString();
    }
}