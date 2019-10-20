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
        
        if($this->item->hasPrerequisites())
        {
            ?>
            	<h2><?php pt('Prerequisites') ?></h2>
            	<?php 
            	
            	   $entries = $this->item->getPrerequities();
            	   
            	   foreach($entries as $prereq) 
            	   {
            	       ?>
                	       <pre style="background:#fff;font-family:monospace;font-size:14px;color:#444;padding:16px;border:solid 1px #999;border-radius:4px;">
	                	       	<?php print_r($prereq->getRawData()); ?>
                	       </pre>
            	       <?php 
            	   }
            	?>
        	<?php
        }
        
        if($this->item->hasGameModifiers())
        {
            ?>
            	<h2><?php pt('Game modifiers') ?></h2>
            	<?php 
            	
            	   $modifiers = $this->item->getGameModifiers();
            	   
            	   foreach($modifiers as $modifier) 
            	   {
            	       ?>
                	       <pre style="background:#fff;font-family:monospace;font-size:14px;color:#444;padding:16px;border:solid 1px #999;border-radius:4px;">
	                	       	<?php print_r($modifier->getRawData()); ?>
                	       </pre>
            	       <?php 
            	   }
            	?>
        	<?php 
    	}
        	
        return ob_get_clean();
    }
}