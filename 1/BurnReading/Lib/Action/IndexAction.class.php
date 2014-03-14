<?php
class IndexAction extends Action
{
    public function index()
    {
        $this->display();
    }

    public function open()
    {
        $id = $this->_get('id');
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
        $article['auto_close_time'] = $this->_post('autoCloseTime');
        $article['content'] = $this->_post('content');
        $article['creator_ip'] = get_client_ip();
        $article['create_time'] = date("Y-m-d h:i:s");
        $article['status'] =
        $article['id'] = $this->getRandom();
        $article['remain_times'] = 1;

        $Article->add($article);

        $this->ajaxReturn($article['id'], "success", 1);
//        $this->show('<style type="text/css">*{ padding: 0; margin: 0; } div{ padding: 4px 48px;} body{ background: #fff; font-family: "微软雅黑"; color: #333;} h1{ font-size: 100px; font-weight: normal; margin-bottom: 12px; } p{ line-height: 1.8em; font-size: 36px }</style><div style="padding: 24px 48px;"> <h1>:)</h1><p>成功，<a href="localhost/index.php/' . $article['id'] . '" target="_blank">点击这里获取</a></p></div><script type="text/javascript" src="http://tajs.qq.com/stats?sId=9347272" charset="UTF-8"></script>', 'utf-8');
    }

    /**
     * <p>验证是否能够提交</p>
     */

    private function vaild()
    {

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