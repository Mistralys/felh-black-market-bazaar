<?php

declare(strict_types=1);

namespace FELH;

class Types_QuestDef_QuestObjectiveDef_ChoiceBackground extends DataFlavors_PNGFile
{
    public function getLabel() : string
    {
        return t('Choice background');
    }
}
