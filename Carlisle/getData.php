

<?php
  ($file_handle=fopen("uncertainty100.asc","r")) or die("Couldn't open file");
  
  for ($lineCounter=1; $lineCounter<7; $lineCounter++){
    $line=fgets($file_handle, 1024);
    $temp = explode(" ", $line);
    switch ($lineCounter){
           case 1:
                $ncols = $temp[1];
           break;
           case 2:
                $nrows = $temp[1];
           break;
           case 3:
                $xllcorner = $temp[1];
           break; 
           case 4:
                $yllcorner = $temp[1];
           break; 
           case 5:
                $cellsize = $temp[1];
           break; 
           case 6:
                $nodata = $temp[1];
           break; 
           default:
                echo 'problem reading file headers';
           break;
    }   
 

  }
#echo $ncols.$nrows.$xllcorner.$yllcorner.$cellsize.$nodata;
  $rowCount = 0;
  while (!feof($file_handle)){
    $line=fgets($file_handle, 3000);
    $dataSet[$rowCount] = explode(" ", $line);
    $rowCount++;
  }
#echo 'done!';
#echo $dataSet[20][35];
?>

