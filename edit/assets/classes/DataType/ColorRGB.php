<?php

declare(strict_types=1);

namespace FELH;

abstract class DataType_ColorRGB extends DataType
{
    protected $array;
    
    public function getValue() : string
    {
        return $this->value;
    }

    public function getRed() : int
    {
        $arr = $this->toArray();
        return $arr['red'];
    }

    public function getGreen() : int
    {
        $arr = $this->toArray();
        return $arr['green'];
    }
    
    public function getBlue() : int
    {
        $arr = $this->toArray();
        return $arr['blue'];
    }
    
    public function toArray() : array
    {
        if(!isset($this->array)) 
        {
            $parts = explode(',', $this->getValue());
            $parts = array_map('trim', $parts);
            
            $this->array = array(
                'red' => $parts[0],
                'green' => $parts[1],
                'blue' => $parts[2]
            );
        }
        
        return $this->array;
    }
    
    public function toString() : string
    {
        $arr = $this->toArray();
        
        return sprintf(
            'R%s, G%s, B%s',
            $arr['red'],
            $arr['green'],
            $arr['blue']
        );
    }
    
    public function toCSS() : string
    {
        $arr = $this->toArray();
        
        return sprintf(
            'rgb(%s,%s,%s)',
            $arr['red'],
            $arr['green'],
            $arr['blue']
        );
    }
    
    public function toHTML() : string
    {
        return $this->toString().' <div class="color-swatch" style="background:'.$this->toCSS().'"></div>';
    }
}