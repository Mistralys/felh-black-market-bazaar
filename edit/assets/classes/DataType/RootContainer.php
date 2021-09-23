<?php

declare(strict_types=1);

namespace FELH;

use AppUtils\FileHelper;

abstract class DataType_RootContainer extends DataType_Container
{
    const ERROR_CANNOT_CHANGE_RECORD = 41301;
    
    protected $folder;

    protected $sourceFile;
    
   /**
    * @var Items_XMLTag
    */
    protected $tag;
    
   /**
    * @var Items_Collection_Record
    */
    protected $record;

    protected function __construct(Items $items, string $tagName, $nodeOrData, ?DataType $parent = null, string $xmlFile = '', ?Items_Folder $folder = null, ?Items_XMLTag $tag = null)
    {
        $this->folder = $folder;
        $this->sourceFile = $xmlFile;
        $this->tag = $tag;

        parent::__construct($items, $tagName, $nodeOrData, $parent);
    }

    public function getID() : string
    {
        return $this->getAttribute('InternalName');
    }
    
    public function setRecord(Items_Collection_Record $record)
    {
        if(!isset($this->record)) 
        {
            $this->record = $record;
            return;
        }
        
        throw new Exception(
            'Record already set.',
            null,
            self::ERROR_CANNOT_CHANGE_RECORD
        );
    }
    
    public function getRecord() :  Items_Collection_Record
    {
        return $this->record;
    }
    
   /**
    * The absolute path to the XML source file in which the element was found.
    * @return string
    */
    public function getSourceFile() : string
    {
        return $this->sourceFile;
    }
    
   /**
    * The source XML file with extension, but no path.
    * @return string
    */
    public function getSourceFileName() : string
    {
        return FileHelper::getFilename($this->getSourceFile());
    }
    
    public function getFolder() : Items_Folder
    {
        return $this->folder;
    }
    
    public function getTag() : Items_XMLTag
    {
        return $this->tag;
    }
    
    public function toStorageArray() : array
    {
        $data = parent::toStorageArray();
        
        $data['sourceFile'] = $this->sourceFile;
        $data['folder'] = $this->folder->toStorageArray();
        $data['tag_id'] = $this->tag->getDBID();
        
        return $data;
    }
    
    protected function importArray(array $data)
    {
        $this->sourceFile = $data['sourceFile'];
        $this->folder = Items_Folder::fromArray($data['folder']);
        $this->tag = $this->items->getTagByID($data['tag_id']);
        
        parent::importArray($data);
    }
    
    protected function init()
    {
        $id = $this->getID();
        if(empty($id)) {
            throw new Exception('Root container without ID');
        }
    }
    
    public function isRoot() : bool
    {
        return true;
    }
    
    public function toDatabase()
    {
        $collection = $this->items->getCollection();
        
        $this->record = $collection->createNewRecord(array(
            'source_file' => $this->getSourceFileName(),
            'folder_id' => $this->folder->getID(),
            'tag_id' => $this->tag->getDBID(),
            'label' => $this->getLabel(),
            'description' => $this->getDescription(),
            'data' => json_encode($this->toStorageArray())
        ));
    }
    
    public function getURLEdit(array $params=array())
    {
        $params['slug'] = 'Items.Edit';
        return $this->getURL($params);
    }
    
    public function getURLView(array $params=array())
    {
        $params['slug'] = 'Items.View';
        return $this->getURL($params);
    }
    
    public function getURL(array $params=array())
    {
        $params['record_id'] = $this->getRecord()->getID();
        
        return '?'.http_build_query($params);
    }
}
