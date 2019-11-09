<?php

declare(strict_types=1);

namespace FELH;

class Types_GameItemType_SupportUnitType extends DataType_StringEnum
{
    protected function getValues() : array
    {
        return array(
            'Unit_Catapult' => t('Catapult')
        );
    }
    
    public function getLabel() : string
    {
        return t('Support unit');
    }
}