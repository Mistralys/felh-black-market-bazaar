<?php

declare(strict_types=1);

namespace FELH;

abstract class DataFlavors_Likelihood extends DataType_Percentage
{
    public function getLabel() : string
    {
        return t('Likelihood');
    }
}
