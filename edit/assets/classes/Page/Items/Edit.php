<?php

namespace FELH;

class Page_Items_Edit extends Page
{
    public function getPageAbstract(): string
    {
        return t('This allows you to edit the item.');
    }
    
    public function getPageTitle(): string
    {
        return $this->item->getLabel();
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
    
   /**
    * @var Items_Collection_Record
    */  
    protected $record;
    
   /**
    * @var DataType
    */
    protected $item;
    
    protected function processActions()
    {
        $this->editor = $this->site->createEditor();
        $this->record = $this->editor->getItems()->getCollection()->getByRequest();
        
        if($this->record === null) {
            $this->redirectWithErrorMessage(
                t('Unknown item'),
                $this->items->getURLList()
            );
        }
        
        $this->item = $this->record->getDataType();
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