<?php

namespace FELH;

class Types_GameItemType_IsAvailableForSovereignCustomization extends DataType_Bool
{
    public function getLabel() : string
    {
        return t('Available for sovereign?');
    }
}