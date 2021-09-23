<?php

declare(strict_types=1);

namespace FELH;

class Types_QuestDef_SpawnRating extends DataType_Integer
{
    public function getLabel() : string
    {
        return t('Spawn rating');
    }
}
