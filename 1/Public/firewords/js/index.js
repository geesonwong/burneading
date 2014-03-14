$(function () {

    // 通知
    function notice(type, message) {
        var noticeTemplate = template.render('notice', {
            type: type,
            message: message
        });
        $('.container-narrow').append(noticeTemplate);
        $('.alert').alert();
        setTimeout(function () {
            $('.alert').alert('close');
            $('.alert').remove();
        }, 2000);
    }

    var clip = new ZeroClipboard(document.getElementById("copy-button"), {
        moviePath: "/Public/js/ZeroClipboard.swf"
    });

    clip.on('mouseover', function (client, args) {
        var test = document.getElementById("copy-button");
        client.setText(test.innerHTML.trim()); // 重新设置要复制的值
    });

    clip.on('complete', function (client, args) {
        notice('success', '复制成功');
    });

    $('.auto-close-time').click(function () {
        $('#auto-close-time').val($(this).val());
    });

    // 提交
    $('#submit').click(function () {
        $(this).attr('disabled');
        $.post('index.php/Index/publish', $('form').serialize(), function (data) {
            var button = template.render('result-button', {
                id: 'index.php/' + data.data
            });
            $('#result').html(button);

            clip.glue(document.getElementById('copy-button'));
        }, 'json');
    });


});