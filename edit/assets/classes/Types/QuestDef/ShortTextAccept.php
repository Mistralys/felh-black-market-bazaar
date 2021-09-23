<?php

declare(strict_types=1);

namespace FELH;

class Types_QuestDef_ShortTextAccept extends DataType_String
{
    public function getLabel() : string
    {
        return t('Accept quest text');
    }
}
