<?php

declare(strict_types=1);

namespace FELH;

abstract class DataFlavors_Treasure extends DataType_Container
{
    public function getLabel() : string
    {
        return t('Treasure');
    }
}
