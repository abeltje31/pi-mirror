<!DOCTYPE html>
<html>
<head>
	<style type="text/css">
		<?php 		
			$hostname = gethostbyaddr($_SERVER['REMOTE_ADDR']);
			if ($hostname == "localhost")
			{
				include('css/local.css');
			}
			else
			{
				include('css/remote.css');
			}
			include('css/main.css');
		?>
	</style>
	<link rel="stylesheet" type="text/css" href="css/weather-icons.css">
	<link rel="stylesheet" type="text/css" href="css/train-icons.css">
    <script>
        var currentgitversion = "<?php echo trim(shell_exec('git rev-parse HEAD')) ?>";
    </script>
</head>

<body>

<script src="js/jquery.js"></script>
<script src="js/moment-with-langs.min.js"></script>
<script src="js/highcharts.js"></script>
<script src="js/control.js"></script>



<div class="top left">
	<div class="date small dimmed"></div>
	<div class="time"></div>
	<div class="ns small dimmed"></div>
	<div class="traffic small dimmed"></div>
</div>

<div class="top right">
	<div class="windsun small dimmed"></div>
	<div class="temp"></div>
	<div class="forecast small dimmed"></div>
	<div class="rainradar small dimmed"></div>	
	<div class="rainforecast xxsmall dimmed">
		<p>'s-Hertogenbosch</p>
		<div id="rainforecast1"class="rainforecastchart"></div>	
	</div>
	<div class="rainforecast xxsmall dimmed">
		<p>Eindhoven</p>
		<div id="rainforecast2" class="rainforecastchart"></div>	
	</div>
</div>



</body>
</html>
