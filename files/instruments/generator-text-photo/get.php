<?php

$data = '';
if (isset($_POST['data'])) {
	$data = $_POST['data'];
}

if (empty($data)) exit;

settype($data, 'string');
if (get_magic_quotes_gpc())	$data = stripslashes($data);

header('Cache-Control: no-cache');
header('Pragma: no-cache');
header('Last-Modified: '.gmdate("D, d M Y H:i:s").' GMT');
header('Content-Type: application/javascriptx; charset=utf-8');
header('Content-Disposition: attachment; filename="text_photo.jsx"');

print $data;
exit;

?>