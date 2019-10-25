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
        ob_start();
        
        ?>
        	<a href="<?php echo $this->item->getURLEdit() ?>" class="btn btn-primary">
        		<?php pt('Edit item') ?>
        	</a>
        <?php 
        
        ?>
        	<table class="table">
        		<tbody>
        			<tr>
        				<td><?php pt('Shop value') ?></td>
        				<td><?php echo $this->item->getShopPrice() ?></td>
        			</tr>
        			<?php
        			    $afs = $this->item->objAvailableForSovereign();
        			    if($afs) 
        			    {
        			?>
        			<tr>
        				<td><?php pt('Available for sovereign?') ?></td>
        				<td><?php echo $afs->toHTML() ?></td>
        			</tr>
        			<?php 
        			    }
        			?>
        			<tr>
        				<td><?php pt('Rarity') ?></td>
        				<td><?php echo $this->item->getRarity() ?></td>
        			</tr>
        			<tr>
        				<td><?php pt('Can be equipped?') ?></td>
        				<td><?php echo $this->item->objCanBeEquipped()->toHTML() ?></td>
        			</tr>
        			<tr>
        				<td><?php pt('Type') ?></td>
        				<td><?php echo $this->item->objType()->getText() ?></td>
        			</tr>
        			<tr>
        				<td><?php pt('Likelihood') ?></td>
        				<td><?php echo $this->item->objLikelihood()->getValue() ?></td>
        			</tr>
        		</tbody>
        	</table>
        <?php 
        
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