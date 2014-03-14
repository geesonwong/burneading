<?php if (!defined('THINK_PATH')) exit();?><html>
<head>
    <title>Yard - 微淘算法展示平台</title>
    <link href="http://173.193.205.68/favicon.ico" rel="shortcut icon">
    <link href="/Public/css/bootstrap.css" rel="stylesheet">
    <link href="/Public/css/Yard/main.css" rel="stylesheet">
    <link href="/Public/css/s.css" rel="stylesheet">
</head>
<body>

<div class="navbar navbar-default navbar-fixed-top" role="navigation">
    <div class="container">
        <div class="navbar-header">
            <a class="navbar-brand" href="#">Yard</a>
        </div>
        <div class="collapse navbar-collapse">
            <ul class="nav navbar-nav">
                <li><a href="#">首页</a></li>
                <li class="active"><a href="#">数据 Demo</a></li>
                <li><a href="#">联系我们</a></li>
            </ul>

            <div class="navbar-form navbar-nav navbar-right" role="search">
                <div class="btn-group" data-toggle="buttons">
                    <label class="btn btn-default env" id="waptestButton"><input type="radio" name="options">开发</label>
                    <label class="btn btn-default env" id="wapaButton"><input type="radio" name="options">预发</label>
                    <label class="btn btn-default env" id="mButton"><input type="radio" name="options">生产</label>
                </div>
                <div class="form-group">
                    <input id="interfaceSearch" type="text" class="form-control" placeholder="输入接口名或描述">
                </div>
            </div>

        </div>
        <!--/.nav-collapse -->
    </div>
</div>

<div class="container" id="dataDemo">
    <div class="panel-group" id="accordion"></div>
</div>
<!-- /.container -->


<!-- Modal -->
<div class="modal fade" id="errorMsg" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="myModalLabel">发生一点错误…</h4>
            </div>
            <div class="modal-body">
                ...
            </div>
        </div>
        <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
</div>
<!-- /.modal -->

<!-- 模板 -->
<script id="mtopForm" type="text/html">
    <div class="panel panel-default">
        <div class="panel-heading">
            <h4 class="panel-title">
                <a data-toggle="collapse" data-parent="#accordion" href="#<%=sn%>">
                    <%=name%> （<%=desc%> by <%=author%>）
                </a>
            </h4>
        </div>
        <div id="<%=sn%>" class="sn-panel panel-collapse collapse">
            <div class="panel-body row">
                <div class="col-md-4 form-horizontal">
                    <%for (i = 0; i < parameters.length; i++) {%>
                    <div class="form-group">
                        <label for="<%=parameters[i].name%><%=sn%>" class="col-sm-5 control-label"><%=parameters[i].name%></label>

                        <div class="col-sm-7">
                            <input type="<% if (parameters[i].type == 'int') {%>number<%} else {%>text<%}%>"
                                   class="sn-parameter form-control" id="<%=parameters[i].name%><%=sn%>"
                                   parametername="<%=parameters[i].name%>"
                                   placeholder="<%=parameters[i].desc%>" value="<%=parameters[i].defaultValue%>">
                        </div>
                    </div>
                    <%}%>
                    <div class="form-group">
                        <label for="version<%=sn%>" class="col-sm-5 control-label">版本</label>

                        <div class="col-sm-7">
                            <input type="text" class="form-control" id="version<%=sn%>"
                                   placeholder="2.0/3.0/..." value="<%=version%>">
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-sm-offset-5 col-sm-10">
                            <button class="sn-button btn btn-default">发送请求</button>
                        </div>
                    </div>
                </div>

                <div id="canvas<%=sn%>" class="col-md-7 Canvas"></div>
            </div>
        </div>
    </div>
</script>

<script src="/Public/js/jquery.min.js"></script>
<script src="/Public/js/mtop.debug.js"></script>
<script src="/Public/js/mtop.login.js"></script>
<script src="/Public/js/template.js"></script>
<script src="/Public/js/bootstrap.min.js"></script>
<script src="/Public/js/c.js"></script>
<script src="/Public/js/Yard/mtopinterfaces.js"></script>
<script src="/Public/js/Yard/datademo.js"></script>
</body>
</html>