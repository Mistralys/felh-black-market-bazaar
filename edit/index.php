<?php

    define('APP_ROOT', __DIR__);

    //require_once 'vendor/autoload.php';
    
    set_include_path(get_include_path().PATH_SEPARATOR.APP_ROOT.'/assets/classes');
    
    require_once 'Items.php';
    require_once 'Reader.php';
    
    $collection = new Items();
    $collection->addFolder(APP_ROOT.'/../Black Market Bazaar');
    $collection->load();
    
    $items = $collection->getItems();
    
    foreach($items as $item) 
    {
        echo $item->getLabel().'<br>';
    }
