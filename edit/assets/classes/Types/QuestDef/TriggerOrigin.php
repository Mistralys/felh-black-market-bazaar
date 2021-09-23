<?php

declare(strict_types=1);

namespace FELH;

class Types_QuestDef_TriggerOrigin extends DataType_StringEnum
{
    public function getLabel() : string
    {
        return t('Trigger origin');
    }

    public function getValues() : array
    {
        return array(
            'EventLocation' => t('Event location')
        );
    }
}
