<?php

declare(strict_types=1);

namespace FELH;

class Types_GameItemType_IsQuestItem extends DataType_Bool
{
    public function getLabel() : string
    {
        return t('Is a quest item?');
    }
}