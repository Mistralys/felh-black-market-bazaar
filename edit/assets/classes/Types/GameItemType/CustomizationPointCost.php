<?php

namespace FELH;

class Types_GameItemType_CustomizationPointCost extends DataType_Integer
{
    public function getLabel() : string
    {
        return t('Customization point cost');
    }
}