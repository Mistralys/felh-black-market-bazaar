<?php

declare(strict_types=1);

namespace FELH;

class Types_GameItemType_GameItemTypeArtDef_GameItemTypeModelPack_GameItemTypeModel_ModelFile extends DataType_String
{
    public function getPath() : string
    {
        return $this->value;
    }
    
    public function getLabel() : string
    {
        return t('Model file');
    }
}