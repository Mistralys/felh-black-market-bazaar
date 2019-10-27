<?php

declare(strict_types=1);

namespace FELH;

class Editor
{
   /**
    * @var Items
    */
    protected $items;
    
   /**
    * @var Site
    */
    protected $site;
    
    public function __construct(Site $site)
    {
        $this->site = $site;
        
        $this->items = new Items($this);
        $this->items->addFolder('Black Market Bazaar', $site->getWebrootFolder().'/../Black Market Bazaar');
        $this->items->addFolder('Core Game', APP_GAME_PATH.'/data/English');
        $this->items->load();
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
