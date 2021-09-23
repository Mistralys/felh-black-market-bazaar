<?php

declare(strict_types=1);

namespace FELH;

class Types_GameItemType_GameItemTypeArtDef_GameItemTypeModelPack_SFX extends DataFlavors_SFXFile
{
    public function getLabel() : string
    {
        return t('Sound effect');
    }
    
    public function multipleAllowed() : bool
    {
        return true;
    }
    
    protected function initValues()
    {
        $this->addFormat('equip', 'Equip_%1$s_%2$02d');
        $this->addFormat('drop', 'Drop_%1$s%2$s');
        $this->addFormat('potion', '%1$s_%2$s');
        $this->addFormat('bookof', 'BookOf%1$s_%2$02d');
        $this->addFormat('turnpage', 'TurnPage%1$s_%2$02d');
        $this->addFormat('eating', 'Eating');
        $this->addFormat('click', 'Click_%1$s_%2$02d');
        $this->addFormat('shard', '%1$sShard_SFX_%2$02d');
        $this->addFormat('gold', 'GoldCoins_%2$s');
        
        $this->add('equip', 'Cloak', 3, t('Equip cloak %1$s', '%1$s'));
        $this->add('equip', 'MagicRing', 4, t('Equip magic ring %1$s', '%1$s'));
        $this->add('equip', 'Poison', 1, t('Equip poison'));
        $this->add('potion', 'Potion1', 2, t('Drink potion %1$s', '%1$s'));
        $this->add('bookof', 'Experience', 3, t('Book of experience %1$s', '%1$s'));
        $this->add('turnpage', 'Magical', 3, t('Turning magic book page %1$s', '%1$s'));
        $this->add('eating', '', 1, t('Eating'));
        $this->add('drop', 'MetalItem', 1, t('Dropping metal item'));
        $this->add('click', 'IceElemental', 3, t('Ice Elemental click %1$s', '%1$s'));
        $this->add('shard', 'Air', 1, t('Air shard'));
        $this->add('gold', '', 3, t('Gold coins %1$s', '%1$s'));
    }
}