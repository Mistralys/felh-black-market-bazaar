<?php

declare(strict_types=1);

namespace FELH;

class Types_GameItemType_IsAvailableForUnitDesign extends DataType_Bool
{
    public function getLabel() : string
    {
        return t('Available for unit designer?');
    }
}