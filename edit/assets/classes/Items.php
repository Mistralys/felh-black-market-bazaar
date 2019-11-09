<?php

declare(strict_types=1);

namespace FELH;

use AppDB\DBHelper;

class Items
{
    const DATA_VERSION = 1;
    
    const ERROR_UNKNOWN_ITEM_ID = 40201;
    
    const ERROR_ROOT_CONTAINER_WRONG_CLASS = 40202;
    
    const ERROR_UNKNOWN_TAG_ID = 40203;
    
   /**
    * @var Items_Folder[]
    */
    protected $folders = array();
    
   /**
    * @var DataType[]
    */
    protected $items = array();
    
   /**
    * @var Editor
    */
    protected $editor;
    
   /**
    * @var \AppUtils\Request
    */
    protected $request;
    
   /**
    * @var string
    */
    protected $cacheFile;
    
   /**
    * @var Items_XMLTag[]
    */
    protected $tags = array();
    
   /**
    * @var Items_Collection
    */
    protected $collection;
    
    public function __construct(Editor $editor)
    {
        $this->editor = $editor;
        $this->request = $editor->getSite()->getRequest();
        $this->cacheFile = $editor->getSite()->getWebrootFolder().'/storage/cache.json';
        $this->collection = new Items_Collection();
        
        $this->registerTags();
    }
    
    public function addFolder(string $label, string $folder) : Items_Folder
    {
        $folder = new Items_Folder($label, $folder);
        $this->folders[] = $folder;
        
        return $folder;
    }
 
    protected function registerTag(string $name, int $dbID, string $label)
    {
        $this->tags[] = new Items_XMLTag($name, $dbID, $label); 
    }

    protected function registerTags()
    {
        $this->registerTag('GameItemType', 1, t('Items'));
    }
    
   /**
    * Retrieves the collection instance which is used to
    * access the XML elements that have been cached in the
    * database.
    * 
    * @return Items_Collection
    */
    public function getCollection() : Items_Collection
    {
         return $this->collection;
    }
    
    public function load() : void
    {
        DBHelper::startTransaction();
        
        DBHelper::deleteRecords('records');
        
        foreach($this->folders as $folder)
        {
            $d = new \DirectoryIterator($folder->getXMLPath());
            foreach($d as $item) 
            {
                if(!$item->isFile()) {
                    continue;
                }
                
                $ext = strtolower($item->getExtension());
                if($ext != 'xml') {
                    continue;
                }
                
                $found = array();
                $content = file_get_contents($item->getPathname());
                foreach($this->tags as $tag)
                {
                    $tagName = $tag->getName();
                    
                    if(strstr($content, '<'.$tagName)) {
                        $found[] = $tag;
                        break;
                    }
                }
                
                unset($content);
                
                if(empty($found)) {
                    continue;
                }
                
                $reader = new Reader($this, $folder, $item->getPathname(), $found);
                $reader->parse();
            }
        }
        
        foreach($this->items as $item)
        {
            if($item instanceof DataType_RootContainer) {
                $item->toDatabase();
            }
        }
        
        DBHelper::updateDynamic(
            'config', 
            array(
                'date_loaded' => date('Y-m-d H:i:s'),
                'data_version' => self::DATA_VERSION
            ), 
            array()
        );
        
        DBHelper::commitTransaction();
    }
    
    public function addFromNode(Items_XMLTag $tag, \DOMElement $itemNode, string $xmlFile, Items_Folder $folder)
    {
        $class = '\FELH\Types_'.$tag->getName();
        
        $obj = call_user_func(array($class, 'fromNode'), $this, $tag->getName(), $itemNode);
        
        if($obj instanceof DataType_RootContainer) 
        {
            $obj->setSourceFile($xmlFile);
            $obj->setFolder($folder);
            $obj->setTag($tag);
            $this->items[] = $obj;
            return;
        }
        
        throw new Exception(
            'Root container item does not extend DataType_RootContainer',
            'Class: '.get_class($obj),
            self::ERROR_ROOT_CONTAINER_WRONG_CLASS
        );
    }
    
   /**
    * Retrieves all items, sorted by label.
    * @return DataType[]
    */
    public function getItems()
    {
        return $this->items;
    }
  
    public function getByID(string $id) : DataType
    {
        foreach($this->items as $item) {
            if($item->getID() === $id) {
                return $item;
            }
        }
        
        throw new Exception(
            'Unknown item ID',
            sprintf(
                'There is no item with the ID [%s] in the collection.',
                \AppUtils\parseVariable($id)->toString()    
            ),
            self::ERROR_UNKNOWN_ITEM_ID
        );
    }
    
    public function idExists(string $id) : bool
    {
        foreach($this->items as $item) {
            if($item->getID() === $id) {
                return true;
            }
        }
        
        return false;
    }
    
    public function getByRequest() : ?DataType
    {
        $id = $this->request->getParam('item_id');
        if(!empty($id) && $this->idExists($id)) {
            return $this->getByID($id);
        }
        
        return null; 
    }
    
    public function getURLList(array $params=array()) : string
    {
        $params['slug'] = 'Items';
        
        return $this->editor->getSite()->buildURL($params);
    }
    
   /**
    * Retrieves a supported XML tag by its ID.
    * 
    * @param int $id
    * @throws Exception
    * @return Items_XMLTag
    */
    public function getTagByID(int $id) : Items_XMLTag
    {
        foreach($this->tags as $tag)
        {
            if($tag->getDBID() === $id) {
                return $tag;
            }
        }
        
        throw new Exception(
            'Unknown XML tag ID.',
            sprintf('Cannot find any tag for the ID [%s].', $id),
            self::ERROR_UNKNOWN_TAG_ID
        );
    }
    
   /**
    * Checks whether the database cache is present, and valid.
    * @return bool
    */
    public function isDatabaseValid() : bool
    {
        $config = DBHelper::fetchData('config');
        
        if(empty($config)) {
            return false;
        }
        
        if((int)$config['data_version'] !== self::DATA_VERSION) {
            return false;
        }
        
        return true;
    }
}
