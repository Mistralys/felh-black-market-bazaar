<?php

namespace FELH;

class Types_GameItemType_CanBeEquipped extends DataType_Bool
{
    public function getLabel() : string
    {
        return t('Can be equipped?');
    }
}