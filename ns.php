<?php
	include 'config.php';

	if($useTestData)
	{
		$data = file_get_contents("testdata/ns_test.xml");
	}
	else
	{
		$url = $urlNS . $_GET['station'];
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL,$url);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER,1);
		curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
		curl_setopt($ch, CURLOPT_USERPWD, "$usernameNS:$passwordNS");
		$data = curl_exec($ch);
		curl_close($ch);
	}
	
	$xml = simplexml_load_string($data);
	$json = json_encode($xml);

	echo $json;
?>
