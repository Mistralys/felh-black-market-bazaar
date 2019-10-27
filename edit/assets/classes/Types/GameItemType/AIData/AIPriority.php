<?php

namespace FELH;

class Types_GameItemType_AIData_AIPriority extends DataType_Integer
{
    public function getLabel() : string
    {
        return t('Priority');
    }
}