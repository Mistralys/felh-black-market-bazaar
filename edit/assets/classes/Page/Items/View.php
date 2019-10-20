<?php

namespace FELH;

class Page_Items_View extends Page
{
    public function getPageAbstract(): string
    {
        return $this->item->getDescription();
    }
    
    public function getPageTitle(): string
    {
        return $this->item->getLabel();
    }
    
    public function getNavigationTitle() : string
    {
        return $this->item->getLabel();
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
    
   /**
    * @var Items
    */
    protected $items;
    
   /**
    * @var Items_Item
    */
    protected $item;
    
    protected function processActions()
    {
        $this->editor = new Editor($this->site->getWebrootFolder());
        $this->items = $this->editor->getItems();
        
        $id = $this->request->getParam('item_id');
        
        $this->item = $this->items->getByID($id);
        
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