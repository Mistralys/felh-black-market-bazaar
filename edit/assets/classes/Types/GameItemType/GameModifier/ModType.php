<?php

declare(strict_types=1);

namespace FELH;

class Types_GameItemType_GameModifier_ModType extends DataType_StringEnum
{
    public function getLabel() : string
    {
        return t('Target');
    }
    
    protected function getValues(): array
    {
        return array(
            'Unit' => t('Unit')
        );
    }
}