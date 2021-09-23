<?php

declare(strict_types=1);

namespace FELH;

class Types_GameItemType_Prereq_Attribute extends DataFlavors_UnitStats
{
    public function getLabel() : string
    {
        return t('Attribute');
    }
}