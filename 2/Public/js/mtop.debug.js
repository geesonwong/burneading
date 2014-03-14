/**
 *   global configuration
 *
 * @class config
 * @module utils
 * @namespace taobao.utils
 * @author yanyuan，butai,武仲(wuzhong@taobao.com)
 * @since 2013.6.14
 */
;(function (win, lib) {
    if(lib.config && lib.config.sysType){
        return;
    }

    var host = win.location.hostname,
        hostReg = /.*?([^.]+)(?:\.x)?\.(taobao|tmall|etao|alibaba|alipay|aliyun)\.(com|net).*/i,
        _host = win.location.hostname.match(hostReg),
        sysType = host.match(/taobao\.net$/i)?'waptest':'m'; //taobao.net域下，默认是waptest，taobao.com域下，默认是m

    if (_host && (_host[1] === 'waptest' || _host[1] === 'wapa' || _host[1] === 'm')) {
        sysType = _host[1];
    }

    lib.config = {
        hostReg: hostReg,
        /**
         * 根据当前location判断出的环境，是否是:
         1. 线上 : m
         2. 预发 ： wapa
         3. 日常 ： waptest
         * @property sysType
         */
        sysType: sysType,
        /**
         * 默认的appkey，各个应用方使用自己的key
         * @property defaultAppKey
         */
        defaultAppKey: sysType==='waptest'?'4272':'12574478'
    };
})(window, window.lib || (window.lib = {}))
;(function (win, lib) {
    lib.encode || (lib.encode = {});
    lib.encode.md5 = function (string) {
        function rotateLeft(lValue, iShiftBits) {
            return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
        }
        function addUnsigned(lX, lY) {
            var lX4, lY4, lX8, lY8, lResult;
            lX8 = (lX & 0x80000000);
            lY8 = (lY & 0x80000000);
            lX4 = (lX & 0x40000000);
            lY4 = (lY & 0x40000000);
            lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
            if (lX4 & lY4) {
                return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
            }
            if (lX4 | lY4) {
                if (lResult & 0x40000000) {
                    return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
                } else {
                    return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
                }
            } else {
                return (lResult ^ lX8 ^ lY8);
            }
        }

        function f(x, y, z) {
            return (x & y) | ((~x) & z);
        }

        function g(x, y, z) {
            return (x & z) | (y & (~z));
        }

        function h(x, y, z) {
            return (x ^ y ^ z);
        }

        function i(x, y, z) {
            return (y ^ (x | (~z)));
        }

        function FF(a, b, c, d, x, s, ac) {
            a = addUnsigned(a, addUnsigned(addUnsigned(f(b, c, d), x), ac));
            return addUnsigned(rotateLeft(a, s), b);
        }

        function GG(a, b, c, d, x, s, ac) {
            a = addUnsigned(a, addUnsigned(addUnsigned(g(b, c, d), x), ac));
            return addUnsigned(rotateLeft(a, s), b);
        }

        function HH(a, b, c, d, x, s, ac) {
            a = addUnsigned(a, addUnsigned(addUnsigned(h(b, c, d), x), ac));
            return addUnsigned(rotateLeft(a, s), b);
        }

        function II(a, b, c, d, x, s, ac) {
            a = addUnsigned(a, addUnsigned(addUnsigned(i(b, c, d), x), ac));
            return addUnsigned(rotateLeft(a, s), b);
        }

        function convertToWordArray(string) {
            var lWordCount;
            var lMessageLength = string.length;
            var lNumberOfWords_temp1 = lMessageLength + 8;
            var lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64;
            var lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
            var lWordArray = new Array(lNumberOfWords - 1);
            var lBytePosition = 0;
            var lByteCount = 0;
            while (lByteCount < lMessageLength) {
                lWordCount = (lByteCount - (lByteCount % 4)) / 4;
                lBytePosition = (lByteCount % 4) * 8;
                lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount) << lBytePosition));
                lByteCount++;
            }
            lWordCount = (lByteCount - (lByteCount % 4)) / 4;
            lBytePosition = (lByteCount % 4) * 8;
            lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
            lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
            lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
            return lWordArray;
        }

        function wordToHex(lValue) {
            var WordToHexValue = "", WordToHexValue_temp = "", lByte, lCount;
            for (lCount = 0; lCount <= 3; lCount++) {
                lByte = (lValue >>> (lCount * 8)) & 255;
                WordToHexValue_temp = "0" + lByte.toString(16);
                WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length - 2, 2);
            }
            return WordToHexValue;
        }

        function utf8Encode(string) {
            string = string.replace(/\r\n/g, "\n");
            var utftext = "";

            for (var n = 0; n < string.length; n++) {

                var c = string.charCodeAt(n);

                if (c < 128) {
                    utftext += String.fromCharCode(c);
                }
                else if ((c > 127) && (c < 2048)) {
                    utftext += String.fromCharCode((c >> 6) | 192);
                    utftext += String.fromCharCode((c & 63) | 128);
                }
                else {
                    utftext += String.fromCharCode((c >> 12) | 224);
                    utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                    utftext += String.fromCharCode((c & 63) | 128);
                }

            }

            return utftext;
        }

        var x = [],
         k, AA, BB, CC, DD, a, b, c, d,
         S11 = 7, S12 = 12, S13 = 17, S14 = 22,
         S21 = 5, S22 = 9 , S23 = 14, S24 = 20,
         S31 = 4, S32 = 11, S33 = 16, S34 = 23,
         S41 = 6, S42 = 10, S43 = 15, S44 = 21;

        string = utf8Encode(string);

        x = convertToWordArray(string);

        a = 0x67452301;
        b = 0xEFCDAB89;
        c = 0x98BADCFE;
        d = 0x10325476;

        for (k = 0; k < x.length; k += 16) {
            AA = a;
            BB = b;
            CC = c;
            DD = d;
            a = FF(a, b, c, d, x[k + 0], S11, 0xD76AA478);
            d = FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
            c = FF(c, d, a, b, x[k + 2], S13, 0x242070DB);
            b = FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
            a = FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);
            d = FF(d, a, b, c, x[k + 5], S12, 0x4787C62A);
            c = FF(c, d, a, b, x[k + 6], S13, 0xA8304613);
            b = FF(b, c, d, a, x[k + 7], S14, 0xFD469501);
            a = FF(a, b, c, d, x[k + 8], S11, 0x698098D8);
            d = FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
            c = FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
            b = FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
            a = FF(a, b, c, d, x[k + 12], S11, 0x6B901122);
            d = FF(d, a, b, c, x[k + 13], S12, 0xFD987193);
            c = FF(c, d, a, b, x[k + 14], S13, 0xA679438E);
            b = FF(b, c, d, a, x[k + 15], S14, 0x49B40821);
            a = GG(a, b, c, d, x[k + 1], S21, 0xF61E2562);
            d = GG(d, a, b, c, x[k + 6], S22, 0xC040B340);
            c = GG(c, d, a, b, x[k + 11], S23, 0x265E5A51);
            b = GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA);
            a = GG(a, b, c, d, x[k + 5], S21, 0xD62F105D);
            d = GG(d, a, b, c, x[k + 10], S22, 0x2441453);
            c = GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
            b = GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
            a = GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);
            d = GG(d, a, b, c, x[k + 14], S22, 0xC33707D6);
            c = GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87);
            b = GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
            a = GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
            d = GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
            c = GG(c, d, a, b, x[k + 7], S23, 0x676F02D9);
            b = GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
            a = HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
            d = HH(d, a, b, c, x[k + 8], S32, 0x8771F681);
            c = HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
            b = HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
            a = HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);
            d = HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
            c = HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);
            b = HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
            a = HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
            d = HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA);
            c = HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085);
            b = HH(b, c, d, a, x[k + 6], S34, 0x4881D05);
            a = HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039);
            d = HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
            c = HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
            b = HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
            a = II(a, b, c, d, x[k + 0], S41, 0xF4292244);
            d = II(d, a, b, c, x[k + 7], S42, 0x432AFF97);
            c = II(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
            b = II(b, c, d, a, x[k + 5], S44, 0xFC93A039);
            a = II(a, b, c, d, x[k + 12], S41, 0x655B59C3);
            d = II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);
            c = II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
            b = II(b, c, d, a, x[k + 1], S44, 0x85845DD1);
            a = II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);
            d = II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
            c = II(c, d, a, b, x[k + 6], S43, 0xA3014314);
            b = II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
            a = II(a, b, c, d, x[k + 4], S41, 0xF7537E82);
            d = II(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
            c = II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);
            b = II(b, c, d, a, x[k + 9], S44, 0xEB86D391);
            a = addUnsigned(a, AA);
            b = addUnsigned(b, BB);
            c = addUnsigned(c, CC);
            d = addUnsigned(d, DD);
        }

        var temp = wordToHex(a) + wordToHex(b) + wordToHex(c) + wordToHex(d);

        return temp.toLowerCase();
    };
})(window, window.lib || (window.lib = {}))

