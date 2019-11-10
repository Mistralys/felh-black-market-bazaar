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

    protected function _renderContent(): string
    {
        $grid = $this->ui->createDataGrid();
        $grid->addColumn('label', t('Name'));
        $grid->addColumn('type', t('Type'));
        $grid->addColumn('source', t('Source'));

        $collection = $this->editor->getItems()->getCollection();
        $filters = $collection->getFilters();

        $filters->setLimit(0, 20);
        $records = $filters->getRecords();
        
        foreach($records as $record)
        {
            $grid->addRow(
                '<a href="'.$record->getURLView().'">'.$record->getLabel().'</a>',
                $record->getTag()->getLabel(),
                $record->getFolder()->getLabel()
             );
        }
        
        return $grid->render();
    }
}