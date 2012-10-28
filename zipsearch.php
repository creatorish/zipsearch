<?php
	ini_set('memory_limit' ,'1024M');
	
	if (!isset($_POST["zip"])) {
		exit;
	}
	
	$file = "data/KEN_ALL.CSV";		//郵便番号CSV
	$zip = $_POST["zip"];
	$tmp = fopen($file, "r");
	
	$array = "[";
	while (($row = fgetcsv($tmp)) !== FALSE) {
		mb_convert_variables("UTF-8", "SJIS-win", $row);
		if(strstr($row[7],$zip) !== FALSE){
			if (strlen($array) != 1) {
				$array .= ",";
			}
			$array .= "{zip:$row[2],address:\"$row[6]$row[7]$row[8]\"}";
		}
	}
	$array .= "]";
	fclose($tmp);
	echo $array;
?>