<?php

namespace FELH;

class Types_GameItemType_Description extends DataType_String
{
    public function getLabel() : string
    {
        return t('Description');
    }
}