<?php

$files = [];
$content = '
export default {
  "path": "../samples/",
  "samples": [
    {{includes}}
  ]
}';

$itemTemplate = '
  {
      "name": "{{name}}",
      "file": "{{filename}}"
    },
';
$lines = '';

foreach (glob("public/samples/*.wav") as $file) {
    $filename = basename($file, '.app.php');
    $name = rtrim($filename, '.wav');
    $item = str_replace('{{filename}}', $filename, $itemTemplate);
    $item = str_replace('{{name}}', $name, $item);
    $items[] = [$name, $item];
}


usort($items, function($a, $b) {
    return strtolower($a[0]) <=> strtolower($b[0]);
});
$items = array_column($items, 1);

$lines = implode(PHP_EOL, $items);
$content = str_replace('{{includes}}', $lines, $content);
file_put_contents(dirname(__FILE__) . '/src/js/lib/config/Sounds.js', $content);
