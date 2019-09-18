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

    protected function _render(): string
    {
        return 'YO';
    }
}