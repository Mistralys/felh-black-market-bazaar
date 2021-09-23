<?php

declare(strict_types=1);

namespace FELH;

abstract class DataFlavors_IconFile extends DataFlavors_PNGFile
{
    public function getLabel() : string
    {
        return t('Icon file');
    }
}
