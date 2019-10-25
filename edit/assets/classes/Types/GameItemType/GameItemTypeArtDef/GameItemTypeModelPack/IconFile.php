<?php

namespace FELH;

class Types_GameItemType_GameItemTypeArtDef_GameItemTypeModelPack_IconFile extends DataType_String
{
    public function getFilename() : string
    {
        return $this->value;
    }
}