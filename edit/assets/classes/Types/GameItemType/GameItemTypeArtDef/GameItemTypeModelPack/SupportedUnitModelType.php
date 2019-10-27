<?php

namespace FELH;

class Types_GameItemType_GameItemTypeArtDef_GameItemTypeModelPack_SupportedUnitModelType extends DataType_String
{
    public function getModelName() : string
    {
        return $this->value;
    }
    
    public function multipleAllowed() : bool
    {
        return true;
    }
    
    public function getLabel() : string
    {
        return t('Supported unit model');
    }
}