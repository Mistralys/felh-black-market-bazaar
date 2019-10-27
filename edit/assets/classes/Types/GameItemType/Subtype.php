<?php

namespace FELH;

class Types_GameItemType_Subtype extends DataType_StringEnum
{
    protected function getValues() : array
    {
        return array(
            'Clothes' => t('Clothes')
        );
    }
    
    public function getLabel() : string
    {
        return t('Subtype');
    }
}