<?php

declare(strict_types=1);

namespace FELH;

abstract class DataType_RootContainer extends DataType_Container
{
    protected $folder;

    protected $sourceFile;
    
   /**
    * @var Items_XMLTag
    */
    protected $tag;
    
    public function getID()
    {
        return $this->getAttribute('InternalName');
    }
    
    public function setSourceFile(string $file)
    {
        $this->sourceFile = $file;
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
        return \AppUtils\FileHelper::getFilename($this->getSourceFile());
    }
    
    public function setFolder(Items_Folder $folder)
    {
        $this->folder = $folder;
    }
    
    public function setTag(Items_XMLTag $tag)
    {
        $this->tag = $tag;
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
    
    public function getRecord() 
    {
        
    }
    
    abstract public function getDescription() : string;
}
