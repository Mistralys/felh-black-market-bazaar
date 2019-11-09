<?php

namespace FELH;

/**
 * Database records collection: used to access the XML records
 * that are cached in the database. This is used to allow fetching
 * only the required records, without having to do intensive file
 * and memory operations by working with the XML files directly.
 *
 * @package FELH
 * @subpackage DataTypes
 * @author AeonOfTime <eve@aeonoftime.com>
 */
class Items_Collection extends \AppDB\DBHelper_BaseCollection
{
    public function getRecordClassName()
    {
        return Items_Collection_Record::class;
    }

    public function getRecordSearchableColumns()
    {
        return array(
            'label'
        );
    }

    public function getCollectionLabel()
    {
        return t('XML records');
    }

    public function getRecordLabel()
    {
        return t('XML record');
    }

    public function getRecordDefaultSortKey()
    {
        return 'label';
    }

    public function getRecordTableName()
    {
        return 'records';
    }

    public function getRecordProperties()
    {
        return array(
            'label' => t('Label')
        );
    }

    public function getRecordFiltersClassName()
    {
        return Items_Collection_Filters::class;
    }

    public function getRecordTypeName()
    {
        return 'record';
    }

    public function getRecordPrimaryName()
    {
        return 'record_id';
    }
}
