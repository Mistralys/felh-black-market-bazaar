<?php

declare(strict_types=1);

namespace FELH;

class Types_GameItemType_GameModifier_StrVal2 extends DataType_StringEnum
{
    public function getLabel() : string
    {
        return t('Type');
    }
    
    protected function getValues(): array
    {
        return array(
            'Beast' => t('Beasts'),
            'Dragon' => t('Dragons'),
            'Elemental' => t('Elementals'),
            'Twisted' => t('Twisted'),
            'Undead' => t('Undead'),
            'Champion' => t('Champions'),
            'Construct' => t('Constructs'),
            'Bandit' => t('Bandits')
        );
    }

}