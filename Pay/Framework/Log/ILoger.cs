using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Pay
{
    /// <summary>
    /// 日志
    /// </summary>
    public interface ILoger
    {
        /// <summary>
        /// 错误日志
        /// </summary>
        /// <param name="message"></param>
        void Error(object message);

        /// <summary>
        /// 错误日志
        /// </summary>
        void Error(object message, Exception exception);

        /// <summary>
        /// 调试日志
        /// </summary>
        void Debug(object message);

        /// <summary>
        /// 调试日志
        /// </summary>
        void Debug(object message, Exception exception);
    }
}