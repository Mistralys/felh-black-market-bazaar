<?php

declare(strict_types=1);

namespace FELH;

class Types_QuestDef_QuestObjectiveDef_ObjectiveID extends DataType_Integer
{
    public function getLabel() : string
    {
        return t('Objective Nr.');
    }
}
