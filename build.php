<?php
$template = file_get_contents(__DIR__ . '/src/html/index.html');

preg_match_all('#\{\{page\..*\}\}#',$template, $matches);
$matches = $matches[0];
$variables = array_map(function($item) {
    $item = str_replace('{{page.', '', $item);
    $item = str_replace('}}', '', $item);
    return $item;
}, $matches);

foreach($variables as $variable) {

    $control = file_get_contents(__DIR__ . '/src/html/pages/'.$variable.'.html');
    $template = str_replace('{{page.'.$variable.'}}', $control, $template);
}




preg_match_all('#\{\{controls\..*\}\}#',$template, $matches);
$matches = $matches[0];
$variables = array_map(function($item) {

    $item = str_replace('{{controls.', '', $item);
    $item = str_replace('}}', '', $item);
    return $item;
}, $matches);


foreach($variables as $variable) {
    $control = file_get_contents(__DIR__ . '/src/html/controls/'.$variable.'.html');
    $template = str_replace('{{controls.'.$variable.'}}', $control, $template);
}

file_put_contents(__DIR__ . '/public/index.html', $template);