/**
 *   cookie的基础操作工具
 *
 * @class cookie
 * @module utils
 * @namespace taobao.utils
 * @author butai,武仲(wuzhong@taobao.com)
 * @since 2013.6.14
 */
;(function (win, lib) {

    /**
     * get cookieVauel
     * @method getCookieVal
     * @public
     * @static
     * @param {String} offset 偏移量
     * @return {String} cookieValue
     */
    function getCookieVal(offset) {
        var endstr = document.cookie.indexOf(";", offset);
        if (endstr === -1) {
            endstr = document.cookie.length;
        }
        return window.unescape(decodeURIComponent(document.cookie.substring(offset, endstr)));
    }
	lib.storage || (lib.storage={});
    lib.storage.cookie= {
        /**
         * 判断浏览器是否能使用cookie
         * @method isCookieEnable
         * @public
         * @static
         * @return {Boolean} ret
         */
        isCookieEnable: function () {
            if (!window.navigator.cookieEnabled) {
                return false;
            }
            var key = '_s_cookie_',
                v = this.getCookie(key);
            this.setCookie(key, '1');
            if (v === '1') {
                this.delCookie(key);
                return true;
            }
            return false;
        },


        /**
         * getCookie
         * @method getCookie
         * @public
         * @static
         * @param {String} name cookie名
         * @return {String} if not exist ,return null
         */
        getCookie: function (name) {
            var arg = name + "=", alen = arg.length, clen = document.cookie.length, i = 0, j;
            while (i < clen) {
                j = i + alen;
                if (document.cookie.substring(i, j) === arg) {
                    return getCookieVal(j);
                }
                i = document.cookie.indexOf(" ", i) + 1;
                if (i === 0) {
                    break;
                }
            }
            return null;
        },

        /**
         * 将cookie设置到taobao域下
         * @method setCookie
         * @public
         * @static
         * @param {String} key cookie名
         * @param {String} value cookie值
         */
        setCookie: function (key, value) {
            var host = window.location.host,
                index = host.indexOf("."),
                subDomain = host.substring(0, index),
                expires = (arguments.length > 2) ? arguments[2] : null,
                expdate = new Date();
            if (subDomain !== 'waptest' && subDomain !== 'wapa' && subDomain !== 'm' && (host.indexOf("taobao") > -1 || host.indexOf("tmall") > -1)) {
                host = host.substr(index + 1);
            }
            if (expires == null) {
                document.cookie = key + "=" + window.escape(value) + ";path=/;domain=" + host;
            } else {
                expdate.setTime(expdate.getTime() + (expires * 1000 ));
                document.cookie = key + "=" + window.escape(value) + ";path=/;domain=" + host + ";expires=" + expdate.toGMTString();
            }

        },

        /**
         * 删除cookie
         * @method delCookie
         * @public
         * @static
         * @param {String} name cookie名
         */
        delCookie: function (name) {
            var exp = new Date(),
                cval = this.getCookie(name);
            exp.setTime(exp.getTime() - 1);
            document.cookie = name + "=" + cval + "; expires=" + exp.toGMTString();
        }

    };

})(window, window.lib || (window.lib = {}))
/**
 *功能：mtop的执行入口
 *
 *      1. 对请求做队列处理，解决并发带来的token失效问题
 *      2. 本身不提供具体的api实现，提供一些规范让不同的api实现在该实例上注册
 *      3. 将对应的api请求分发到具体的执行引擎上
 *      4. 对返回的数据做一些统一的处理
 *
 * @class EXECUTOR
 * @module mtop
 * @namespace lib.mtop
 * @author butai,武仲(wuzhong@taobao.com)
 * @since 2013.6.3
 */
