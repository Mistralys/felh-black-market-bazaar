<?php

declare(strict_types=1);

namespace FELH;

class Types_QuestDef_Image extends DataFlavors_PNGFile
{
    public function getLabel() : string
    {
        return t('Quest image');
    }
}
