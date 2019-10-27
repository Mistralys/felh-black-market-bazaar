<?php

declare(strict_types=1);

namespace FELH;

class Items_Folder
{
   /**
    * @var string
    */
    protected $label;
    
   /**
    * @var string
    */
    protected $path;
    
    public function __construct(string $label, string $path)
    {
        $this->label = $label;
        $this->path = $path;
    }
    
    public function getLabel() : string
    {
        return $this->label;
    }

    public function getPath() : string
    {
        return $this->path;
    }
}