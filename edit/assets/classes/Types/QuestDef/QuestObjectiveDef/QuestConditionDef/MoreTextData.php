<?php

declare(strict_types=1);

namespace FELH;

class Types_QuestDef_QuestObjectiveDef_QuestConditionDef_MoreTextData extends DataType_Text
{
    public function getLabel() : string
    {
        return t('Text data (additional)');
    }
}
