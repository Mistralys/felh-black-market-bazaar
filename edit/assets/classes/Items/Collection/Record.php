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
    
    public function getLabel() : string
    {
        return $this->getRecordStringKey('label');
    }
    
   /**
    * The source file name without path.
    * @return string
    */
    public function getSourceFile() : string
    {
        return $this->getRecordStringKey('source_file');
    }
    
    public function getFolderLabel()  : string
    {
        return $this->getRecordStringKey('folder_label');
    }
    
    public function getTag() : Items_XMLTag
    {
        $items = Editor::getInstance()->getItems();
        return $items->getTagByID($this->getRecordIntKey('tag_id'));
    }
    
    public function getURLView($params=array())
    {
        $params['record_id'] = $this->getID();
        
        return Editor::getInstance()->getSite()->buildSlugURL(
            'Items.View', 
            $params
        );
    }
}
