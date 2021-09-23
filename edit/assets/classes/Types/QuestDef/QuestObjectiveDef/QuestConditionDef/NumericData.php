<?php

declare(strict_types=1);

namespace FELH;

class Types_QuestDef_QuestObjectiveDef_QuestConditionDef_NumericData extends DataType_Integer
{
    public function getLabel() : string
    {
        return t('Numeric data');
    }
}
