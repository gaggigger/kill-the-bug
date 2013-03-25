<?php
/**
 * Created by JetBrains PhpStorm.
 * User: davidcerezoinigo
 * Date: 13-03-23
 * Time: 5:24 PM
 * To change this template use File | Settings | File Templates.
 */
require 'vendor/autoload.php';

$app=new \Slim\Slim();



//$app->get('/greeting/:name', function ($name) use ($app) {
//    $res = $app->response();
//    $res['Content-Type'] = 'application/json';
//    $res->write(json_encode(array('hello'=>"BUENOS DIAS, $name")));
//});
$app->get('/users',function() use ($app){
    $res= $app->response();
    $res['Content-Type'] = 'application/json';

    $user1=array('id'=>1,'name'=>'Juan','age'=>8);
    $user2=array('id'=>2,'name'=>'Ali','age'=>15);
    $user3=array('id'=>3,'name'=>'Evaristo','age'=>16);

    $users=array($user1,$user2,$user3);
    $res->write(json_encode($users));
});

$app->get('/users/:id/bugs',function($id) use ($app){
    $res= $app->response();
    $res['Content-Type'] = 'application/json';

    $user1=array('id'=>1,'name'=>'Juan','age'=>8);
    $user2=array('id'=>2,'name'=>'Ali','age'=>15);
    $user3=array('id'=>3,'name'=>'Evaristo','age'=>16,'bugs'=>array(
        array('id'=>1,'name'=>'fly'),array('id'=>2,'name'=>'mosquito')
    ));

    $users=array($user1,$user2,$user3);
    $bugs=null;
    foreach ($users as $user) {
        if ($user['id']==$id){
            $res->write(json_encode($user['bugs']));
            break;
        }
    }


});


$app->run();