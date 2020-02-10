using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web;
using System.Web.Http;

namespace Pay.APIControllers
{
    [AllowAnonymous]
    [RoutePrefix("api/Pay")]
    public class PayController : ApiController
    {
        [Route("SaveOrder")]
        [HttpPost]
        public Result SaveOrder([FromBody]OrderDTO entity)
        {
            var result = new Result() { };

            // 如果有重复记录，默认递减
            entity.Order_QRPrice = entity.Order_Price;
            while (PayService.GetOrder(entity.Order_QRPrice) != null)
            {
                entity.Order_QRPrice = (Convert.ToDouble(entity.Order_QRPrice) - 0.01).ToString();
            }
            if (Convert.ToDouble(entity.Order_QRPrice) <= 0)
            {
                result.Message = "系统火爆，请过1-3分钟后付款!";
                return result;
            }
            entity.Order_QRUrl = PayService.GetAlipayQRUrl(entity);
            entity.Order_Status = "Created";
            CacheHelper.SetCacheValue(entity.Order_OutTradeNO, entity, AliPayConfig.time_expire_min);
            result.IsSucc = true;
            result.Datas = entity;
            return result;
        }

        [Route("GetQrCode")]
        [HttpGet]
        public HttpResponseMessage GetQrCode(string out_trade_no)
        {
            LogHelper.Log.Debug("GetQrCode:" + out_trade_no);

            var order = CacheHelper.Get<OrderDTO>(out_trade_no);
            System.IO.MemoryStream MStream1 = new System.IO.MemoryStream();
            QrCodeHelper.BuildQrCode(order.Order_QRUrl, MStream1, "~/wdi.ico");
            var resp = new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new ByteArrayContent(MStream1.ToArray())
            };
            resp.Content.Headers.ContentType = new MediaTypeHeaderValue("image/png");
            return resp;
        }

        [Route("Notify")]
        [HttpPost]
        public Result Notify([FromBody]OrderDTO entity)
        {
            var result = new Result() { };

            LogHelper.Log.Debug("Notify:" + entity.ToJson());

            // 校验Key
            var key = EncryptHelper.Md5To32(EncryptHelper.Md5To32(entity.Order_QRPrice + entity.Order_Type) + AliPayConfig.secret_key);

            if (key != entity.Order_Sign)
            {
                result.Message = "处理订单失败，客户端密匙有误!";
                return result;
            }

            var order = PayService.GetOrder(entity.Order_QRPrice);
            if (order == null)
            {
                result.Message = "处理订单失败，未找到记录";
                return result;
            }
            else
            {
                order.Order_Status = "Finished";

                CacheHelper.RemoveCache(order.Order_OutTradeNO);
                CacheHelper.SetCacheValue(order.Order_OutTradeNO, order, 24 * 60);
                result.IsSucc = true;
                result.Datas = order;
                result.Message = "收款处理成功";
            }
            return result;
        }

        [Route("Status")]
        [HttpGet]
        public bool Status(string out_trade_no)
        {
            var result = false;
            var entity = CacheHelper.Get<OrderDTO>(out_trade_no);
            if (entity != null)
            {
                var order = entity as OrderDTO;
                result = (order.Order_Status == "Finished");
            }

            return result;
        }
    }
}