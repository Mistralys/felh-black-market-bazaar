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
}
