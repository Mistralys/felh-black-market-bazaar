<?php

declare(strict_types=1);

namespace FELH;

class Types_GameItemType_GameItemTypeArtDef_GameItemTypeModelPack_GameItemTypeModel_AnimationPack extends DataType_StringEnum
{
    public function getLabel() : string
    {
        return t('Animation pack');
    }
    
    protected function getValues(): array
    {
        return array(
            'MountedHorseAnimationPack' => t('Mounted horse'),
            'MountedWargAnimationPack' => t('Mounted warg'),
            'SpiderMountAnimationPack' => t('Spider mount'),
            'DragonMountAnimationPack' => t('Dragon mount'),
            'BroodSpiderAnimationPack' => t('Brood spider mount'),
        );
    }
}