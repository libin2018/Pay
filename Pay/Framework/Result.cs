using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Pay
{
    /// <summary>
    /// 返回结果 内部使用
    /// </summary>
    public class Result : Result<object>
    {
        /// <summary>
        /// 
        /// </summary>
        public Result()
        {

        }

        /// <summary>
        /// 直接输入信息
        /// </summary>
        /// <param name="isSuss"></param>
        /// <param name="message"></param>
        public Result(bool isSuss, string message = "") : base(isSuss, message)
        {

        }

        /// <summary>
        /// 返回值
        /// </summary>
        [Obsolete("请用Datas")]
        public object RuturnValue { get; set; }
    }

    /// <summary>
    /// 结果
    /// </summary>
    /// <typeparam name="T"></typeparam>
    public class Result<T>
    {
        /// <summary>
        /// 
        /// </summary>
        public Result()
        {

        }

        /// <summary>
        /// 直接输入信息
        /// </summary>
        /// <param name="isSuss"></param>
        public Result(bool isSuss)
        {
            IsSucc = isSuss;
        }

        /// <summary>
        /// 直接输入信息
        /// </summary>
        /// <param name="isSuss"></param>
        /// <param name="message"></param>
        public Result(bool isSuss, string message)
        {
            IsSucc = isSuss;
            Message = message;
        }

        /// <summary>
        /// 
        /// </summary>
        public bool IsSucc { get; set; }

        /// <summary>
        /// 返回值
        /// </summary>
        public int Code { get; set; }

        /// <summary>
        /// 信息
        /// </summary>
        public string Message { get; set; }

        /// <summary>
        /// 数据
        /// </summary>
        public T Datas { get; set; }
    }
}