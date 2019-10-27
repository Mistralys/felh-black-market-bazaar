<?php

namespace FELH;

class Types_GameItemType_UsableOnlyOnceInBattle extends DataType_Bool
{
    public function getLabel() : string
    {
        return t('Usable only once in battle?');
    }
}