;(function (window, lib) {

    var mtop = lib.mtop || (lib.mtop = {});

    mtop.EXECUTOR = {
        /**
         * 标示是否有请求在处理中，因为mtop的请求过程中，如果并发请求可能出现token被反复替换的问题，
         * 因此我们在sdk中把所有的请求都先放到请求队列中，按先后顺序串行处理
         * @property isRunning
         * @type Boolean
         */
        isRunning: false,
        /**
         * 请求队列
         * @property executorQue
         * @type Array
         */
        executorQue: [],
        /**
         * 恢复请求，从队列中取第一个请求进行执行
         * @method resume
         * @public
         * @static
         */
        resume: function () {
            var first = this.executorQue[0];
            this.executorQue = this.executorQue.slice(1);
            if(first){
                first.run();
            }else{
                this.isRunning = false;
            }
        },
        _executors: [],
        _getExecutor: function (args) {
            var max = this._executors.length,
                Executor;
            for(var i=max;i>0;i--){
                Executor = this._executors[i-1];
                if(Executor.canRun(args)){
                    break;
                }
            }
            var executor = new Executor(args);
            return executor;
        },
        /**
         * 注册一个真正的执行引擎
         *  这儿会对 executor的handler做一些封装处理，做一些统一业务的处理
         * @method register
         * @public
         * @static
         * @param {Function} condition 引擎的匹配条件
         * @param {Object} executor 具体的引擎
         * @param {Function} executor.run 具体的业务执行方法
         * @param {Function} executor.init 具体的构造函数，入参等同`execute`方法的`args`
         */
        register: function (condition,executor) {
            var F = function(args){
                this.init(args);
            };
            F.canRun = condition;

            executor.handleResponse = function(result){
                mtop.wrapHandler.call(this,result);
                mtop.EXECUTOR.resume();
            };

            F.prototype = executor;
            //TODO 代理callback
            this._executors.push(F);
        },
        /**
         * 注册一个真正的执行引擎
         * @method execute
         * @public
         * @static
         * @param {Object} args  对应参数
         * @param {Object} args.0  apiParams
         * @param {Function} args.1  成功回调
         * @param {Function} args.2  失败回调
         */
        execute: function (args) {
            //TODO
            //step 1 : find executor
            var executor = this._getExecutor(args);
            //step 2 : add query
            this.executorQue.push(executor);
            //step 3 : execute
            if (!this.isRunning) {
                this.isRunning = true;
                this.resume();
            }
        }
    };

})(window, window['lib'] || (window['lib'] = {}))
/**
 *精简版本的mtop
 *
 *    1. mtop api 的实现过程
 *       1. 生成mtop请求url
 *       2. 获取mtop种在cookie中的token和当前时间并对url进行MD5加签
 *       3. 发送api请求
 *       4. 统一处理response
 *       5. 回调callback
 *
 *    2. 注意的问题
 *       1. 必须和mtop同一个父域，因为我们的token是从cookie里取的，cookie目前是种在父域上
 *       2. 请求url没有sid相关参数，用户的登录信息也是存放在cookie中的，也就是api 对应的父域上，服务端会根据该cookie做验证
 *
 * @class mtop
 * @module mtop
 * @namespace lib
 * @author butai,武仲(wuzhong@taobao.com)
 * @since 2013.6.3
 */
