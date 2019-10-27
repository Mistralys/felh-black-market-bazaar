<?php

namespace FELH;

class Types_GameItemType_ShopValue extends DataType_Integer
{
    public function getLabel() : string
    {
        return t('Shop value');
    }
}