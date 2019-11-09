<?php

declare(strict_types=1);

namespace FELH;

use AppDB\DBHelper;

class Site extends \Microsite\Site
{
    public function getDefaultSlug() : string
    {
        return 'Items';
    }
    
    public function getSlug() : string
    {
        return $this->getDefaultSlug();
    }
    
    public function getDocumentTitle() : string
    {
        return 'Fallen Enchantress: Legendary Heroes item editor';
    }
    
    public function getNavigationTitle() : string
    {
        return 'Item editor';
    }
    
    protected function initNavigation() : void
    {
        $this->navigation->addPage($this->getPageBySlug($this->getDefaultSlug()));
        $this->navigation->addPage($this->getPageBySlug('Items.Load'));
    }
    
    /**
     * @var Editor
     */
    protected $editor;
    
    public function createEditor() : Editor
    {
        if(!isset($this->editor)) {
            $this->editor = new Editor($this);
        }
        
        return $this->editor;
    }
    
    protected function init()
    {
        // Initialize the database access
        DBHelper::addDatabase('main', APP_DB_NAME)
        ->setCredentials(APP_DB_USER, APP_DB_PASSWORD)
        ->setHost(APP_DB_HOST);
    }
}
