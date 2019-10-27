<?php

declare(strict_types=1);

namespace FELH;

class Types_GameItemType_GameModifier_Provides extends DataType_String
{
    public function getLabel() : string
    {
        return t('Provides');
    }
}