<?php

namespace FELH;

/**
 * Database XML record: Used to access all information on 
 * a record by using the cached data in the database. Every
 * record contains the original information from the source
 * XML file.
 *
 * @package FELH
 * @subpackage DataTypes
 * @author AeonOfTime <eve@aeonoftime.com>
 */
class Items_Collection_Record extends \AppDB\DBHelper_BaseRecord
{
    protected function recordRegisteredKeyModified($name, $label, $isStructural, $oldValue, $newValue)
    {
        
    }
}