<?php

declare(strict_types=1);

namespace FELH;

abstract class DataFlavors_Value extends DataType_Integer
{
    public function getLabel() : string
    {
        return t('Value');
    }
}
