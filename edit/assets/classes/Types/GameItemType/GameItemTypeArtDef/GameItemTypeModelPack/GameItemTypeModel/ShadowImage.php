<?php

declare(strict_types=1);

namespace FELH;

class Types_GameItemType_GameItemTypeArtDef_GameItemTypeModelPack_GameItemTypeModel_ShadowImage extends DataType_File_PNG
{
    public function getLabel() : string
    {
        return t('Shadow image');
    }
}