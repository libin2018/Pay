using Microsoft.Extensions.Caching.Memory;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text.RegularExpressions;
using System.Web;

namespace Pay
{
    public class CacheHelper
    {
        private static readonly MemoryCache Cache = new MemoryCache(new MemoryCacheOptions());

        /// <summary>
        /// 获取缓存
        /// </summary>
        /// <param name="key">缓存Key</param>
        /// <returns></returns>
        public static T Get<T>(string key) where T : class
        {
            if (key == null)
                throw new ArgumentNullException(nameof(key));

            return Cache.Get(key) as T;
        }

        /// <summary>
        /// 阅后即焚
        /// </summary>
        /// <param name="key"></param>
        /// <returns></returns>
        public static void RemoveCache(string key)
        {
            Cache.Remove(key);
        }

        /// <summary>
        /// 设置缓存
        /// </summary>
        /// <param name="key">键</param>
        /// <param name="value">值</param>
        public static void SetCacheValue(string key, object value, int min)
        {
            if (!string.IsNullOrEmpty(key))
            {
                Cache.Set(key, value, new MemoryCacheEntryOptions
                {
                    SlidingExpiration = TimeSpan.FromMinutes(min)
                });
            }
        }

        /// <summary>
        /// 获取所有缓存键
        /// </summary>
        /// <returns></returns>
        public static List<string> GetCacheKeys()
        {
            const BindingFlags flags = BindingFlags.Instance | BindingFlags.NonPublic;
            var entries = Cache.GetType().GetField("_entries", flags).GetValue(Cache);
            var cacheItems = entries as IDictionary;
            var keys = new List<string>();
            if (cacheItems == null) return keys;
            foreach (DictionaryEntry cacheItem in cacheItems)
            {
                keys.Add(cacheItem.Key.ToString());
            }
            return keys;
        }
    }
}