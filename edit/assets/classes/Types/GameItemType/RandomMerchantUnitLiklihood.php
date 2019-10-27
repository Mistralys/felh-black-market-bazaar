<?php

declare(strict_types=1);

namespace FELH;

class Types_GameItemType_RandomMerchantUnitLiklihood extends DataType_Percentage
{
    public function getLabel() : string
    {
        return t('Random merchant unit likelihood');
    }
}