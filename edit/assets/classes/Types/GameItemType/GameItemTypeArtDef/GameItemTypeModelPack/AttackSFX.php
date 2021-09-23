<?php

namespace FELH;

class Types_GameItemType_GameItemTypeArtDef_GameItemTypeModelPack_AttackSFX extends DataFlavors_SFXFile
{
    public function getLabel() : string
    {
        return t('Attack sound effect');
    }
    
    public function multipleAllowed() : bool
    {
        return true;
    }
    
    protected function initValues()
    {
        $this->addFormat('hit', 'Hit_%1$s_%2$02d');
        $this->addFormat('hit-nopad', 'Hit_%1$s%2$s');
        $this->addFormat('spell', 'Hit_%1$s_%2$02d');
        
        $this->add('hit', 'Staff', 3, t('Staff %1$s', '%1$s'));
        $this->add('hit', 'FireAxe', 3, t('Fire axe %1$s', '%1$s'));
        $this->add('hit', 'IceSword', 4, t('Ice sword %1$s', '%1$s'));
        $this->add('hit', 'IceSpear', 3, t('Ice spear %1$s', '%1$s'));
        $this->add('hit', 'Warhammer', 3, t('War hammer %1$s', '%1$s'));
        $this->add('hit', 'LightningHammer', 3, t('Lightning hammer  %1$s', '%1$s'));
        $this->add('hit', 'LightningPike', 3, t('Lightning pike  %1$s', '%1$s'));
        $this->add('hit', 'Axe', 3, t('Axe  %1$s', '%1$s'));
        $this->add('hit', 'Pike', 3, t('Pike  %1$s', '%1$s'));
        $this->add('hit', 'Sword', 4, t('Sword  %1$s', '%1$s'));
        $this->add('hit', 'WinterStaff', 3, t('Winter staff  %1$s', '%1$s'));
        $this->add('hit-nopad', 'Dagger', 4, t('Dagger %1$s', '%1$s'));
        $this->add('hit-nopad', 'Club', 2, t('Club %1$s', '%1$s'));
        $this->add('hit-nopad', 'HeavyClub', 2, t('Heavy club %1$s', '%1$s'));
        $this->add('hit-nopad', 'Arrow', 2, t('Arrow %1$s', '%1$s'));
        
        $this->add('spell', 'Shockwave', 1, t('Shockwave spell'));
        $this->add('spell', 'Sacrifice', 1, t('Sacrifice spell'));
    }
}