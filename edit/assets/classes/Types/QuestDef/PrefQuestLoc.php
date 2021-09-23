<?php

declare(strict_types=1);

namespace FELH;

class Types_QuestDef_PrefQuestLoc extends DataType_StringEnum
{
    public function getLabel() : string
    {
        return t('Preferred location');
    }

    public function getValues() : array
    {
        return array(
            'QuestLoc_Inn1' => t('Inn 1')
        );
    }
}
