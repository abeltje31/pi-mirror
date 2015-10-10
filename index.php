<!DOCTYPE html>
<html>
<head>
	<style type="text/css">
		<?php include('css/main.css') ?>
	</style>
	<link rel="stylesheet" type="text/css" href="css/weather-icons.css">
    <script>
        var currentgitversion = "<?php echo trim(shell_exec('git rev-parse HEAD')) ?>";
    </script>
</head>

<body>


<script src="jquery.js"></script>
<script src="config.js"></script>
<script src="control.js"></script>

<div class="top right"><div class="windsun small dimmed"></div><div class="temp"></div><div class="forecast small dimmed"></div></div>

</body>
</html>
