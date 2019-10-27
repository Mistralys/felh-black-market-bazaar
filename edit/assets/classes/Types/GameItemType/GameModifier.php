<?php

namespace FELH;

class Types_GameItemType_GameModifier extends DataType_Container
{
    public function getLabel() : string
    {
        return t('Modifier');
    }
     
    public function multipleAllowed() : bool
    {
        return true;
    }
    
    public function objModType() : Types_GameItemType_GameModifier_ModType
    {
        return $this->getChildByName('ModType');
    }
}