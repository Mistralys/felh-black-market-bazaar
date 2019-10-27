<?php

namespace FELH;

class Types_GameItemType_Prereq_Target extends DataType_StringEnum
{
    public function getLabel() : string
    {
        return t('Target');
    }
    
    protected function getValues(): array
    {
        return array(
            'Player' => t('Player')
        );
    }
}