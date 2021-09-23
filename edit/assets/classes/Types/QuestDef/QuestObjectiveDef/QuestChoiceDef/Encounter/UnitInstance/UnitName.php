<?php

declare(strict_types=1);

namespace FELH;

class Types_QuestDef_QuestObjectiveDef_QuestChoiceDef_Encounter_UnitInstance_UnitName extends DataType_String
{
    public function getLabel() : string
    {
        return t('Unit name');
    }
}
