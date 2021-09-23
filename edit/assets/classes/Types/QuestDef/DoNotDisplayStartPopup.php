<?php

declare(strict_types=1);

namespace FELH;

class Types_QuestDef_DoNotDisplayStartPopup extends DataType_Bool
{
    public function getLabel() : string
    {
        return t('Disable start popup?');
    }

    public function getDescription() : string
    {
        return t('Whether to not show the starting quest popup.');
    }
}
