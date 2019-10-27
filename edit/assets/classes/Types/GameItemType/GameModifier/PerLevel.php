<?php

declare(strict_types=1);

namespace FELH;

class Types_GameItemType_GameModifier_PerLevel extends DataType_Bool
{
    public function getLabel() : string
    {
        return t('Per level?');
    }
}