<?php

namespace FELH;

abstract class Items_Data
{
   /**
    * @var Items_Item
    */
    protected $item;

   /**
    * @var array
    */
    protected $data;
    
    public function __construct(Items_Item $item, $data)
    {
        $this->item = $item;
        $this->data = $data;
    }
    
    public function getRawData()
    {
        return $this->data;
    }
}
