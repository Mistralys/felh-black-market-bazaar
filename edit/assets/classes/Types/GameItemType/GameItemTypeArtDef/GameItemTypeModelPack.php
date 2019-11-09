<?php

namespace FELH;

class Types_GameItemType_GameItemTypeArtDef_GameItemTypeModelPack extends DataType_Container
{
    public function getLabel() : string
    {
        return t('Model pack');
    }
    
   /**
    * Several are allowed, because for example the boots of the spider
    * exist in two variants, with different meshes, for different 
    * unit models (KingdomMale / UrxenMale for example).
    */
    public function multipleAllowed() : bool
    {
        return true;
    }
    
   /**
    * Retrieves the model pack's icon.
    * @return Types_GameItemType_GameItemTypeArtDef_GameItemTypeModelPack_IconFile|NULL
    */
    public function getIcon() : ?Types_GameItemType_GameItemTypeArtDef_GameItemTypeModelPack_IconFile
    {
        return $this->objIconFile();
    }
    
    public function objIconFile() : ?Types_GameItemType_GameItemTypeArtDef_GameItemTypeModelPack_IconFile
    {
        return $this->getChildByName('IconFile');
    }
}