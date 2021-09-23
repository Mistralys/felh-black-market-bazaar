<?php

declare(strict_types=1);

namespace FELH;

class DataFlavors_Level extends DataType_Integer
{
    public function getLabel() : string
    {
        return t('Level');
    }
}
