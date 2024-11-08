using System;

namespace CleverSDK.Models
{
    [Serializable]
    public sealed class EventReportContext
    {
        public string player_anonymous;
        public string player_id;
        public string channel_id;
        public string version_id;
    }
}

