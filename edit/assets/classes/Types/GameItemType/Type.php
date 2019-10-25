<?php

namespace FELH;

class Types_GameItemType_Type extends DataType_StringEnum
{
    protected function getValues() : array
    {
        return array(
            'Accessory' => t('Accessory'),
            'Surcoat' => t('Surcoat')
        );
    }
}