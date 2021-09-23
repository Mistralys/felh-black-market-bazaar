<?php

declare(strict_types=1);

namespace FELH;

class Types_QuestDef_QuestObjectiveDef_PopupObjectiveMsg extends DataType_Bool
{
    public function getLabel() : string
    {
        return t('Show objective popup?');
    }
}
