<?php

declare(strict_types=1);

namespace FELH;

class Types_GameItemType_GameModifier_WhenOverArmySize extends DataType_Integer
{
    public function getLabel() : string
    {
        return t('When over army size');
    }
}