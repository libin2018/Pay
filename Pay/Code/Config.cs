using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;

namespace Pay
{
    public class Config
    {
        public static string Domain = ConfigurationManager.AppSettings["Domain"];

        public static string Site = ConfigurationManager.AppSettings["Site"];

        public static string Contact = ConfigurationManager.AppSettings["Contact"];

        // 是否测试环境
        public static bool IsDebug = ConfigurationManager.AppSettings["IsDebug"].ToString() == "1";
    }
}