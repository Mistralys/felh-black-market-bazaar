<?php

namespace FELH;

class Page_Items extends Page
{
    public function getPageAbstract(): string
    {
        return t('The following is a list of all items available in the game and all mods.');
    }

    public function getPageTitle(): string
    {
        return t('Items list');
    }
    
    public function getNavigationTitle() : string
    {
        return t('Items list');
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
        $this->editor = $this->site->createEditor();
    }

    protected function _renderContent(): string
    {
        $grid = $this->ui->createDataGrid();
        $grid->addColumn('label', t('Name'));
        $grid->addColumn('type', t('Type'));
        $grid->addColumn('source', t('Source'));
        $grid->addColumn('price', t('Shop price'))->alignRight();
        $grid->addColumn('rarity', t('Rarity'));

        $items = $this->editor->getItems()->getItems();
        foreach($items as $item)
        {
            $grid->addRow(
                '<a href="'.$item->getURLView().'">'.$item->getLabel().'</a>',
                $item->getFullType(),
                $item->getFolder()->getLabel(),
                $item->getShopPrice(),
                $item->getRarity()
             );
        }
        
        return $grid->render();
        
        ob_start();
        ?>
        	<table class="table table-hover">
        		<thead>
        			<tr>
        				<th><?php pt('Name') ?></th>
        				<th><?php pt('Type') ?></th>
        				<th class="align-right"><?php pt('Shop price') ?></th>
        				<th><?php pt('Rarity') ?></th>
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
                		    	<td class="align-right"><?php echo $item->getShopPrice() ?></td>
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