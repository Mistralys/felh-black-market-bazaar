<?php

namespace FELH;

abstract class DataType_String extends DataType
{
    public function getText() : string
    {
        return $this->value;
    }
}