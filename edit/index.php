<?php
    
    
    // your site's classes namespace - required for the microsite to work.
    $siteNS = 'FELH';
    
    // the URL to access the website - can be a local address like localhost.
    $siteURL = 'http://127.0.0.1/svn/personal/Black%20Market%20Bazaar/edit/';
    
    
    
    // ---------------------------------------------------------
    // DO NOT CHANGE ANYTHING BELOW
    // ---------------------------------------------------------
    
    $autoload = __DIR__.'/vendor/autoload.php';
    if(!file_exists($autoload)) {
        die('<b>ERROR:</b> The composer autoloader is not present, please run composer first.');
    }
    
    require_once $autoload;
    
    $site = call_user_func(
        array('\\'.$siteNS.'\Site', 'boot'),
        $siteNS,
        __DIR__,
        $siteURL
    );
    
    ini_set('display_errors', '1');
    error_reporting(E_ALL);
    
    $site->display();
    