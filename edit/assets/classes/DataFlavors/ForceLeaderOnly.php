<?php

declare(strict_types=1);

namespace FELH;

class DataFlavors_ForceLeaderOnly extends DataType_Bool
{
    public function getLabel() : string
    {
        return t('Leader only?');
    }

    public function getDescription() : string
    {
        return t('Whether only the leader may continue, without the rest of its army.');
    }
}
