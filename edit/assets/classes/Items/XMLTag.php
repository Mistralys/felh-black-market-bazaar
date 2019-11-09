<?php

declare(strict_types=1);

namespace FELH;

/**
 * Used to store information about individual tag names in the
 * game's XML files, which can be read by the editor. Each tag
 * is mapped to an ID that is used in the database to identify
 * it.
 * 
 * @package FELH
 * @subpackage XMLParser
 * @author AeonOfTime <eve@aeonoftime.com>
 *
 */
class Items_XMLTag
{
   /**
    * @var string
    */
    protected $name;
    
   /**
    * @var int
    */
    protected $dbID;
    
   /**
    * @var string
    */
    protected $label;
    
    public function __construct(string $name, int $dbID, string $label)
    {
        $this->name = $name;
        $this->dbID = $dbID;
        $this->label = $label; 
    }
    
   /**
    * The XML tag name.
    * @return string
    */
    public function getName() : string
    {
        return $this->name;
    }

   /**
    * The tag ID used in the database, in the <code>tag_id</code>
    * column of the records.
    * 
    * @return int
    */
    public function getDBID() : int
    {
        return $this->dbID;
    }
    
   /**
    * Human readable label.
    * @return string
    */
    public function getLabel() : string
    {
        return $this->label;
    }
}
