<?php

declare(strict_types=1);

namespace FELH;

class Types_QuestDef_QuestObjectiveDef_QuestChoiceDef_Encounter_WillRespawn extends DataType_Bool
{
    public function getLabel() : string
    {
        return t('Will respawn?');
    }
}
