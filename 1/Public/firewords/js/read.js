$(function () {

        var tick = 5;
        var autoCloseTime;
        var intervalKey;


        $('.modal-footer .btn').click(function () {
            messageDisplay();
        });

        (function () {
            autoCloseTime = $('#content').attr('autoCloseTime');
            if (autoCloseTime == 0) { // 看过
                readOver();
            } else {
                // 弹层5秒
                $('#warnning').modal({
                    backdrop: true,
                    keyboard: true,
                    show: true
                });
                var intervalKey = setInterval(function () {
                    if (tick > 0) {
                        $('#count-time').html(tick);
                        tick--;
                    } else {
                        messageDisplay();
                    }
                }, 1000);
            }
        })();


        function messageDisplay() {
            clearInterval(intervalKey);
            $('#warnning').modal('hide');
            $('#content').show();
            setTimeout(function () {
                $('#content').remove();
                readOver();
            }, autoCloseTime * 1000);
        }

        function readOver() {
            $('#timeout').show();
        }

    }
)
;