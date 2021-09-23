<?php

declare(strict_types=1);

namespace FELH;

abstract class DataFlavors_GameModifier extends DataType_Container
{
    public function getLabel() : string
    {
        return t('Modifier');
    }

    public function multipleAllowed() : bool
    {
        return true;
    }

    public function objModType() : Types_GameItemType_GameModifier_ModType
    {
        $type = $this->getChildByName('ModType');

        if($type instanceof Types_GameItemType_GameModifier_ModType)
        {
            return $type;
        }

        throw new InstanceException(Types_GameItemType_GameModifier_ModType::class, $type);
    }
}