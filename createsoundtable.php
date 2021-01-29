<?php

$files = [];
$content = 'var sounds = [ {{includes}} ];';
$lines = '';

foreach (glob("samples/*.wav") as $file) {
    $filename = basename($file, '.app.php');
    $path = 'samples/' . $filename;
    $name = rtrim($filename, '.wav');
    $files[] = '["' . $path . '", "' . $name . '"],';
}


sort($files);

$lines = implode(PHP_EOL, $files);
$content = str_replace('{{includes}}', $lines, $content);
file_put_contents('js/marble/soundtable.js', $content);
