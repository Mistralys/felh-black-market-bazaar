<?php

declare(strict_types=1);

namespace FELH;

class Types_GameItemType_HideInHiergamenon extends DataType_Bool
{
    public function getLabel() : string
    {
        return t('Hide from the hiergamenon?');
    }
}