;(function (window, lib) {

    var mtop = lib.mtop || (lib.mtop = {});
    /**
     * 调用mtop的核心方法，所有的mtop2次封装的方法都应该从这进入
     * @method ajax
     * @public
     * @static
     * @param {Object} apiParam   mtop接口的入参
     * @param {Function} callback 成功的回调
     * @param {Function} errorback  失败的回调
     * @see request
     */
    mtop.ajax = function () {
        this.EXECUTOR.execute(arguments);
    };

})(window, window['lib'] || (window['lib'] = {}))
/**
 *   获取url的参数
 *
 * @class uri
 * @module utils
 * @namespace taobao.utils
 * @author 武仲(wuzhong@taobao.com)
 * @since 2013.6.14
 */
;(function (win, lib) {

    var uri = {},

        docede = function(str){
          try{
             return decodeURIComponent(str);
          }catch(e){
              return str;
          }
        },

        /**
         * 获取url参数
         * @method getParam
         * @public
         * @static
         * @param {String} paramKey key
         * @return {String} value
         */
        getParam = uri.getParam = function (paramKey) {
            var queryString = this.queryMap || (function (paramStr) {
                    if (paramStr.length < 1) {
                        return "";
                    }
                    paramStr = paramStr.substr(1);
                    var params = paramStr.split('&'),
                        queryString = {}, aparam, i;
                    for (i in params) {
                        aparam = params[i].split('=');
                        queryString[docede(aparam[0])] = docede(aparam[1]);
                    }
                    return queryString;
                })(location.search),
                value;
            this.queryMap = queryString;
            if (paramKey) {
                value = queryString[paramKey];
                if (value && value.indexOf("#") > -1) {
                    value = encodeURIComponent(value);
                }
                return value;
            }
            else {
                return queryString;
            }
        },
        ttQueryStr = (function (_appendParams) {
            var result = '', i, key, value;
            for (i in _appendParams) {
                key = _appendParams[i];
                value = getParam(key);
                if (value && value !== '') {
                    result += ("&" + key + "=" + value);
                }
            }
            return result;
        })(['ttid', 'sprefer']);

    /**
     * 生成url
     * @method getUrl
     * @public
     * @static
     * @param {Object} param
     * @param {String} param.subdomain   如 H5，API
     * @param {String} param.host  对应的host，如m.taobao.com
     * @param {String} param.path  location.pathname
     * @param {String} param.url 对应具体的url，如果设置了这个，以上参数全失效
     * @param {Object} param.data 请求参数
     * @return {String} url
     */
    uri.getUrl = function (param) {

        function __append(dist, append) {
            if (!append) {
                return dist;
            }
            if (dist.indexOf("?") < 0) {
                dist += '?';
            }
            var last = dist.charAt(dist.length - 1),
                first = append.charAt(0);
            if ('?' === last || '&' === last) {
                if ('?' === first || '&' === first) {
                    return dist + append.substr(1);
                } else {
                    return dist + append;
                }
            } else {
                if ('?' === first || '&' === first) {
                    return dist + append;
                } else {
                    return dist + '&' + append;
                }
            }
        }

        var host = param.host || (param.subdomain + '.' + lib.config.sysType + '.' + 'taobao.com'),
            url = param.url || 'http://' + host + '/' + param.path;

        (url.indexOf('?') > 0) || (url += '?');
        url = __append(url, ttQueryStr);

        if (param.data) {
            url = __append(url, (function (j) {
                var s = '', k, v;
                if (null == j) {
                    return s;
                }
                for (k in j) {
                    v = j[k];
                    if (null != v && '' !== v) {
                        s += (k + '=' + encodeURIComponent(( "object" === typeof v ) ? JSON.stringify(v) : v) + '&');
                    }
                }

                if ('' !== s && (s.length - 1) === s.lastIndexOf('&')) {
                    s = s.substr(0, s.length - 1);
                }
                return s;
            })(param.data));
        }
        return url;
    };

    lib.uri = uri;

})(window, window.lib || (window.lib = {}))
/**
 * @class mtop
 * @module mtop
 * @namespace lib.mtop
 * @author butai,武仲(wuzhong@taobao.com)
 * @since 2013.6.3
 */
