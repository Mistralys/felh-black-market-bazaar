<?php

declare(strict_types=1);

namespace FELH;

class Types_QuestDef_TriggerType extends DataType_StringEnum
{
    public function getLabel() : string
    {
        return t('Trigger type');
    }

    public function getValues() : array
    {
        return array(
            'QuestLocation' => t('Quest location'),

            // needs TriggerData
            'TurnNumber' => t('Turn number')
        );
    }
}
