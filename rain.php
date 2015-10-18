<?php
	include 'config.php';
		
	if($useTestData)
	{
		$data = file_get_contents("testdata/rain_test.txt");
	}
	else
	{
		$url = $urlRain."?lat=".$_GET['lat']."&lon=".$_GET['lon'];
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL,$url);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER,1);
		$data = curl_exec($ch);
		curl_close($ch);
	}	
	
	// $data = "value|time value|time value|time ..."
	// use "|" and "\r\n" as token
	// start with first token "|"
	$element = strtok($data, "|");
	
	// store all pairs of time and value as an array in $array
	//$array = array();
	
	$arraytime = array();
	$arrayvalues = array();

	while ($element !== false)
	{
		$value = $element;
		// get next element by token " "
		$element = strtok("\r\n");
		$time = $element;

		// create a subarray with time van value pair
		array_push($arraytime, $time);
		$value = pow(10,(($value-109)/32));
		if ($value<0.001)
		{
			$value = 0;
		}
		array_push($arrayvalues, floatval($value));
		//$subarray = array($time, floatval(pow(10,(($value-109)/32))));

		// push the pair to the main array
		//array_push($array, $subarray);
		
		// get next element by token "|"
		$element = strtok("|");
	}
	$array=array("time" => $arraytime, "values" => $arrayvalues);

	// convert the array to json
	$json = json_encode($array);

	echo $json;
?>