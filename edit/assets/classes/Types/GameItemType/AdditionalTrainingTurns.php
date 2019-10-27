<?php

declare(strict_types=1);

namespace FELH;

class Types_GameItemType_AdditionalTrainingTurns extends DataType_Integer
{
    public function getLabel() : string
    {
        return t('Additional training turns');
    }
}