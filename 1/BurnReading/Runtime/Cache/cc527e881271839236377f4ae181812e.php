<?php if (!defined('THINK_PATH')) exit();?><html>
<head>
    <title>阅后即焚</title>
    <link href="/Public/css/bootstrap.css" rel="stylesheet" media="screen">
    <link href="/Public/firewords/css/index.css" rel="stylesheet" media="screen">
</head>
<body>

<div class="container-narrow">

    <div class="masthead">
        <ul class="nav nav-pills pull-right">
            <li class="active"><a href="/">创建纸条</a></li>
            <!--<li><a href="#">查看纸条</a></li>-->
            <li><a href="#">反馈</a></li>
        </ul>
        <h1 class="muted">阅后即焚</h1>
    </div>

    <hr>

    <form method="post" action="index.php/Index/publish">
        <div class="jumbotron">
            <h1 class="guide">创建小纸条吧</h1>
            <textarea name="content" placeholder="请尽情地书写" id="editor"></textarea>
        </div>

        <div class="jumbotron" style="margin-top: 30px">
            <h1 class="guide">选择自动关闭的时间</h1>

            <div class="btn-group" data-toggle="buttons-radio">
                <button type="button" class="auto-close-time btn btn-large" value="10">10秒</button>
                <button type="button" class="auto-close-time btn btn-large active" value="30">30秒</button>
                <button type="button" class="auto-close-time btn btn-large" value="60">1分钟</button>
                <button type="button" class="auto-close-time btn btn-large" value="300">5分钟</button>
            </div>
            <div class="input-append">
                <input class="span2" placeholder="默认30秒" id="auto-close-time" value="30" name="autoCloseTime"
                       type="text">
                <span class="add-on">秒</span>
            </div>
        </div>

        <div class="jumbotron" id="result">
            <h1 class="guide">就这样吧</h1>
            <button type="button" id="submit" class="btn btn-large">创建咯</button>
        </div>

    </form>
    <hr>
    <div class="footer">
        <p>&copy; <a href="http://airsen.info" target="_blank">airsen</a> 2013</p>
    </div>


</div>

<script type="text/javascript" src="/Public/js/jquery.min.js"></script>
<script type="text/javascript" src="/Public/js/bootstrap.min.js"></script>
<script type="text/javascript" src="/Public/js/artTemplate.min.js"></script>
<script type="text/javascript" src="/Public/js/ZeroClipboard.min.js"></script>
<script type="text/javascript" src="/Public/firewords/js/index.js"></script>

<script id="result-button" type="text/html">
    <h1 class="guide">点击复制到剪贴板</h1>
    <button id="copy-button" type="button" title="Click to copy me."
            class="btn btn-large">__SERVER_BASE_URL__/<%=id%>
    </button>
</script>
<script type="text/html" id="notice">
    <div class="noticeTemplate fade in alert alert-<%=type %>">
        <a class="close" data-dismiss="alert">x</a>
        <%=message %>
    </div>
</script>


</body>
</html>