;(function (window, lib) {

    var cookie = lib.storage.cookie,
        mtop = lib.mtop || (lib.mtop = {}),
        failTimes = 0,
        maxFailTimes = 5;

    /**
     *功能：mtop response 统一处理
     *
     *  1. 分发成功失败回调
     *  2. token失效自动重试
     *  3. api请求失败自动重试，最多重试5次
     * @method wrapHandler
     * @private
     * @static
     */
    mtop.wrapHandler = function (result) {
            var ret = ((result && result.ret) ? result.ret : "").toString();
            //如果是token过期重新发送请求
            //如果成功failTimes为0
            if (ret.indexOf('SUCCESS::') >= 0) {
                failTimes = 0;
                this.callback && this.callback(result);
            } else if (-1 !== ret.indexOf('TOKEN_EMPTY::') || -1 !== ret.indexOf('TOKEN_EXOIRED::')) {
                if (++failTimes < maxFailTimes) {
                    console.log("TODO RETRY");
                    this.retryed = true;
                    lib.mtop.ajax(this.options,this.callback,this.errorback);
                } else {
                    cookie.delCookie(lib.mtop.base.tokenKey);
                    console.log('try exceed times');
                }
            } else {
                this.errorback && this.errorback(result);
            }

        };


})(window, window['lib'] || (window['lib'] = {}))

