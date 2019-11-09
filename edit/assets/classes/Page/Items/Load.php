<?php

namespace FELH;

class Page_Items_Load extends Page
{
    public function getPageAbstract(): string
    {
        return 
        t('Refreshes the XML cache in the database:').' '.
        t('Reading the game\'s XML files is a time consuming process, so all the data is cached to a database.').' '.
        t('This makes it possible to load only the needed items, as well as do complex searches and sorting.');
    }
    
    public function getPageTitle(): string
    {
        return t('Refresh the XML cache');
    }
    
    public function getNavigationTitle() : string
    {
        return t('Refresh XML cache');
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
        if(!$this->request->getBool('confirm')) {
            return;
        }
        
        $this->items->load();
        
        $this->redirectWithSuccessMessage(
            t('The XML cache has been refreshed successfully at %1$s.', date('H:i:s')),
            $this->items->getURLList()
        );
    }
    
    protected function _renderContent(): string
    {
        $url = $this->buildURL(array('confirm' => 'yes'));
        
        ob_start();
        
        ?>
        	<p>
        		<a href="<?php echo $url ?>" class="btn btn-primary">
        			<i class="fa fa-refresh"></i>
        			<?php pt('Refresh database now') ?>
        		</a>
        	</p>
    	<?php 
        
    	return ob_get_clean();
    }
}