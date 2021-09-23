<?php

declare(strict_types=1);

namespace FELH;

abstract class DataFlavors_MovieFile extends DataType_File
{
    public function getLabel() : string
    {
        return t('Movie file');
    }

    public function getPath() : string
    {
        $folder = $this->getFolder();

        return $folder->getMoviePath().'/'.$this->value;
    }
}
