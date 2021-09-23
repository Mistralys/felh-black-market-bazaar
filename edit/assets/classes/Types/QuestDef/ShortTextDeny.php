<?php

declare(strict_types=1);

namespace FELH;

class Types_QuestDef_ShortTextDeny extends DataType_String
{
    public function getLabel() : string
    {
        return t('Deny quest text');
    }
}
