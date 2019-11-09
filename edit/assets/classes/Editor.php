<?php

declare(strict_types=1);

namespace FELH;

class Editor
{
    const ERROR_INSTANCE_NOT_READY_YET = 41001;
    
   /**
    * @var Items
    */
    protected $items;
    
   /**
    * @var Site
    */
    protected $site;
    
    protected static $instance;
    
    public function __construct(Site $site)
    {
        $this->site = $site;
        
        self::$instance = $this;
        
        $this->items = new Items($this);

        $this->items->addFolder('Core Game', APP_GAME_PATH)
        ->setXMLSubfolder('data/English')
        ->setDataSubfolder('data')
        ->setGfxSubfolder('Gfx');
        
        $this->items->addFolder('Black Market Bazaar', $site->getWebrootFolder().'/../Mods')
        ->setXMLSubfolder('Black Market Bazaar')
        ->setGfxSubfolder('Gfx/Black Market Bazaar Icons')
        ->setDataSubfolder('Data');
    }
    
    public static function getInstance() : Editor
    {
        if(isset(self::$instance)) {
            return self::$instance;
        }
        
        throw new Exception(
            'Editor instance not yet available.',
            null,
            self::ERROR_INSTANCE_NOT_READY_YET
        );
    }
    
    public function getSite() : Site
    {
        return $this->site;
    }
    
    public function getItems() : Items
    {
        return $this->items;
    }
}
