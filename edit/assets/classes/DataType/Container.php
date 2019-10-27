<?php

declare(strict_types=1);

namespace FELH;

abstract class DataType_Container extends DataType
{
    public function isContainer() : bool
    {
        return true;
    }
    
   /**
    * @return \FELH\DataType[]
    */
    public function getChildren()
    {
        return $this->data;
    }
    
    public function toString() : string
    {
        return '';
    }
    
    public function toHTML() : string
    {
        return $this->render();
    }
    
    public function getNonContainerChildren()
    {
        $result = array();
    
        foreach($this->data as $property)
        {
            if(!$property->isContainer()) {
                $result[] = $property;
            }
        }
        
        return $result;
    }
    
    public function hasChildren() : bool
    {
        return empty($this->data);
    }
    
    public function getContainerChildren()
    {
        $result = array();
        
        foreach($this->data as $property)
        {
            if($property->isContainer() && !$property->hasChildren()) {
                $result[] = $property;
            }
        }
        
        return $result;
    }
    
    protected function render() : string
    {
        ob_start();

        $nonContainer = $this->getNonContainerChildren();
        if(!empty($nonContainer))
        {
            ?>
            	<table class="table">
            		<tbody>
            			<?php 
            			    foreach($nonContainer as $property) 
            			    {
            			        ?>
                			        <tr>
                        				<td class="property-label"><?php echo $property->getLabel() ?></td>
                        				<td><?php echo $property->toHTML() ?></td>
                        			</tr>
            			        <?php 
            			    }
            			?>
            		</tbody>
            	</table>
            <?php
        }
        
        $containers = $this->getContainerChildren();
        
        foreach($containers as $property)
        {
            $header = $this->getDepth() + 1;
            
            echo sprintf(
        	    '<h%s>%s</h%s>',
        	    $header,
        	    $property->getLabel(),
        	    $header
    	    );
            	
    	    echo $property->toHTML();
        }
        
        return ob_get_clean();
    }
}