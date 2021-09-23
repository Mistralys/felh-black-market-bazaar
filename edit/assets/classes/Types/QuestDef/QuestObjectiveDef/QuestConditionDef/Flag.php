<?php

declare(strict_types=1);

namespace FELH;

class Types_QuestDef_QuestObjectiveDef_QuestConditionDef_Flag extends DataType_StringEnum
{
    public function getLabel() : string
    {
        return t('Flag');
    }

    protected function getValues() : array
    {
        return array(
            'RevealTarget' => t('Reveal target')
        );
    }
}
