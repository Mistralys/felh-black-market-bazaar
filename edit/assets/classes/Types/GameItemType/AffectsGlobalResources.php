<?php

namespace FELH;

class Types_GameItemType_AffectsGlobalResources extends DataType_Bool
{
    public function getLabel() : string
    {
        return t('Affects global resources?');
    }
}