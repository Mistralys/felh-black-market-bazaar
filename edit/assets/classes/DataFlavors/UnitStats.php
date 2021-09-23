<?php

declare(strict_types=1);

namespace FELH;

abstract class DataFlavors_UnitStats extends DataType_StringEnum
{
    protected function getValues(): array
    {
        return array(
            'UnitStat_Defense_Pierce' => t('Defence: Piercing'),
            'UnitStat_ArmorProficiency' => t('Armor proficiency'),
            'UnitStat_Sight' => t('Sight')
        );
    }
}
