<?php

declare(strict_types=1);

namespace FELH;

class Types_GameItemType_GameItemTypeArtDef_GameItemTypeModelPack_EquipSFX extends DataType_StringEnum_SFX
{
    public function getLabel() : string
    {
        return t('Equipping sound effect');
    }
    
    public function multipleAllowed() : bool
    {
        return true;
    }
    
    protected function initValues()
    {
        $this->addFormat('equip', 'Equip_%1$s_%2$02d');
        
        $this->add('equip', 'WoodenItem', 3, t('Wooden item %1$s', '%1$s'));
        $this->add('equip', 'Sword', 3, t('Sword %1$s', '%1$s'));
        $this->add('equip', 'Dagger', 3, t('Dagger %1$s', '%1$s'));
        $this->add('equip', 'BowandArrow', 3, t('Bow and arrow %1$s', '%1$s'));
    }
}