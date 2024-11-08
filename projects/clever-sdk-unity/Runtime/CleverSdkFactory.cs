using System;
using CleverSDK.Models;

namespace CleverSDK
{
    public static class CleverSdkFactory
    {
        public static ICleverSdk CreateSdk(SdkConfig config)
        {
            if (config == null) throw new ArgumentNullException(nameof(config));

            switch (config.platform)
            {
                case "wechat":
                    if (config is WeChatSdkConfig wxConfig)
                    {
                        return new CleverSdkWeChat(wxConfig);
                    }
                    throw new ArgumentException("Config must be WeChatSdkConfig for wechat platform");

                case "dou-yin":
                    if (config is DouyinSdkConfig dyConfig)
                    {
                        return new CleverSdkDouyin(dyConfig);
                    }
                    throw new ArgumentException("Config must be DouyinSdkConfig for dou-yin platform");

                default:
                    throw new NotSupportedException($"Platform {config.platform} is not supported");
            }
        }
    }
}
