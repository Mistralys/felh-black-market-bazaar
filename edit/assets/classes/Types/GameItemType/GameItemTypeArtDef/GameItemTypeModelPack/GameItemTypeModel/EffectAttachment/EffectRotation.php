<?php

declare(strict_types=1);

namespace FELH;

class Types_GameItemType_GameItemTypeArtDef_GameItemTypeModelPack_GameItemTypeModel_EffectAttachment_EffectRotation extends DataType_String
{
    public function getLabel() : string
    {
        return t('Position');
    }
}