<?php

declare(strict_types=1);

namespace FELH;

class Types_QuestDef_PostTriggerChance extends DataType_Integer
{
    public function getLabel() : string
    {
        return t('Post-trigger chance');
    }
}
