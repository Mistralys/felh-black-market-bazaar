<?php

namespace FELH;

class Types_GameItemType_GameItemTypeArtDef_GameItemTypeModelPack_GameItemTypeModel_AttachmentType extends DataType_StringEnum
{
    protected function getValues() : array
    {
        return array(
            'Skinned' => t('Skinned')
        );
    }
}