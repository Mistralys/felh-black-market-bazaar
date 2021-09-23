<?php

declare(strict_types=1);

namespace FELH;

class Types_QuestDef_QuestObjectiveDef_ChoiceMedallion extends DataFlavors_PNGFile
{
    public function getLabel() : string
    {
        return t('Choice medallion');
    }
}
