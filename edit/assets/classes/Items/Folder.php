<?php

declare(strict_types=1);

namespace FELH;

class Items_Folder
{
    const ERROR_PATH_DOES_NOT_EXIST = 40901;
    
   /**
    * @var string
    */
    protected $label;
    
   /**
    * @var string
    */
    protected $path;
    
    protected $subfolders = array(
        'xml' => '',
        'data' => '',
        'gfx' => 'Gfx'
    );
    
    public function __construct(string $label, string $path)
    {
        $this->label = $label;
        $this->path = realpath($path);
        
        if($this->path === false) {
            throw new Exception(
                sprintf('Invalid path for folder [%s]: it does not exist.', $label),
                null,
                self::ERROR_PATH_DOES_NOT_EXIST
            );
        }
    }
    
    public static function fromArray(array $data) : Items_Folder
    {
        return new Items_Folder($data['label'], $data['path']);
    }
    
    public function toStorageArray() : array
    {
        return array(
            'label' => $this->getLabel(),
            'path' => $this->getPath()
        );
    }
    
    public function getLabel() : string
    {
        return $this->label;
    }

    public function getPath() : string
    {
        return $this->path;
    }
    
    public function getXMLPath() : string
    {
        return $this->getSubfolder('xml');
    }
    
    public function getDataPath() : string
    {
        return $this->getSubfolder('data');
    }
    
    public function getGfxPath() : string
    {
        return $this->getSubfolder('gfx');
    }
    
    protected function getSubfolder(string $type) : string
    {
        return $this->path.'/'.$this->subfolders[$type];
    }
    
    public function setXMLSubfolder(string $subfolder)
    {
        return $this->setSubfolder('xml', $subfolder);
    }
    
    public function setDataSubfolder(string $subfolder)
    {
        return $this->setSubfolder('data', $subfolder);
    }
    
    public function setGfxSubfolder(string $subfolder)
    {
        return $this->setSubfolder('gfx', $subfolder);
    }
    
    protected function setSubfolder(string $type, string $folder) : Items_Folder
    {
        $this->subfolders[$type] = $folder;
        return $this;
    }
    
}