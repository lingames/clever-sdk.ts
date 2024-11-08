using System;

namespace CleverSDK.Models
{
    [Serializable]
    public class WeChatSdkConfig : SdkConfig
    {
        public string sdk_key;

        public WeChatSdkConfig()
        {
            platform = "wechat";
        }
    }
}

