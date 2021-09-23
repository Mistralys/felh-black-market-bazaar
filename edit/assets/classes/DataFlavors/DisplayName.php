<?php

declare(strict_types=1);

namespace FELH;

abstract class DataFlavors_DisplayName extends DataType_String
{
    public function getLabel() : string
    {
        return t('Display name');
    }
}