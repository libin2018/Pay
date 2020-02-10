using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;

namespace Pay
{
    public class AliPayConfig
    {
        // pc登录支付宝 https://my.alipay.com/portal/i.htm 右键查看网页源代码搜索 userId 得到的值
        public static string alipay_user_id = ConfigurationManager.AppSettings["alipay_user_id"];

        // sign
        public static string secret_key = ConfigurationManager.AppSettings["secret_key"];

        // 支付超时时间（秒）
        public static int time_expire_min = Convert.ToInt32(ConfigurationManager.AppSettings["time_expire_min"]);
    }
}