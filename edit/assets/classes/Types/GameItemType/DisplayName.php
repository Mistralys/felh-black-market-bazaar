<?php

namespace FELH;

class Types_GameItemType_DisplayName extends DataType_String
{
    public function getLabel() : string
    {
        return t('Display name');
    }
}