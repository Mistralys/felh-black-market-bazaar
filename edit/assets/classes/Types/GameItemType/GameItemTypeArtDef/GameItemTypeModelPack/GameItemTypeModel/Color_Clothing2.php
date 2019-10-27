<?php

declare(strict_types=1);

namespace FELH;

class Types_GameItemType_GameItemTypeArtDef_GameItemTypeModelPack_GameItemTypeModel_Color_Clothing2 extends DataType_ColorRGB
{
    public function getLabel() : string
    {
        return t('Clothing color: %1$s', t('secondary'));
    }
}