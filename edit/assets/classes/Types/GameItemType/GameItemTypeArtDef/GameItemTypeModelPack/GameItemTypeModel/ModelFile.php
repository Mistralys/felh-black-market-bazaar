<?php

namespace FELH;

class Types_GameItemType_GameItemTypeArtDef_GameItemTypeModelPack_GameItemTypeModel_ModelFile extends DataType_String
{
    public function getPath() : string
    {
        return $this->value;
    }
}