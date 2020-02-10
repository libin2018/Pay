using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Pay
{
    /// <summary>
    /// 日志
    /// </summary>
    public class Loger : ILoger
    {
        private static log4net.ILog _log;

        /// <summary>
        /// 补始化
        /// </summary>
        /// <param name="name"></param>
        public Loger(string name)
        {
            _log = log4net.LogManager.GetLogger(name);
        }

        /// <summary>
        /// 错误日志
        /// </summary>
        /// <param name="message"></param>
        public void Error(object message)
        {
            _log.Error(message);
        }

        /// <summary>
        /// 错误日志
        /// </summary>
        /// <param name="message"></param>
        /// <param name="exception"></param>
        public void Error(object message, Exception exception)
        {
            _log.Error(message, exception);
        }

        /// <summary>
        /// 调试日志
        /// </summary>
        /// <param name="message"></param>
        public void Debug(object message)
        {
            _log.Debug(message);
        }

        /// <summary>
        /// 调试日志
        /// </summary>
        /// <param name="message"></param>
        /// <param name="exception"></param>
        public void Debug(object message, Exception exception)
        {
            _log.Debug(message, exception);
        }
    }
}