<?php

declare(strict_types=1);

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
    
    public function toString() : string
    {
        if($this->getValue()) {
            return t('Yes');
        }
        
        return t('No');
    }
     
    public function toHTML() : string
    {
        if($this->getValue()) {
            return '<i class="fa fa-check text-success"></i>';
        }
        
        return '<i class="fa fa-times text-warning"></i>';
    }
}