<?php

declare(strict_types=1);

namespace FELH;

class Types_GameItemType_GameModifier_Attribute extends DataType_StringEnum
{
    public function getLabel() : string
    {
        return t('Attribute');
    }
    
    protected function getValues(): array
    {
        return array(
            'AdjustUnitStat' => t('Adjust unit stat') 
        );
    }
}