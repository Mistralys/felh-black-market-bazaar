<?php

declare(strict_types=1);

namespace FELH;

class DataFlavors_Faction extends DataType_StringEnum
{
    public function getLabel() : string
    {
        return t('Faction');
    }

    protected function getValues() : array
    {
        return array(
            'Player' => t('Player')
        );
    }
}
