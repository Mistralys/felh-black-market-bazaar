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
    * @var Items_Item
    */
    protected $item;
    
    protected function processActions()
    {
        $this->editor = $this->site->createEditor();
        $this->item = $this->editor->getItems()->getByRequest();

        if($this->item === null) {
            $this->redirectWithErrorMessage(
                t('Unknown item'), 
                $this->items->getURLList()
            );
        }
    }
    
    protected function _renderContent(): string
    {
        $this->ui->addScript('css/main.css');   
        
        ob_start();
        
        ?>
        	<p>
            	<a href="<?php echo $this->item->getURLEdit() ?>" class="btn btn-primary">
            		<?php pt('Edit item') ?>
            	</a>
        	</p>
        <?php 
        
        echo $this->item->toHTML();
        	
        return ob_get_clean();
    }
}