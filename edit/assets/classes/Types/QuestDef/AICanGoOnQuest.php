<?php

declare(strict_types=1);

namespace FELH;

class Types_QuestDef_AICanGoOnQuest extends DataType_Bool
{
    public function getLabel() : string
    {
        return t('AI can do quest?');
    }
}
