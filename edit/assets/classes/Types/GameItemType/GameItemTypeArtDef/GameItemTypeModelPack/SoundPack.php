<?php

declare(strict_types=1);

namespace FELH;

class Types_GameItemType_GameItemTypeArtDef_GameItemTypeModelPack_SoundPack extends DataType_String
{
    public function getLabel() : string
    {
        return t('Sound pack');
    }
}