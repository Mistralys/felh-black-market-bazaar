<?php

namespace FELH;

abstract class DataType_Integer extends DataType
{
    public function getValue() : int
    {
        return intval($this->value);
    }
}