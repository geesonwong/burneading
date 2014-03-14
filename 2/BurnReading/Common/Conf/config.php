<?php
return array(

    'URL_ROUTER_ON' => true, // 路由规则
    'URL_ROUTE_RULES' => array( //定义路由规则
        ':id' => 'index.php/Home/Index/open?id=:1'
    ),

//    'SHOW_PAGE_TRACE' => true,

    // 数据库
    'DB_TYPE' => 'mysql', // 数据库类型
    'DB_HOST' => '127.0.0.1', // 服务器地址
    'DB_NAME' => 'firewords', // 数据库名
    'DB_USER' => 'root', // 用户名
    'DB_PWD' => '', // 密码
    'DB_PORT' => 3306, // 端口
    'DB_PREFIX' => '', // 数据库表前缀
    'DB_FIELDS_CACHE' => false, // 数据表的字段缓存

    // 日志
    'LOG_RECORD' => true, // 开启日志记录
    'LOG_LEVEL' => 'EMERG,ALERT,CRIT,ERR', // 只记录EMERG ALERT CRIT ERR 错误

    // 模板引擎
    'TMPL_PARSE_STRING' => array(
        '__SERVER_BASE_URL__' => 'http://127.0.0.1',
    ),

);