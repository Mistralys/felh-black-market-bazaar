<?php

declare(strict_types=1);

namespace FELH;

abstract class DataType_File extends DataType
{
    public function getFileName() : string
    {
        return basename($this->getPath());
    }
    
    public function getURL() : string
    {
        $path = $this->getPath();
        
        return Editor::getInstance()->getSite()->getMediaURL($path);
    }
    
    abstract public function getPath() : string;
    
    public function toString() : string
    {
        return $this->getFileName();
    }
    
    public function toHTML() : string
    {
        return $this->toString();
    }
}