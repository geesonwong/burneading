<?php
return array(

    'URL_ROUTER_ON' => true, // 路由规则
    'URL_ROUTE_RULES' => array( //定义路由规则
        'Index/:action' => 'index.php/Index/:1',
        ':id' => 'index.php/Index/open?id=:1'
    ),

    // 日志
    'LOG_RECORD' => true, // 开启日志记录
    'LOG_LEVEL' => 'EMERG,ALERT,CRIT,ERR', // 只记录EMERG ALERT CRIT ERR 错误

    // 模板引擎
    'TMPL_PARSE_STRING' => array(
        '__SERVER_BASE_URL__' => 'http://burnreading.sinaapp.com',
    ),

);