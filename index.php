<?php
require_once 'vendor/autoload.php';

$parser = new \Symfony\Component\Yaml\Parser();

$config_files = [
    'common' => file_get_contents(__DIR__ . '/config/common.yml'),
    'debug'  => file_get_contents(__DIR__ . '/config/debug.yml'),
    'prod'   => file_get_contents(__DIR__ . '/config/prod.yml'),
];

$parsed_config = [
    'common' => (array) $parser->parse($config_files['common']),
    'debug'  => (array) $parser->parse($config_files['debug']),
    'prod'   => (array) $parser->parse($config_files['prod']),
];

$config = $parsed_config['common'] + $parsed_config['debug'];

$app = new \Silex\Application(
    $config
);

$app->register(new \Silex\Provider\TwigServiceProvider(), $config);
$app->register(new Silex\Provider\UrlGeneratorServiceProvider());

$route_file = file_get_contents(__DIR__ . '/routes/routes.yml');
$routes = $parser->parse($route_file);
foreach($routes['routes'] as $name => $data) {
    $path = $data['path'];
    $method = isset($data['method']) ? $method = $data['method'] : 'GET';
    $template = $data['template'];

    $route = call_user_func_array([$app, $method], [$path, function() use($template, $app){
        return $app['twig']->render($template, []);
    }]);

    $route->bind($name);
}

$app->run();