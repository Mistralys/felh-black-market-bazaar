<?php

declare(strict_types=1);

namespace FELH;

class Types_QuestDef_QuestObjectiveDef_QuestChoiceDef_Encounter_UnitInstance_UnitGroupingType extends DataType_StringEnum
{
    public function getLabel() : string
    {
        return t('Unit grouping');
    }

    protected function getValues() : array
    {
        return array(
            'UnitGroupingType_Group' => t('Group'),
            'UnitGroupingType_Party' => t('Party')
        );
    }
}
