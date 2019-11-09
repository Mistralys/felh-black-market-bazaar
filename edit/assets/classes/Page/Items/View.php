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
    
    protected function processActions()
    {
        $this->item = $this->items->getCollection()->getByRequest();

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
        
        $icon = $this->item->getIcon();
        
        ob_start();
        
        if($icon) 
        {
            ?>
            	<p>
            		<img src="<?php echo $icon->getURL() ?>">
            	</p>
        	<?php 
        }
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