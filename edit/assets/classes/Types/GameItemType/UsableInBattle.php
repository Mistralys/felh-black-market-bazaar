<?php

namespace FELH;

class Types_GameItemType_UsableInBattle extends DataType_Bool
{
    public function getLabel() : string
    {
        return t('Usable in battle?');
    }
}