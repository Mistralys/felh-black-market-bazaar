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
   /**
    * @var Items_XMLTag
    */
    protected $tag;

   /**
    * @var DataType
    */
    protected $dataType;
    
    protected $items;
    
    protected function init()
    {
        $this->items = Editor::getInstance()->getItems();
    }
    
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
    
    public function getTag() : Items_XMLTag
    {
        if(!isset($this->tag)) 
        {
            $this->tag = $this->items->getTagByID($this->getRecordIntKey('tag_id'));
        }
        
        return $this->tag;
    }

    public function getFolderID() : string
    {
        return $this->getRecordStringKey('folder_id');
    }
    
    public function getFolder() : Items_Folder
    {
        if(!isset($this->folder)) 
        {
            $this->folder = $this->items->getFolderByID($this->getFolderID());
        }
        
        return $this->folder;
    }
    
    public function getURLView($params=array())
    {
        $params['record_id'] = $this->getID();
        
        return Editor::getInstance()->getSite()->buildSlugURL(
            'Items.View', 
            $params
        );
    }
    
    public function getDataType() : DataType
    {
        if(isset($this->dataType)) {
            return $this->dataType;
        }
        
        $tag = $this->getTag();
        
        $class = '\FELH\Types_'.$tag->getName();
        
        $data = $this->unpackData();
        
        $obj = call_user_func(array($class, 'fromArray'), $this->items, $tag->getName(), $data);
        
        if($obj instanceof DataType_RootContainer)
        {
            $obj->setSourceFile($data['sourceFile']);
            $obj->setFolder($this->getFolder());
            $obj->setTag($tag);
            
            $this->dataType = $obj;
            return $obj;
        }
        
        throw new Exception(
            'Root container item does not extend DataType_RootContainer',
            'Class: '.get_class($obj),
            Items::ERROR_ROOT_CONTAINER_WRONG_CLASS
        );
    }
    
    protected function unpackData() : array
    {
        return json_decode($this->getRecordStringKey('data'), true);
    }
}
