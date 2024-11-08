using System;

namespace CleverSDK.Models
{
    [Serializable]
    public class SdkConfig
    {
        public string project_id;
        public string platform;
        public string sdk_login_url;
        public string event_endpoint = "https://api.salesagent.cc/game-logger/event";
    }

    [Serializable]
    public class LoginData
    {
        public string open_id;
        public string union_id;
        public string session_key;
    }
}
