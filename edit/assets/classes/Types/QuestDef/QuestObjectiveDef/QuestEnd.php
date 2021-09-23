<?php

declare(strict_types=1);

namespace FELH;

class Types_QuestDef_QuestObjectiveDef_QuestEnd extends DataType_Bool
{
    public function getLabel() : string
    {
        return t('Ends the quest?');
    }
}
