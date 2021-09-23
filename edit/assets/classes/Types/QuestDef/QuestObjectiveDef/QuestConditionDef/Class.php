<?php

declare(strict_types=1);

namespace FELH;

class Types_QuestDef_QuestObjectiveDef_QuestConditionDef_Class extends DataType_StringEnum
{
    public function getLabel() : string
    {
        return t('Class');
    }

    protected function getValues() : array
    {
        return array(
            'Success' => t('Success')
        );
    }
}
