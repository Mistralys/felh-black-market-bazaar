<?php

declare(strict_types=1);

namespace FELH;

class Types_QuestDef_LongTextDeny extends DataFlavors_Description
{
    public function getLabel() : string
    {
        return t('Long deny text');
    }
}
