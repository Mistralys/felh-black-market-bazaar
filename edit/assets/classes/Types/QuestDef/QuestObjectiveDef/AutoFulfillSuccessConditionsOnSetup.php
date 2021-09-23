<?php

declare(strict_types=1);

namespace FELH;

class Types_QuestDef_QuestObjectiveDef_AutoFulfillSuccessConditionsOnSetup extends DataType_Bool
{
    public function getLabel() : string
    {
        return t('Auto success?');
    }

    public function getDescription() : string
    {
        return t('Whether to automatically fulfill the success conditions on quest setup.');
    }
}
