<?php

declare(strict_types=1);

namespace FELH;

class Types_GameItemType_GameModifier_Value extends DataType_String
{
    public function getLabel() : string
    {
        return t('Value');
    }
}