<?php

declare(strict_types=1);

namespace FELH;

class Types_GameItemType_GameItemTypeArtDef_GameItemTypeModelPack_TintB extends DataType_Integer
{
    public function getLabel() : string
    {
        return t('Tint: %1$s', t('blue'));
    }
}