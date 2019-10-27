<?php

declare(strict_types=1);

namespace FELH;

abstract class DataType_Percentage extends DataType_Integer
{
    public function toString() : string
    {
        return (string)$this->getValue().'%';
    }
    
    public function toHTML() : string
    {
        return $this->toString();
    }
}
