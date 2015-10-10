<!DOCTYPE html>
<html>
<head>
    <script>
        var currentgitversion = "<?php echo trim(shell_exec('git rev-parse HEAD')) ?>";
    </script>
</head>

<body>

<script src="jquery.js"></script>
<script src="control.js"></script>

<?php
echo "Hello world! This is working! :)";
?>
<br />
<?php
echo "The current date and time is: ";
echo date("d/m/Y H:i:s");
?>

</body>
</html>
