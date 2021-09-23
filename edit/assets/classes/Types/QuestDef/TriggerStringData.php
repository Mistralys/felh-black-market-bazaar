<?php

declare(strict_types=1);

namespace FELH;

class Types_QuestDef_TriggerStringData extends DataType_String
{
    public function getLabel() : string
    {
        return t('Trigger data (string)');
    }
}
