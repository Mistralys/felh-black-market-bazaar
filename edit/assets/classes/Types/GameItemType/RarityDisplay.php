<?php

namespace FELH;

class Types_GameItemType_RarityDisplay extends DataType_StringEnum
{
    protected function getValues() : array
    {
        return array(
            'Uncommon' => t('Uncommon'),
            'Rare' => t('Rare'),
            'Common' => t('Common'),
            'Nil' => t('None')
        );
    }
}