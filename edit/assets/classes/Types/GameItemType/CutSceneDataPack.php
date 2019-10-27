<?php

namespace FELH;

class Types_GameItemType_CutSceneDataPack extends DataType_StringEnum
{
    public function getLabel() : string
    {
        return t('Cut scene data pack');
    }
    
    protected function getValues(): array
    {
        return array(
            'HorseMountCutScenePack' => t('Horse mount scene'),
            'WargMountCutScenePack' => t('Warg mount scene'),
            'SpiderMountCutScenePack' => t('Spider mount scene'),
            'DragonMountCutScenePack' => t('Dragon mount scene'),
            'BroodUnitCutscenePack' => t('Brood mount scene')
        );
    }
}