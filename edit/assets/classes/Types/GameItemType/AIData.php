<?php

namespace FELH;

class Types_GameItemType_AIData extends DataType_Container
{
    public function getPersonalityID() : string
    {
        return $this->getAttribute('AIPersonality');
    }
    
    public function getPriority() : int
    {
        return $this->objPriority()->getValue();
    }
        
    public function objPriority() : Types_GameItemType_AIData_AIPriority
    {
        return $this->getChildByName('AIPriority');
    }
}