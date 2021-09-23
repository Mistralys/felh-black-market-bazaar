<?php

declare(strict_types=1);

namespace FELH;

class Types_QuestDef_AllowQuestRejection extends DataType_Bool
{
    public function getLabel() : string
    {
        return t('Allow quest rejection?');
    }
}
