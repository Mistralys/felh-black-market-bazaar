<?php

declare(strict_types=1);

namespace FELH;

class Types_QuestDef_RewardText extends DataType_String
{
    public function getLabel() : string
    {
        return t('Reward hint text');
    }
}
