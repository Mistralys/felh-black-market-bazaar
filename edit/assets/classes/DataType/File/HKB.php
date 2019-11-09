<?php

declare(strict_types=1);

namespace FELH;

abstract class DataType_File_HKB extends DataType_File
{
    public function getPath() : string
    {
        $folder = $this->getFolder();
        
        return $folder->getGfxPath().'/'.$this->value;
    }
}