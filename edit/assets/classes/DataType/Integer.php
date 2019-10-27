<?php

declare(strict_types=1);

namespace FELH;

abstract class DataType_Integer extends DataType
{
    public function getValue() : int
    {
        return intval($this->value);
    }
    
    public function toString() : string
    {
        return (string)$this->getValue();
    }
    
    public function toHTML() : string
    {
        return $this->toString();
    }
}
    