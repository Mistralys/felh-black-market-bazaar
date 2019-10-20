<?php

namespace FELH;

class Page_Items_Edit extends Page
{
    public function getPageAbstract(): string
    {
        return 'This allows you to edit the item.';
    }
    
    public function getPageTitle(): string
    {
        return 'Edit item';
    }
    
    public function getNavigationTitle() : string
    {
        return 'Edit';
    }
    
    public function getDefaultSlug(): string
    {
        return '';
    }
    
    protected function initNavigation(): void
    {
        
    }
    
    /**
     * @var Editor
     */
    protected $editor;
    
    protected function processActions()
    {
        $this->editor = new Editor($this->site->getWebrootFolder());
    }
    
    protected function _renderContent(): string
    {
        
        
        ob_start();
        ?>
        	Item here
        <?php 
        
        return ob_get_clean();
    }
}