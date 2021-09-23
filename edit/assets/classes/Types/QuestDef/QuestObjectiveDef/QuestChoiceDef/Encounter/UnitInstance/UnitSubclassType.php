<?php

declare(strict_types=1);

namespace FELH;

class Types_QuestDef_QuestObjectiveDef_QuestChoiceDef_Encounter_UnitInstance_UnitSubclassType extends DataFlavors_GameModifier_UnitClass
{
    public function getLabel() : string
    {
        return t('Unit subclass');
    }
}
