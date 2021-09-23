<?php

declare(strict_types=1);

namespace FELH;

class Types_QuestDef_SuccessText extends DataType_Text
{
    public function getLabel() : string
    {
        return t('Success text');
    }
}
