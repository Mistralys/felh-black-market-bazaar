<?php

namespace FELH;

class Items_Data_AI extends Items_Data
{
    public function getAIPersonality() : string
    {
        if(!isset($this->data[0])) {
            return '';
        }
        
        return $this-data>[0]['@attributes']['AIPersonality'];
    }
    
    public function getAIPriority() : string
    {
        if(!isset($this->data[0])) {
            return '';
        }
        
        return $this->data[0]['AIPriority'];
    }
}