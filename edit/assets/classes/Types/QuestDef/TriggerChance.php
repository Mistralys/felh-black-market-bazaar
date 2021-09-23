<?php

declare(strict_types=1);

namespace FELH;

use function AppUtils\sb;

class Types_QuestDef_TriggerChance extends DataType_Integer
{
    public function getLabel() : string
    {
        return t('Trigger chance');
    }

    public function getDescription() : string
    {
        return (string)sb()
            ->t('Maximum value found in game files was %1$s.', 1000)
            ->t('This value is typically used to force the trigger.')
            ->t('Example:')
            ->t('The Bacco quest triggered at turn 25.');
    }
}
