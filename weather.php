<?php
	include 'config.php';
	
	if($useTestData)
	{
		$data = file_get_contents("testdata/weather_test.xml");
	}
	else
	{
		$url = $urlWeather . $_GET['type'] . '?id=' . $weatherId . '&units=' 
				. $weatherUnits . '&lang=' . $weatherLang . '&APPID=' . $weatherAPPID;
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL,$url);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER,1);
		$data = curl_exec($ch);
		curl_close($ch);
	}
	
	echo $data;
?>
