<?php

namespace FELH;

class Types_GameItemType_GameItemTypeArtDef extends DataType_Container
{
    public function getLabel() : string
    {
        return t('Type art definition');
    }
    
    public function getIcon() : ?Types_GameItemType_GameItemTypeArtDef_GameItemTypeModelPack_IconFile
    {
        $modelPacks = $this->getModelPacks();
        if(!empty($modelPacks)) {
            return $modelPacks[0]->getIcon();
        }
        
        return null;
    }
        
   /**
    * @return Types_GameItemType_GameItemTypeArtDef_GameItemTypeModelPack[]
    */
    public function getModelPacks()
    {
        return $this->getChildrenByName('GameItemTypeModelPack');
    }
}