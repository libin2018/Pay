using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Pay
{
    public class OrderDTO
    {
        /// <summary>
        /// 主键PK
        /// </summary>
        public string Order_Id { get; set; }

        /// <summary>
        /// 订单号
        /// </summary>
        public string Order_OutTradeNO { get; set; }

        /// <summary>
        /// @alipay支付宝 @wechat微信 
        /// </summary>
        public string Order_Type { get; set; }

        /// <summary>
        /// 订单价格
        /// </summary>
        public string Order_Price { get; set; }

        /// <summary>
        /// 订单名称
        /// </summary>
        public string Order_Name { get; set; }

        /// <summary>
        /// 状态：@Created待支付 @Expired已过期 @Finished已支付
        /// </summary>
        public string Order_Status { get; set; }

        /// <summary>
        /// 二维码地址
        /// </summary>
        public string Order_QRUrl { get; set; }

        /// <summary>
        /// 二维码价格（减免后的价格）
        /// </summary>
        public string Order_QRPrice { get; set; }

        /// <summary>
        /// 回调地址
        /// </summary>
        public string Order_RedirectUrl { get; set; }

        /// <summary>
        /// 备注说明
        /// </summary>
        public string Order_Extension { get; set; }

        /// <summary>
        /// 付款人
        /// </summary>
        public string Order_NickName { get; set; }

        /// <summary>
        /// 通知邮箱
        /// </summary>
        public string Order_Email{ get; set; }

        /// <summary>
        /// 凭证
        /// </summary>
        public string Order_Sign { get; set; }
    }
}