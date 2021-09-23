<?php

declare(strict_types=1);

namespace FELH;

abstract class DataFlavors_Description extends DataType_Text
{
    public function getLabel() : string
    {
        return t('Description');
    }
}
