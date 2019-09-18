<?php

    $autoload = __DIR__.'/vendor/autoload.php';
    if(!file_exists($autoload)) {
        die('<b>ERROR:</b> The composer autoloader is not present, please run composer first.');
    }
    
    require_once $autoload;

    $site = \FELH\Site::boot(
        'FELH',
        __DIR__, 
        'http://127.0.0.1/svn/personal/Black%20Market%20Bazaar/edit/'
    );
    
    $site->display();
