<?php

declare(strict_types=1);

namespace FELH;

class Types_QuestDef_QuestObjectiveDef_QuestChoiceDef_Encounter_BattleIdentifier extends DataType_String
{
    public function getLabel() : string
    {
        return t('Battle identifier');
    }
}
