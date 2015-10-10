<?php
$gitversion = shell_exec('git rev-parse HEAD');
echo json_encode(array('gitversion'=>trim($gitversion)));
?>
