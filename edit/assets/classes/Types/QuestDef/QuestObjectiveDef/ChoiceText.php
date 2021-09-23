<?php

declare(strict_types=1);

namespace FELH;

class Types_QuestDef_QuestObjectiveDef_ChoiceText extends DataFlavors_Description
{
    public function getLabel() : string
    {
        return t('Choice text');
    }
}