/**
 *功能：MTOP 对应的基础库：
 *
 *  1. mtop url的生成规则
 *  2. mtop 传输数据的加密
 *
 * @class base
 * @module mtop
 * @namespace lib.mtop
 * @author butai,武仲(wuzhong@taobao.com)
 * @since 2013.6.3
 */
;
(function (win, lib) {

    var cookie = lib.storage.cookie,
        md5 = lib.encode.md5,
        getUrl = lib.uri.getUrl,
        /**
         * dom中对应存放appkey的 domId
         * @property app_key_id
         * @type String
         */
        app_key_id = 'J_app_key',
        mtop = lib.mtop || (lib.mtop = {});


    mtop.base = {
        /**
         * cookie中存放当前token的key
         * @property _m_h5_tk
         * @type String
         */
        tokenKey: "_m_h5_tk",
        /**
         * 获取appkey。
         *     1. 首先从dom中取  `app_key_id`  对应的值。
         *     2. 取不到返回h5默认的appkey
         *    建议各个应用方独立配置，方便统计
         * @method appKey
         * @public
         * @static
         * @return {String} value
         */
        that: this,
        appKey: (function () {
            var config = lib.config,
                dom = document.getElementById(app_key_id);
            if (dom) {
                return dom.value;
            } else {
                return config.defaultAppKey;
            }
        })(),
        _getToken: function () {
            return  (cookie.getCookie(this.tokenKey) || '').split('_')[0];
        },
        //_hostReg: /(m|waptest|wapa)(?:\.x)?\.(taobao|etao|tmall)\.(com|net)/, config.hostReg
        /**
         * 获取appkey。
         *     1. 首先从dom中取  `app_key_id`  对应的值。
         *     2. 取不到返回h5默认的appkey
         *    建议各个应用方独立配置，方便统计
         * @method genApiUrl
         * @public
         * @static
         * @param {Object} data   api对应的data参数
         * @param {String} apiType  对应的api入口，如 h5apiUpdate.do/bigPipe.do
         * @param {String} t  当前请求对应的时间戳
         * @return {String} value 生成的api对应的请求url，但不包含sign信息
         */
        genApiUrl: function (data, apiType, t) {
            var config = lib.config,
                path = 'rest/' + apiType,
                param = {
                    path: path,
                    data: data
                };
            if (config.mtopHost) {
                param.host = config.mtopHost;
            } else if (data.subdomain) {
                param.subdomain = data.subdomain;
                delete data.subdomain;
            } else {
                var match = config.hostReg.exec(location.hostname);
                if (match) {
                    match[0] = match[2] === 'etao' ? 'apie' : 'api';
                    param.host = match.join('.');
                } else {
                    param.subdomain = 'api';
                }
            }
            var url = getUrl(param);
            return url + '&appKey=' + this.appKey + "&t=" + t;
        },
        /**
         * 对api数据进行签名，MD5
         *
         *      var signTemp = this._getToken() + '&' + t + "&" + this.appKey + "&" + dataStr;
         *      return md5(signTemp);
         *
         * 这里需要从cookie中获取token，因此该sdk也有个域名的限制，必须和api请求在同一个父域名下，不然
         * 前端js 获取不到token的值，签名在服务端通过不了
         *
         * @method sign
         * @public
         * @static
         * @param {String} dataStr   api对应的data参数, json2string
         * @param {String} t  当前请求对应的时间戳
         * @return {String} value 生成对应的加密串
         */
        sign: function (dataStr, t) {
            var signTemp = this._getToken() + '&' + t + "&" + this.appKey + "&" + dataStr;
            return md5(signTemp);
        }
    }

})(window, window['lib'] || (window['lib'] = {}))
/**
 * @class mtop
 * @module mtop
 * @namespace lib
 */
