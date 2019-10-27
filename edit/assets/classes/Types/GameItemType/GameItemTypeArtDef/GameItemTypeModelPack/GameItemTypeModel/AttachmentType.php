<?php

declare(strict_types=1);

namespace FELH;

class Types_GameItemType_GameItemTypeArtDef_GameItemTypeModelPack_GameItemTypeModel_AttachmentType extends DataType_StringEnum
{
    protected function getValues() : array
    {
        return array(
            'Skinned' => t('Skinned')
        );
    }
    
    public function getLabel() : string
    {
        return t('Type of attachment');
    }
}