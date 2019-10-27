<?php

declare(strict_types=1);

namespace FELH;

class Types_GameItemType_HeroOnly extends DataType_Bool
{
    public function getLabel() : string
    {
        return t('Hero only?');
    }
}