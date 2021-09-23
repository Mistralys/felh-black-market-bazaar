<?php

namespace FELH;

class Types_QuestDef_IsStartingPointQuest extends DataType_Bool
{
    public function getLabel() : string
    {
        return t('Is starting point?');
    }
}