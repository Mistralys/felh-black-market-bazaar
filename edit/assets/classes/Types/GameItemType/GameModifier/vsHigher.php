<?php

declare(strict_types=1);

namespace FELH;

class Types_GameItemType_GameModifier_vsHigher extends DataType_Bool
{
    public function getLabel() : string
    {
        return t('Versus higher level enemies?');
    }
}