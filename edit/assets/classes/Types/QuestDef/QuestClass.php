<?php

namespace FELH;

class Types_QuestDef_QuestClass extends DataType_StringEnum
{
    public function getLabel() : string
    {
        return t('Quest class');
    }

    protected function getValues(): array
    {
        return array(
            'Minor' => t('Minor'),
        );
    }
}