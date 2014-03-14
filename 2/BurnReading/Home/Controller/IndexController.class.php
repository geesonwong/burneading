<?php

namespace Home\Controller;

use Think\Controller;

class IndexController extends Controller
{
    public function index()
    {
        $this->display();
    }

    public function open()
    {
        $id = $_GET['id'];
        $Article = M('article');
        $article = $Article->where("id = '" . $id . "'")->find();

        if ($article['remain_times'] <= 0) {
            $array['autoCloseTime'] = 0;
        } else {
            $array['content'] = $article['content'];
            $array['autoCloseTime'] = $article['auto_close_time'];

            // 减少一次可读次数
            $article['remain_times'] = $article['remain_times'] - 1;
            $Article->save($article);
        }

        $this->assign($array);
        $this->display('read');
    }

    public function publish()
    {
        $Article = M('article');
        $article['auto_close_time'] = $_POST['autoCloseTime'];
        $article['content'] = $_POST['content'];
        $article['creator_ip'] = get_client_ip();
        $article['create_time'] = date("Y-m-d h:i:s");
        $article['status'] =
        $article['id'] = $this->getRandom();
        $article['remain_times'] = 1;

        $Article->add($article);

        $result['status'] = 1;
        $result['content'] = $article['id'];
        $this->ajaxReturn($result);
    }

    /**
     * <p>返回随机ID</p>
     *
     * @param int $length ID的长度
     * @return string 随机ID
     */
    private function getRandom($length = 10)
    {
        // 随机字符集
        $chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        $result = '';
        for ($i = 0; $i < $length; $i++) {
            $result .= $chars[mt_rand(0, strlen($chars) - 1)];
        }
        return $result;
    }
}