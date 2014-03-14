<?php if (!defined('THINK_PATH')) exit();?><html>
<head>
    <title>打开纸条 - 阅后即焚</title>
    <link href="/Public/css/bootstrap.css" rel="stylesheet" media="screen">
    <link href="/Public/firewords/css/index.css" rel="stylesheet" media="screen">
</head>
<body>

<div class="container-narrow">
    <div class="masthead">
        <ul class="nav nav-pills pull-right">
            <li><a href="/">创建纸条</a></li>
            <!--<li class="active"><a href="#">查看纸条</a></li>-->
            <li><a href="#">反馈</a></li>
        </ul>
        <h1 class="muted">阅后即焚</h1>
    </div>
    <hr>
    <div class="article-content" id="content" autoCloseTime="<?php echo ($autoCloseTime); ?>">
        <?php echo ($content); ?>
    </div>
    <div class="article-content" id="timeout">
        已经阅读，无法再次打开。
    </div>
    <hr>
    <div class="footer">
        <p>&copy; 嫌疑人X 2013</p>
    </div>

</div>

<div class="modal hide fade in" id="warnning">
    <div class="modal-header">
        <h3>提示</h3>
    </div>
    <div class="modal-body">
        <p>留言将于<span id="count-time">5</span>秒以后展示，并且在限定时间内关闭。</p>
    </div>
    <div class="modal-footer">
        <a href="#" class="btn">立即打开</a>
    </div>
</div>

<script type="text/javascript" src="/Public/js/jquery.min.js"></script>
<script type="text/javascript" src="/Public/js/bootstrap.min.js"></script>
<script type="text/javascript" src="/Public/js/artTemplate.min.js"></script>
<script type="text/javascript" src="/Public/js/ZeroClipboard.min.js"></script>
<script type="text/javascript" src="/Public/firewords/js/read.js"></script>

</body>

</html>