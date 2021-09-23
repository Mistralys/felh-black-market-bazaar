<?php

declare(strict_types=1);

namespace FELH;

class Types_QuestDef_QuestObjectiveDef_QuestChoiceDef_QuestFailure extends DataType_Bool
{
    public function getLabel() : string
    {
        return t('Is quest failure?');
    }
}
