<?php

namespace FELH;

abstract class DataType_Container extends DataType
{
    public function isContainer() : bool
    {
        return true;
    }
}