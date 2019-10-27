<?php

declare(strict_types=1);

namespace FELH;

trait DataTraits_IdentifierList
{
    protected $formats = array();

    abstract protected function initValues();
    
    protected function addFormat(string $id, string $formatString)
    {
        $this->formats[$id] = $formatString;
    }
    
    protected function add(string $formatID, string $itemID, int $amount, string $translation)
    {
        $this->identifiers[] = array(
            'formatID' => $formatID,
            'itemID' => $itemID,
            'amount' => $amount,
            'translation' => $translation
        );
    }
    
    protected function getValues() : array
    {
        $this->initValues();
        
        $result = array();
        
        foreach($this->identifiers as $def)
        {
            $format = $this->formats[$def['formatID']];
            
            for($i=1; $i <= $def['amount']; $i++)
            {
                $identifier = sprintf(
                    $format,
                    $def['itemID'],
                    $i
                );
                
                $text = sprintf($def['translation'], $i);
                
                $result[$identifier] = $text;
            }
        }
        
        return $result;
    }
}
