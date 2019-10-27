<?php

declare(strict_types=1);

namespace FELH;

class Types_GameItemType_RandomPeasantUnitLiklihood extends DataType_Percentage
{
    public function getLabel() : string
    {
        return t('Random peasant unit likelihood');
    }
}