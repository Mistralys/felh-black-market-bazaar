<?php

declare(strict_types=1);

namespace FELH;

abstract class DataFlavors_AutoSelectChoice extends DataType_Bool
{
    public function getLabel() : string
    {
        return t('Auto select?');
    }

    public function getDescription() : string
    {
        return t('Whether to automatically select this choice.');
    }
}
