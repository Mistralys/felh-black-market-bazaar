<?php

namespace FELH;

abstract class DataType_StringEnum extends DataType_String
{
    protected $values;
    
    protected function init()
    {
        $this->values = $this->getValues();
    }
    
    abstract protected function getValues() : array;
    
    public function getTranslated() : string
    {
        $value = $this->getText();
        
        if(isset($this->values[$value])) {
            return $this->values[$value];
        }
        
        return $value;
    }
}