<?php

declare(strict_types=1);

namespace FELH;

class Types_QuestDef_AIAcceptChance extends DataType_Percentage
{
    public function getLabel() : string
    {
        return t('AI accept chance');
    }
}
