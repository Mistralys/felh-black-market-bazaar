<?php

declare(strict_types=1);

namespace FELH;

class Types_QuestDef_QuestObjectiveDef_QuestConditionDef_Type extends DataType_StringEnum
{
    public function getLabel() : string
    {
        return t('Type');
    }

    protected function getValues() : array
    {
        return array(
            'ClearGoodieHut' => t('Clear goodie hut'),
            'BattleFinished' => t('Battle finished')
        );
    }
}
