<?php

    define('APP_ROOT', __DIR__);

    $localConfig = APP_ROOT.'/config-local.php';
    if(!file_exists($localConfig)) {
        die('<b>ERROR:</b> The local configuration file does not exist. See <a href="README.md">README</a>.');
    }
    
    require_once $localConfig;
    
    set_include_path(get_include_path().PATH_SEPARATOR.APP_ROOT.'/assets/classes');
    
    require_once 'Editor.php';

    $editor = new \FELH\Editor();
    $editor->display();