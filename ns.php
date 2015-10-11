<?php

	include 'config.php';
	
	$url = 'http://webservices.ns.nl/ns-api-avt?station=HT';

	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL,$url);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER,1);
	curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
	curl_setopt($ch, CURLOPT_USERPWD, "$username:$password");
	$data = curl_exec($ch);
	curl_close($ch);

	$xml = simplexml_load_string($data);
	$json = json_encode($xml);

	echo $json;
?>
