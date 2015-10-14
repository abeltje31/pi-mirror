<?php
	include 'config.php';
	
	if($useTestData)
	{
		$data = file_get_contents("testdata/traffic_test.xml");
	}
	else
	{
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL,$urlTraffic);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER,1);
		$data = curl_exec($ch);
		curl_close($ch);
	}
	
	$xml = simplexml_load_string($data);
	$json = json_encode($xml);

	echo $json;
?>
