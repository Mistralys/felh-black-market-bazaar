<?php

declare(strict_types=1);

namespace FELH;

abstract class DataType_File_Icon extends DataType_File_PNG
{
    public function getLabel() : string
    {
        return t('Icon file');
    }
}