<?php

namespace FELH;

class Page_Items extends Page
{
    public function getPageAbstract(): string
    {
        return 'The following is a list of all items available in the game and all mods.';
    }

    public function getPageTitle(): string
    {
        return 'Items list';
    }
    
    public function getNavigationTitle() : string
    {
        return 'Items list';
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

    protected function _render(): string
    {
        $items = $this->editor->getItems();
        
        ob_start();
        ?>
        	<table class="table table-hover">
        		<thead>
        			<tr>
        				<th>Name</th>
        				<th>Type</th>
        				<th>Shop price</th>
        				<th>Rarity</th>
        			</tr>
        		</thead>
        		<tbody>
        		<?php 
            		foreach($items as $item) 
            		{
            		    ?>
            		    	<tr>
                		    	<td>
                		    		<a href="<?php  ?>">
                		    			<?php echo $item->getLabel() ?>
            		    			</a>
                		    	</td>
                		    	<td><?php echo $item->getFullType() ?></td>
                		    	<td><?php echo $item->getShopPrice() ?></td>
                		    	<td><?php echo $item->getRarity() ?></td>
            		    	</tr>
            		    <?php 
            		}
        		?>
        		</tbody>
        	</table>
        <?php 
        
        return ob_get_clean();
    }
}