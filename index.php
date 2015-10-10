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
echo date("H:i:s, d/m/Y");
?>

</body>
</html>
