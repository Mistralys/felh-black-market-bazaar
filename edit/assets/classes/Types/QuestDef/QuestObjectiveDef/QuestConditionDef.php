<?php

declare(strict_types=1);

namespace FELH;

class Types_QuestDef_QuestObjectiveDef_QuestConditionDef extends DataType_Container
{
    public function getLabel() : string
    {
        return t('Condition');
    }
}
