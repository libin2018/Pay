using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Web;

namespace Pay
{
    /// <summary>
    /// 加密处理
    /// </summary>
    public class EncryptHelper
    {
        public static string Md5To32(string content)
        {
            string result = string.Empty;
            // 实例化一个md5对像
            var md5 = MD5.Create();
            // 加密后是一个字节类型的数组，这里要注意编码UTF8/Unicode等的选择　
            byte[] md5Bytes = md5.ComputeHash(Encoding.UTF8.GetBytes(content));
            // 通过使用循环，将字节类型的数组转换为字符串，此字符串是常规字符格式化所得
            for (int i = 0; i < md5Bytes.Length; i++)
            {
                // 将得到的字符串使用十六进制类型格式。格式后的字符是小写的字母，如果使用大写（X）则格式后的
                // 字符是大写字符
                result += md5Bytes[i].ToString("x").PadLeft(2, '0');
            }
            return result;
        }

        public static string Md5Encrypt32(string signStr)
        {
            var hash = System.Security.Cryptography.MD5.Create();
            var bytes = Encoding.UTF8.GetBytes(signStr);
            var md5Val = hash.ComputeHash(bytes);
            string returnStr = "";
            if (md5Val != null)
            {
                for (int i = 0; i < md5Val.Length; i++)
                {
                    returnStr += md5Val[i].ToString("X2");
                }
            }
            return returnStr;
        }

        /// <summary>
        /// MD5 加密字符串
        /// </summary>
        /// <param name="rawPass">源字符串</param>
        /// <returns>加密后base64字符串</returns>
        public static string MD5Encoding(string rawPass)
        {
            // 创建MD5类的默认实例：MD5CryptoServiceProvider
            MD5 md5 = MD5.Create();
            byte[] bs = Encoding.UTF8.GetBytes(rawPass);
            byte[] hs = md5.ComputeHash(bs);
            return Convert.ToBase64String(hs);
        }

        public static string Md5EncodingHash(string rawPass)
        {
            MD5CryptoServiceProvider md5Hasher = new MD5CryptoServiceProvider();
            byte[] data = md5Hasher.ComputeHash(Encoding.UTF8.GetBytes(rawPass));

            StringBuilder sBuilder = new StringBuilder();
            for (int i = 0; i < data.Length; i++)
            {
                sBuilder.Append(data[i].ToString("x2").ToUpper());
            }
            return sBuilder.ToString();
        }

        /// <summary>
        /// MD5盐值加密
        /// </summary>
        /// <param name="rawPass">源字符串</param>
        /// <param name="salt">盐值</param>
        /// <returns>加密后字符串</returns>
        public static string MD5Encoding(string rawPass, string salt)
        {
            return MD5Encoding(rawPass + salt);
        }

        public static string MD5Encoding32(string rawPass, string salt)
        {
            MD5CryptoServiceProvider hashmd5;
            hashmd5 = new MD5CryptoServiceProvider();
            byte[] bs = Encoding.UTF8.GetBytes(rawPass + salt);
            byte[] hs = hashmd5.ComputeHash(bs);
            return Convert.ToBase64String(Encoding.UTF8.GetBytes(BitConverter.ToString(hs).Replace("-", "").ToLower()));
        }

        public static string MD5Encoding32(string rawPass)
        {
            MD5CryptoServiceProvider hashmd5;
            hashmd5 = new MD5CryptoServiceProvider();
            byte[] bs = Encoding.UTF8.GetBytes(rawPass);
            byte[] hs = hashmd5.ComputeHash(bs);
            return Convert.ToBase64String(Encoding.UTF8.GetBytes(BitConverter.ToString(hs).Replace("-", "").ToLower()));
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="str"></param>
        /// <returns></returns>
        public static string GetMd5(string str)
        {
            // Convert the input string to a byte array and compute the hash.
            using (var md5 = MD5.Create())
            {
                var data = md5.ComputeHash(Encoding.UTF8.GetBytes(str));
                // Create a new Stringbuilder to collect the bytes
                // and create a string.
                var sBuilder = new StringBuilder();

                // Loop through each byte of the hashed data 
                // and format each one as a hexadecimal string.
                foreach (var t in data)
                {
                    // 以十六进制格式格式化
                    sBuilder.Append(t.ToString("x2"));
                }

                // Return the hexadecimal string.
                return sBuilder.ToString();
            }
        }
    }
}