<?php

declare(strict_types=1);

namespace FELH;

class Types_GameItemType_TacticalRange extends DataType_Integer
{
    public function getLabel() : string
    {
        return t('Range in tactical combat');
    }
}