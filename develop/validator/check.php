<?php 

if ($_SERVER["REQUEST_METHOD"] == "POST") {

	$result = array();
	
	foreach($_POST as $index => $value) {
	
		$result[$index] = $value;
	
	}
	
	print_R(json_encode($result));exit;
	
}

