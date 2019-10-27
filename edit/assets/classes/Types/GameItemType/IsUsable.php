<?php

namespace FELH;

class Types_GameItemType_IsUsable extends DataType_Bool
{
    public function getLabel() : string
    {
        return t('Is usable?');
    }
}