using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Pay
{
    public class PayService
    {
        /// <summary>
        /// 生成支付宝二维码
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        public static string GetAlipayQRUrl(OrderDTO entity)
        {
            string alipays = "alipays://platformapi/startapp?appId=20000067&appClearTop=false&startMultApp=YES&showTitleBar=YES&showToolBar=NO&showLoading=YES&pullRefresh=YES&url=";
            string url = "http://" + Config.Domain + "/alipay.html?u=" + AliPayConfig.alipay_user_id + "&a=" + entity.Order_QRPrice;

            return alipays + HttpUtility.UrlEncode(url);
        }

        /// <summary>
        /// 根据价格找到未支付的订单
        /// </summary>
        /// <param name="price"></param>
        /// <returns></returns>
        public static OrderDTO GetOrder(string price)
        {
            var keys = CacheHelper.GetCacheKeys();
            foreach (string key in keys)
            {
                var value = CacheHelper.Get<OrderDTO>(key);
                if (value.Order_Status == "Created" && value.Order_QRPrice == price)
                {
                    return value;
                }
            }

            return null;
        }
    }
}