using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Pay
{
    public class LogHelper
    {
        private static ILoger _log = new Loger("log");

        static LogHelper()
        {
            ConfigureAndWatch(System.AppDomain.CurrentDomain.BaseDirectory + "log4net.config");
        }

        /// <summary>
        /// 初始化
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        public static void ConfigureAndWatch(string path)
        {
            log4net.Config.XmlConfigurator.ConfigureAndWatch(new System.IO.FileInfo(path));
        }
        
        /// <summary>
        /// 
        /// </summary>
        public static ILoger Log
        {
            get
            {
                return _log;
            }
        }
    }
}