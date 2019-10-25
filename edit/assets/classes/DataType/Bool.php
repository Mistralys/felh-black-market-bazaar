<?php

namespace FELH;

abstract class DataType_Bool extends DataType
{
    public function getValue() : bool
    {
        if($this->value == '1') {
            return true;
        }
        
        return false;
    }
    
    public function toHTML()
    {
        if($this->getValue()) {
            return '<i class="fa fa-check text-success"></i>';
        }
        
        return '<i class="fa fa-times text-warning"></i>';
    }
}