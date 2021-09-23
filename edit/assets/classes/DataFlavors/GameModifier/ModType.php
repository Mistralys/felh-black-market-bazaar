<?php

declare(strict_types=1);

namespace FELH;

abstract class DataFlavors_GameModifier_ModType extends DataType_StringEnum
{
    public function getLabel() : string
    {
        return t('Target');
    }

    protected function getValues(): array
    {
        return array(
            'Unit' => t('Unit'),
            'Resource' => t('Resource'),
            'Map' => t('Map')
        );
    }
}
