<?php

declare(strict_types=1);

namespace FELH;

abstract class DataType_Decimal extends DataType
{
    public function getValue() : float
    {
        return (float)$this->value;
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
