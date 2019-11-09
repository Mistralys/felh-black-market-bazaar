<?php

declare(strict_types=1);

namespace FELH;

/**
 * Database record filters: allows searching for XML records
 * stored in the database, using configurable filters.
 * 
 * @package FELH
 * @subpackage DataTypes
 * @author AeonOfTime <eve@aeonoftime.com>
 */
class Items_Collection_Filters extends \AppDB\DBHelper_BaseFilterCriteria
{
    public function getTableAlias(): string
    {
        return 'main';
    }

    public function getTableName(): string
    {
        return 'records';
    }

    protected function prepareQuery()
    {
        
    }
    
   /**
    * Retrieves all matching records. Alias for the
    * base method getItemsObjects, but with the correct
    * return type.
    * 
    * @return Items_Collection_Record[]
    */
    public function getRecords()
    {
        return $this->getItemsObjects();
    }
}
