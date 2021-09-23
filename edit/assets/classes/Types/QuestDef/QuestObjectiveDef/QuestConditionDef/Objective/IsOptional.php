<?php

declare(strict_types=1);

namespace FELH;

class Types_QuestDef_QuestObjectiveDef_QuestConditionDef_Objective_IsOptional extends DataType_Bool
{
    public function getLabel() : string
    {
        return t('Is optional?');
    }
}
