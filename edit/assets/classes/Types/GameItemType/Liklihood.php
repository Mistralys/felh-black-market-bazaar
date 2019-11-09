<?php

namespace FELH;

class Types_GameItemType_Liklihood extends DataType_Percentage
{
    public function getLabel() : string
    {
        return t('Likelihood');
    }
}