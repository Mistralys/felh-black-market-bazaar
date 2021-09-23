<?php

declare(strict_types=1);

namespace FELH;

class Types_QuestDef extends DataType_RootContainer
{
    public function getLabel() : string
    {
        return t('Quest');
    }

    public function getDescription() : string
    {
        return t('Contains a quest\'s dialogue and configuration.');
    }
}
