<!DOCTYPE html>
<html>
<head>
	<link rel="stylesheet" type="text/css" href="css/weather-icons.css">
    <script>
        var currentgitversion = "<?php echo trim(shell_exec('git rev-parse HEAD')) ?>";
    </script>
</head>

<body>


<script src="jquery.js"></script>
<script src="config.js"></script>
<script src="control.js"></script>

<div class="windsun"></div>
<div class="temp"></div>

<?php
echo "Hello world! This is the second try :)";
?>
<br />
<?php
echo "The current date and time is: ";
echo date("d/m/Y H:i:s");
?>

</body>
</html>
