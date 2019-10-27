<?php

declare(strict_types=1);

namespace FELH;

class Types_GameItemType_RandomHeroUnitLiklihood extends DataType_Percentage
{
    public function getLabel() : string
    {
        return t('Random hero unit likelihood');
    }
}