;(function (window, lib) {

    var mtop = lib.mtop || (lib.mtop = {}),
        base = mtop.base,
        apiType = 'h5ApiUpdate.do';

    mtop.EXECUTOR.register(function (args) {
        return !args[0].length && args[0].api && !args[0].cros;
    }, {
        init: function (args) {
            this.options = args[0];
            this.t = (new Date()).getTime();
            this.callback = args[1];
            this.errorback = args[2];
        },
        run: function () {
            var self = this,
                sendUrl = this._genSignUrl(),
                options = {
                    type: 'GET',
                    url: sendUrl,
                    timeout: 20000,
                    dataType: 'jsonp',
                    success: function (result) {
                        self.handleResponse && self.handleResponse(result);
                    },
                    error: function (result) {
                        self.handleResponse && self.handleResponse(result);
                    }
                };
            window.$.ajax(options);
        },

        _genSignUrl: function () {
            var url = base.genApiUrl(this.options, apiType, this.t);
            return this._addJsonParam(url) + '&sign=' + base.sign(JSON.stringify(this.options.data), this.t);
        },

        _addJsonParam: function (url) {
            if (-1 === url.indexOf('callback=')) {
                var index = url.indexOf('?');
                return url.substr(0, index) + '?callback=?&type=jsonp&' + url.substr(index + 1, url.length);
            }
            else {
                return url;
            }
        }
    });

    /**
     * 通过jsonp的方式调用mtop，和 `mtop.ajax` 一致
     * @method request
     * @public
     * @static
     * @param {Object} apiParam   mtop接口的入参
     * @param {String} apiParam.api  对应的mtop api
     * @param {String} apiParam.v    api版本
     * @param {Object} apiParam.data   mtop接口的入参
     * @param {Object} apiParam.subdomain   自主选择host
     * @param {Function} callback 成功的回调
     * @param {Function} errorback  失败的回调
     * @see request
     */
    mtop.request = function (apiParam, callback, errorback) {
        var data = apiParam.data || {};
        apiParam.v = apiParam.v || "*";
        apiParam.data = typeof (data) === "string" ? JSON.parse(data) : data;
        this.ajax(apiParam, callback, errorback);
    };


    /**
     * 该方法参数太多，被废弃了，请勿调用
     * 通过jsonp的方式调用mtop，和 `mtop.ajax` 一致
     * @method getAPi
     * @public
     * @static
     * @param {String} api  对应的mtop api
     * @param {String} v    api版本
     * @param {Object} data   mtop接口的入参
     * @param {Object} extParam   额外的参数
     * @param {Function} callback 成功的回调
     * @param {Function} errorback  失败的回调
     * @deprecated use `request` instead
     * @see request
     */
    mtop.getApi = function (api, v, data, extParam, callback, errorback) {
        extParam || (extParam = {});
        extParam.api = api;
        extParam.v = v;
        extParam.data = data;
        this.request(extParam, callback, errorback);
    };
})(window, window['lib'] || (window['lib'] = {}));
