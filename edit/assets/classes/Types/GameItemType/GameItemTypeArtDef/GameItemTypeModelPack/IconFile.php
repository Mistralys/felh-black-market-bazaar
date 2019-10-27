<?php

declare(strict_types=1);

namespace FELH;

class Types_GameItemType_GameItemTypeArtDef_GameItemTypeModelPack_IconFile extends DataType_String
{
    public function getFilename() : string
    {
        return $this->value;
    }
    
    public function getLabel() : string
    {
        return t('Icon file');
    }
}