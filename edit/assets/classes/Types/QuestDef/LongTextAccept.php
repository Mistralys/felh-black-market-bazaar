<?php

declare(strict_types=1);

namespace FELH;

class Types_QuestDef_LongTextAccept extends DataFlavors_Description
{
    public function getLabel() : string
    {
        return t('Long accept text');
    }
}
